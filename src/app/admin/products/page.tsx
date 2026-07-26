import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { deleteProductAction } from "@/app/actions/product";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <p className="text-muted-foreground">Add, edit, or remove products from your store.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Product Name</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No products found. Add some products to see them here!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      {product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-[10px] text-muted-foreground">No Img</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{product.sku}</td>
                    <td className="px-6 py-4 font-semibold">₦{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400'}`}>
                          In Stock ({product.stock})
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/products/${product.id}/edit`}
                          className="text-blue-500 hover:text-blue-700 transition-colors p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/30"
                          title="Edit Product"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <form action={async () => {
                          "use server";
                          await deleteProductAction(product.id);
                        }}>
                          <button type="submit" className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30" title="Delete Product">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
