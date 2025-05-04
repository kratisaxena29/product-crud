import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface ProductsState {
  items: Product[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  selectedProduct: Product | null
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  selectedProduct: null,
}

// Async thunks for API calls
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://dummyjson.com/products")
    if (!response.ok) {
      throw new Error("Server Error")
    }
    const data = await response.json()
    return data.products
  } catch (error) {
    console.warn("Failed to fetch products from API, using mock data:", error)

    // Return mock product data for demo purposes
    return [
      {
        id: 1,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        images: ["https://i.dummyjson.com/data/products/1/1.jpg"],
      },
      {
        id: 2,
        title: "iPhone X",
        description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology",
        price: 899,
        discountPercentage: 17.94,
        rating: 4.44,
        stock: 34,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        images: ["https://i.dummyjson.com/data/products/2/1.jpg"],
      },
      {
        id: 3,
        title: "Samsung Universe 9",
        description: "Samsung's new variant which goes beyond Galaxy",
        price: 1249,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: "Samsung",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
        images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
      },
      {
        id: 4,
        title: "OPPOF19",
        description: "OPPO F19 is officially announced on April 2021.",
        price: 280,
        discountPercentage: 17.91,
        rating: 4.3,
        stock: 123,
        brand: "OPPO",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
        images: ["https://i.dummyjson.com/data/products/4/1.jpg"],
      },
      {
        id: 5,
        title: "Huawei P30",
        description: "Huawei's re-badged P30 Pro New Edition was officially unveiled yesterday in Germany",
        price: 499,
        discountPercentage: 10.58,
        rating: 4.09,
        stock: 32,
        brand: "Huawei",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
        images: ["https://i.dummyjson.com/data/products/5/1.jpg"],
      },
    ]
  }
})

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Omit<Product, "id">, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      if (!response.ok) {
        throw new Error("Failed to add product")
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.warn("Failed to add product, using mock response:", error)

      // Return mock response for demo purposes
      return {
        id: Math.floor(Math.random() * 1000) + 100, // Generate a random ID
        ...product,
        images: product.images || [],
      }
    }
  },
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }: { id: number; product: Partial<Product> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      if (!response.ok) {
        throw new Error("Failed to update product")
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.warn("Failed to update product, using mock response:", error)

      // Return mock response for demo purposes
      return {
        id,
        ...product,
      }
    }
  },
)

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete product")
    }
    const data = await response.json()
    return id
  } catch (error) {
    console.warn("Failed to delete product, using mock response:", error)
    // Return the ID for demo purposes
    return id
  }
})

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload }
        }
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product.id !== action.payload)
      })
  },
})

export const { setSelectedProduct } = productSlice.actions
export default productSlice.reducer
