"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    month: "Jan",
    revenue: 12000,
    expenses: 8500,
    profit: 3500,
  },
  {
    month: "Feb",
    revenue: 19000,
    expenses: 12000,
    profit: 7000,
  },
  {
    month: "Mar",
    revenue: 23000,
    expenses: 15000,
    profit: 8000,
  },
  {
    month: "Apr",
    revenue: 28000,
    expenses: 18000,
    profit: 10000,
  },
  {
    month: "May",
    revenue: 35000,
    expenses: 22000,
    profit: 13000,
  },
  {
    month: "Jun",
    revenue: 32000,
    expenses: 20000,
    profit: 12000,
  },
]

export function FinancialReport() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 149,000</div>
            <p className="text-xs text-muted-foreground">+18.2% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 95,500</div>
            <p className="text-xs text-muted-foreground">+12.5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 53,500</div>
            <p className="text-xs text-muted-foreground">+24.8% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Performance</CardTitle>
          <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `KSh ${value / 1000}k`}
              />
              <Tooltip formatter={(value) => [`KSh ${value}`, ""]} labelFormatter={(label) => `Month: ${label}`} />
              <Line type="monotone" dataKey="revenue" stroke="#4ade80" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
