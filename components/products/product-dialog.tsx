"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/redux/store"
import { addProduct, updateProduct } from "@/lib/redux/features/products/productSlice"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

// Form validation schema
const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  discountPercentage: z.coerce.number().min(0).max(100),
  rating: z.coerce.number().min(0).max(5),
  stock: z.coerce.number().int().positive("Stock must be positive"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  thumbnail: z.string().url("Must be a valid URL"),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductDialog({ open, onOpenChange }: ProductDialogProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedProduct } = useSelector((state: RootState) => state.products)
  const { toast } = useToast()
  const isEditing = !!selectedProduct

  // Initialize form with react-hook-form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
      thumbnail: "",
    },
  })

  const { reset, formState } = form
  const { isSubmitting } = formState

  // Update form when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      reset({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        discountPercentage: selectedProduct.discountPercentage,
        rating: selectedProduct.rating,
        stock: selectedProduct.stock,
        brand: selectedProduct.brand,
        category: selectedProduct.category,
        thumbnail: selectedProduct.thumbnail,
      })
    } else {
      reset({
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: "",
        category: "",
        thumbnail: "",
      })
    }
  }, [selectedProduct, reset, open])

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (isEditing && selectedProduct) {
        await dispatch(
          updateProduct({
            id: selectedProduct.id,
            product: data,
          }),
        ).unwrap()

        toast({
          title: "Product updated",
          description: "The product has been successfully updated",
        })
      } else {
        await dispatch(addProduct(data as any)).unwrap()

        toast({
          title: "Product added",
          description: "The product has been successfully added",
        })
      }
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as string) || "An error occurred",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the product details below." : "Fill in the details to add a new product."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount %</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min="0" max="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
