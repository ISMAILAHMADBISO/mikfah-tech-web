"use client";

import { useTransition } from "react";
import { toggleStockAction } from "@/app/actions/products";
import { Loader2 } from "lucide-react";

export default function ProductStockTable({ products }: { products: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (productId: string, currentStock: number) => {
    startTransition(async () => {
      // If currentStock is 0, we set to In Stock (100). If > 0, we set to Out of Stock (0).
      await toggleStockAction(productId, currentStock === 0);
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-4 font-medium">Product Name</th>
            <th className="px-6 py-4 font-medium">SKU</th>
            <th className="px-6 py-4 font-medium">Price</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => {
            const inStock = product.stock > 0;
            return (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{product.sku}</td>
                <td className="px-6 py-4 text-gray-900">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleToggle(product.id, product.stock)}
                    disabled={isPending}
                    className={`text-sm px-4 py-2 rounded-md font-medium transition-colors border ${
                      inStock 
                        ? 'bg-white text-red-600 border-red-200 hover:bg-red-50' 
                        : 'bg-black text-white border-black hover:bg-gray-800'
                    }`}
                  >
                    {inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                  </button>
                </td>
              </tr>
            );
          })}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                No products found in the database.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
