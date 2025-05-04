"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

// Sample data for charts
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4000 },
  { name: "May", revenue: 7000 },
  { name: "Jun", revenue: 6000 },
  { name: "Jul", revenue: 8000 },
  { name: "Aug", revenue: 9000 },
  { name: "Sep", revenue: 8500 },
  { name: "Oct", revenue: 10000 },
  { name: "Nov", revenue: 11000 },
  { name: "Dec", revenue: 12000 },
]

const productData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home", value: 200 },
  { name: "Beauty", value: 150 },
  { name: "Sports", value: 100 },
]

const customerData = [
  { name: "Jan", new: 400, returning: 240 },
  { name: "Feb", new: 300, returning: 198 },
  { name: "Mar", new: 500, returning: 300 },
  { name: "Apr", new: 400, returning: 308 },
  { name: "May", new: 700, returning: 400 },
  { name: "Jun", new: 600, returning: 380 },
  { name: "Jul", new: 800, returning: 500 },
  { name: "Aug", new: 900, returning: 580 },
  { name: "Sep", new: 850, returning: 600 },
  { name: "Oct", new: 1000, returning: 700 },
  { name: "Nov", new: 1100, returning: 800 },
  { name: "Dec", new: 1200, returning: 850 },
]

export function DashboardCharts() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Sales distribution by category</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
            <CardDescription>New vs returning customers</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={customerData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="new" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="returning" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
     
    </Tabs>
  )
}
