import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error("Failed to update product")
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      console.warn("External API call failed, using mock data:", error)

      // Return mock response for demo purposes
      return NextResponse.json({
        id: Number.parseInt(id),
        ...body,
      })
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      console.warn("External API call failed, using mock data:", error)

      // Return mock response for demo purposes
      return NextResponse.json({
        id: Number.parseInt(id),
        isDeleted: true,
        deletedOn: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
