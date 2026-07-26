import { prisma } from "@/lib/prisma";
import ProductStockTable from "@/components/ProductStockTable";

export default async function StaffInventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      sku: true,
      price: true,
      stock: true
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inventory Management</h1>
        <p className="text-gray-500 mt-2">Manage product stock and track inventory status.</p>
      </div>

      <ProductStockTable products={products} />
    </div>
  );
}
