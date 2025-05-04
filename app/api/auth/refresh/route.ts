import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { refreshToken } = body

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token is required" }, { status: 400 })
    }

    // Try to call the external API
    try {
      const response = await fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken,
          expiresInMins: 60,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return NextResponse.json({ error: errorData.message || "Token refresh failed" }, { status: response.status })
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error) {
      console.warn("External API call failed, using mock data:", error)

      // If the external API fails, return mock data for demo purposes
      return NextResponse.json({
        accessToken: "new-mock-access-token-for-demo-purposes",
        refreshToken: "new-mock-refresh-token-for-demo-purposes",
      })
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
