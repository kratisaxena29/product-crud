import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { SidebarNav } from "@/components/sidebar-nav"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col md:flex-row">
        <SidebarNav />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </AuthGuard>
  )
}
