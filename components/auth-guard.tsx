"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { updateTokens, logout } from "@/lib/redux/features/auth/authSlice"
import { useToast } from "@/components/ui/use-toast"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, accessToken, refreshToken }:any = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { toast } = useToast()

  const publicRoutes = ["/login"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // Function to refresh token
  const refreshAccessToken = async () => {
    if (!refreshToken) return false

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }

      const data = await response.json()
      dispatch(
        updateTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      )
      return true
    } catch (error) {
      console.error("Token refresh error:", error)
      dispatch(logout())
      return false
    }
  }

  useEffect(() => {
    // If not authenticated and not on a public route, redirect to login
    if (!isAuthenticated && !isPublicRoute) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to access this page",
      })
      router.push("/login")
    }

    // If authenticated and on a public route, redirect to dashboard
    if (isAuthenticated && isPublicRoute) {
      router.push("/dashboard")
    }

    // Set up token refresh
    if (isAuthenticated && accessToken) {
      // Refresh token every 55 minutes (assuming 60 min expiry)
      const refreshInterval = setInterval(
        () => {
          refreshAccessToken()
        },
        55 * 60 * 1000,
      )

      return () => clearInterval(refreshInterval)
    }
  }, [isAuthenticated, isPublicRoute, pathname])

  return <>{children}</>
}
