# Baveha Listings Pipeline

Easily add new products to the Baveha catalogue using CSV import.

## How It Works

1. Copy `incoming/listings-template.csv` to `incoming/listings.csv`.
2. Add your products row by row.
3. Drop corresponding product photos into `incoming/images/`.
4. Run the import script:
   ```bash
   npm run import-listings
   ```
5. The script will validate rows, resize/optimize images to `public/images/products/`, and regenerate `lib/generated-products.ts`.

---

## CSV Column Reference (in order)

| Column | Type | Required | Description / Example |
| :--- | :--- | :--- | :--- |
| `name` | String | **Yes** | Product name (e.g. `Silk Georgette Scarf`) |
| `category` | Enum | **Yes** | Either `women` or `men` |
| `subcategory` | String | **Yes** | Product subcategory (e.g. `Outerwear`, `Knitwear`, `Accessories`) |
| `price` | Number | **Yes** | Retail price in USD (e.g. `195` or `195.00`) |
| `compareAtPrice`| Number | No | Original/strikethrough price for sale items (e.g. `245`) |
| `description` | String | No | Detailed product description & materials |
| `sizes` | String | No | Pipe-separated size list (e.g. `XS\|S\|M\|L\|XL` or `One Size`). Defaults to `XS\|S\|M\|L\|XL`. |
| `image1` | String | **Yes** | Primary image filename in `incoming/images/` (e.g. `scarf-1.jpg`) |
| `image2` | String | No | Hover/secondary image filename in `incoming/images/`. Falls back to `image1` if blank. |
| `featured` | Yes/No | No | `yes` to display in Homepage Featured Collection (default `no`) |
| `isNew` | Yes/No | No | `yes` to mark as "NEW" badge & display in New Arrivals (default `no`) |
| `trending` | Yes/No | No | `yes` to display in Trending Collection (default `no`) |

---

## Notes
- If an image file is missing from `incoming/images/`, the script outputs a warning and assigns a clean neutral placeholder URL.
- The pipeline is idempotent and safe to re-run at any time.
