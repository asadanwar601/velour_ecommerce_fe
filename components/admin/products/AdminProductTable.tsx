'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { money } from '@/lib/format';
import { EditIcon, TrashIcon, SparklesIcon } from '@/components/Icons';

interface AdminProductTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export function AdminProductTable({
  products,
  onEditProduct,
  onDeleteProduct,
}: AdminProductTableProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-sm overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-sand-50 border-b border-sand-200 text-neutral-600 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Garment Piece</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-center">Stock</th>
              <th className="py-3 px-4">Flags</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-sand-50/50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] && (
                      <div className="relative w-10 h-12 bg-sand-100 rounded-sm overflow-hidden flex-shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-neutral-900">{product.name}</p>
                      <p className="text-[11px] text-neutral-400 font-mono">SKU: {product.id}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-neutral-600 capitalize">
                  {product.category} / {product.subcategory}
                </td>

                <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900">
                  {money(product.price)}
                </td>

                <td className="py-3.5 px-4 text-center font-mono font-medium text-neutral-800">
                  {(product as any).inStock || (product as any).stock || 20}
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex gap-1 flex-wrap">
                    {product.featured && (
                      <span className="px-2 py-0.5 bg-gold-50 text-gold-800 text-[10px] font-semibold uppercase rounded-full">
                        Featured
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-semibold uppercase rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEditProduct(product)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
                      title="Edit garment"
                    >
                      <EditIcon size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProduct(product)}
                      className="p-1.5 text-neutral-500 hover:text-red-600 transition-colors"
                      title="Delete garment"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
