import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Try to call the external API
    try {
      const response = await fetch("https://dummyjson.com/products")

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      console.warn("External API call failed, using mock data:", error)

      // If the external API fails, return mock data for demo purposes
      return NextResponse.json({
        products: [
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
        ],
        total: 5,
        skip: 0,
        limit: 5,
      })
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error("Failed to add product")
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      console.warn("External API call failed, using mock data:", error)

      // Return mock response for demo purposes
      return NextResponse.json({
        id: Math.floor(Math.random() * 1000) + 100, // Generate a random ID
        ...body,
        images: body.images || [],
      })
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
