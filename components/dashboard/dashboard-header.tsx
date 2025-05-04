"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"

export function DashboardHeader() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back, {user?.firstName || "User"}! Here's an overview of your CRM data.
      </p>
    </div>
  )
}
