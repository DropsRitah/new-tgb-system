"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { initialOrders, initialCustomers, initialProducts } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PendingOrders() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  // Filter orders that are pending or processing and sort by delivery date
  const pendingOrders = [...initialOrders]
    .filter((order) => order.status === "pending" || order.status === "processing")
    .sort((a, b) => {
      // Sort by delivery date (closest first)
      if (a.deliveryDate && b.deliveryDate) {
        return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime()
      }
      // If one has a delivery date and the other doesn't, prioritize the one with a date
      if (a.deliveryDate) return -1
      if (b.deliveryDate) return 1
      // If neither has a delivery date, sort by order date
      return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
    })
    .slice(0, 5) // Show only the top 5 pending orders

  const getCustomerName = (id: string) => {
    const customer = initialCustomers.find((c) => c.id === id)
    return customer ? customer.name : "Unknown"
  }

  const getProductName = (id: string) => {
    const product = initialProducts.find((p) => p.id === id)
    return product ? product.name : "Unknown"
  }

  // Calculate days until delivery
  const getDaysUntilDelivery = (deliveryDate: string) => {
    if (!deliveryDate) return "Not scheduled"

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const delivery = new Date(deliveryDate)
    delivery.setHours(0, 0, 0, 0)

    const diffTime = delivery.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    return `${diffDays} days`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Orders</CardTitle>
        <CardDescription>Orders that need to be processed and delivered</CardDescription>
      </CardHeader>
      <CardContent>
        {pendingOrders.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No pending orders</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{getCustomerName(order.customerId)}</TableCell>
                  <TableCell>{getProductName(order.productId)}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{order.deliveryDate || "Not scheduled"}</span>
                      <span className="text-xs text-muted-foreground">{getDaysUntilDelivery(order.deliveryDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status === "processing" ? "warning" : "outline"}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.paymentStatus === "paid"
                          ? "success"
                          : order.paymentStatus === "paid on delivery"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
