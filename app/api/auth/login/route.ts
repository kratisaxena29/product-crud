import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Try to call the external API
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60,
        }),
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
      if (username === "emilys" && password === "emilyspass") {
        return NextResponse.json({
          id: 1,
          username: "emilys",
          email: "emily.johnson@example.com",
          firstName: "Emily",
          lastName: "Johnson",
          gender: "female",
          image: "https://dummyjson.com/icon/emilys/128",
          accessToken: "mock-access-token-for-demo-purposes",
          refreshToken: "mock-refresh-token-for-demo-purposes",
        })
      } else {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
