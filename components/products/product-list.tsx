"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/redux/store"
import { fetchProducts, deleteProduct, setSelectedProduct } from "@/lib/redux/features/products/productSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { ProductDialog } from "@/components/products/product-dialog"
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Loader2 } from "lucide-react"

export function ProductList() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, status, error } = useSelector((state: RootState) => state.products)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const filteredProducts = items.filter(
    (product) =>
      (product.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (product.brand?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (product.category?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (product: any) => {
    dispatch(setSelectedProduct(product))
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted",
        })
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Failed to delete product",
        })
      })
  }

  const handleAddNew = () => {
    dispatch(setSelectedProduct(null))
    setIsDialogOpen(true)
  }

  if (status === "loading" && items.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading products...</span>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-center">
        <p className="text-destructive">Error: {error}</p>
        <Button variant="outline" className="mt-4" onClick={() => dispatch(fetchProducts())}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-muted mr-2 overflow-hidden">
                        <img
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div>{product.title}</div>
                        <div className="text-xs text-muted-foreground">{product.brand}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ProductDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
