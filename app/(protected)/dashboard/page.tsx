import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - CRM Application",
  description: "CRM Dashboard with analytics and insights",
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardCards />
      <DashboardCharts />
    </div>
  )
}
