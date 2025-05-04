import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization token" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Try to call the external API
    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        return NextResponse.json({ error: errorData.message || "Authentication failed" }, { status: response.status })
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      console.warn("External API call failed, using mock data:", error)

      // If the external API fails, return mock data for demo purposes
      // In a real app, you would validate the token properly
      if (token) {
        return NextResponse.json({
          id: 1,
          username: "emilys",
          email: "emily.johnson@example.com",
          firstName: "Emily",
          lastName: "Johnson",
          gender: "female",
          image: "https://dummyjson.com/icon/emilys/128",
        })
      } else {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
