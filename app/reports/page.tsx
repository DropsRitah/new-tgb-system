"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FinancialReport } from "@/components/reports/financial-report"
import { InventoryReport } from "@/components/reports/inventory-report"
import { SalesReport } from "@/components/reports/sales-report"
import { EmployeeReport } from "@/components/reports/employee-report"

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
      </div>
      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Report</CardTitle>
              <CardDescription>Monthly profit and loss statement</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialReport />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Report</CardTitle>
              <CardDescription>Current stock levels and ingredient usage</CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryReport />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Report</CardTitle>
              <CardDescription>Sales by product and customer</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesReport />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Report</CardTitle>
              <CardDescription>Attendance and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeeReport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
