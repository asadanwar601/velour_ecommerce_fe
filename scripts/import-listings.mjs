#!/usr/bin/env node

/**
 * ============================================================================
 * Baveha Listings Pipeline Importer
 * ============================================================================
 * Reads incoming/listings.csv (or falls back to incoming/listings-template.csv
 * if explicitly run in demo mode), validates rows, processes images via `sips`,
 * and regenerates `lib/generated-products.ts`.
 * ============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const INCOMING_DIR = path.join(ROOT_DIR, 'incoming');
const INCOMING_IMAGES_DIR = path.join(INCOMING_DIR, 'images');
const PUBLIC_PRODUCTS_DIR = path.join(ROOT_DIR, 'public', 'images', 'products');
const OUTPUT_TS_FILE = path.join(ROOT_DIR, 'lib', 'generated-products.ts');

const DEFAULT_CSV = path.join(INCOMING_DIR, 'listings.csv');
const TEMPLATE_CSV = path.join(INCOMING_DIR, 'listings-template.csv');

const NEUTRAL_PLACEHOLDER =
  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80';

// Ensure directories exist
if (!fs.existsSync(INCOMING_IMAGES_DIR)) {
  fs.mkdirSync(INCOMING_IMAGES_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_PRODUCTS_DIR)) {
  fs.mkdirSync(PUBLIC_PRODUCTS_DIR, { recursive: true });
}

function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i++; // Skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // Skip CR
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        if (currentRow.some((field) => field.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function optimizeImageWithSips(srcPath, destPath) {
  try {
    // Check if sips is available (macOS native)
    execSync(`sips -Z 1400 -s format jpeg "${srcPath}" --out "${destPath}"`, {
      stdio: 'pipe',
    });
    return true;
  } catch (err) {
    try {
      // Fallback: simple copy if sips fails or non-macOS
      fs.copyFileSync(srcPath, destPath);
      return true;
    } catch {
      return false;
    }
  }
}

async function run() {
  console.log('─── Baveha Listings Importer ───');

  let csvPath = DEFAULT_CSV;
  if (!fs.existsSync(csvPath)) {
    if (fs.existsSync(TEMPLATE_CSV)) {
      console.log(`Notice: incoming/listings.csv not found. Reading from incoming/listings-template.csv`);
      csvPath = TEMPLATE_CSV;
    } else {
      console.error('Error: No CSV file found in incoming/ directory.');
      process.exit(1);
    }
  } else {
    console.log(`Reading listings from: ${csvPath}`);
  }

  const rawContent = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(rawContent);

  if (rows.length <= 1) {
    console.log('No listings found in CSV (header only or empty file).');
    writeGeneratedProducts([]);
    return;
  }

  // Header verification
  const header = rows[0].map((h) => h.toLowerCase());
  const expectedCols = [
    'name',
    'category',
    'subcategory',
    'price',
    'compareatprice',
    'description',
    'sizes',
    'image1',
    'image2',
    'featured',
    'isnew',
    'trending',
  ];

  const dataRows = rows.slice(1);
  const products = [];
  const usedSlugs = new Map();

  for (let idx = 0; idx < dataRows.length; idx++) {
    const rowNum = idx + 2;
    const row = dataRows[idx];

    // Safe column extraction by index or header mapping
    const getVal = (colName, colIdx) => {
      const hIdx = header.indexOf(colName.toLowerCase());
      return hIdx !== -1 ? row[hIdx] : row[colIdx] || '';
    };

    const name = getVal('name', 0);
    const categoryRaw = getVal('category', 1).toLowerCase();
    const subcategory = getVal('subcategory', 2);
    const priceRaw = getVal('price', 3);
    const compareAtRaw = getVal('compareAtPrice', 4);
    const description = getVal('description', 5);
    const sizesRaw = getVal('sizes', 6);
    const image1 = getVal('image1', 7);
    const image2 = getVal('image2', 8);
    const featuredRaw = getVal('featured', 9).toLowerCase();
    const isNewRaw = getVal('isNew', 10).toLowerCase();
    const trendingRaw = getVal('trending', 11).toLowerCase();

    // Validation
    if (!name) {
      console.warn(`[Row ${rowNum}] Skipping: Missing required 'name'`);
      continue;
    }
    if (categoryRaw !== 'women' && categoryRaw !== 'men') {
      console.warn(
        `[Row ${rowNum}] Skipping "${name}": 'category' must be 'women' or 'men' (got "${categoryRaw}")`
      );
      continue;
    }
    if (!subcategory) {
      console.warn(`[Row ${rowNum}] Skipping "${name}": Missing required 'subcategory'`);
      continue;
    }

    const price = parseFloat(priceRaw.replace(/[^0-9.]/g, ''));
    if (isNaN(price) || price <= 0) {
      console.warn(`[Row ${rowNum}] Skipping "${name}": Invalid 'price' "${priceRaw}"`);
      continue;
    }

    if (!image1) {
      console.warn(`[Row ${rowNum}] Skipping "${name}": Missing required 'image1'`);
      continue;
    }

    // ID generation with collision resolution
    let baseSlug = slugify(name);
    let id = baseSlug;
    if (usedSlugs.has(baseSlug)) {
      const count = usedSlugs.get(baseSlug) + 1;
      usedSlugs.set(baseSlug, count);
      id = `${baseSlug}-${count}`;
    } else {
      usedSlugs.set(baseSlug, 1);
    }

    // Optional compareAtPrice
    let compareAtPrice = undefined;
    if (compareAtRaw) {
      const parsedCompare = parseFloat(compareAtRaw.replace(/[^0-9.]/g, ''));
      if (!isNaN(parsedCompare) && parsedCompare > price) {
        compareAtPrice = parsedCompare;
      }
    }

    // Sizes
    let sizes = ['XS', 'S', 'M', 'L', 'XL'];
    if (sizesRaw && sizesRaw.trim().length > 0) {
      sizes = sizesRaw.split('|').map((s) => s.trim()).filter(Boolean);
    }

    // Image processing
    const processImage = (imgFilename, suffix) => {
      if (!imgFilename) return null;
      const srcFile = path.join(INCOMING_IMAGES_DIR, imgFilename);
      const destFilename = `${id}-${suffix}.jpg`;
      const destFile = path.join(PUBLIC_PRODUCTS_DIR, destFilename);
      const publicPath = `/images/products/${destFilename}`;

      if (fs.existsSync(srcFile)) {
        const success = optimizeImageWithSips(srcFile, destFile);
        if (success) {
          return publicPath;
        }
      }

      console.warn(
        `[Warning] Image "${imgFilename}" for "${name}" not found in incoming/images/. Using neutral placeholder.`
      );
      return NEUTRAL_PLACEHOLDER;
    };

    const finalImage1 = processImage(image1, '1') || NEUTRAL_PLACEHOLDER;
    const finalImage2 = image2 ? processImage(image2, '2') || finalImage1 : finalImage1;

    const product = {
      id,
      name,
      category: categoryRaw,
      subcategory,
      price,
      ...(compareAtPrice ? { compareAtPrice } : {}),
      description: description || `Crafted with premium quality and contemporary minimal aesthetic for the Baveha collection.`,
      sizes,
      images: [finalImage1, finalImage2],
      featured: featuredRaw === 'yes' || featuredRaw === 'true',
      isNew: isNewRaw === 'yes' || isNewRaw === 'true',
      trending: trendingRaw === 'yes' || trendingRaw === 'true',
    };

    products.push(product);
  }

  writeGeneratedProducts(products);
  console.log(`✔ Successfully imported ${products.length} product(s) into lib/generated-products.ts`);
}

function writeGeneratedProducts(products) {
  const fileContent = `// This file is auto-generated by \`scripts/import-listings.mjs\`.
// DO NOT EDIT THIS FILE MANUALLY.
// Run \`npm run import-listings\` to regenerate.

import { Product } from './types';

export const GENERATED_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

  fs.writeFileSync(OUTPUT_TS_FILE, fileContent, 'utf8');
}

run().catch((err) => {
  console.error('Fatal error during listings import:', err);
  process.exit(1);
});
