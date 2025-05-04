import { ProductList } from "@/components/products/product-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products - CRM Application",
  description: "Manage your product inventory",
}

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Manage your product inventory and catalog</p>
      </div>
      <ProductList />
    </div>
  )
}
