"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash, Edit, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { initialCustomers, initialOrders, initialProducts } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CustomersPage() {
  const { toast } = useToast()
  const [customers, setCustomers] = useState(initialCustomers)
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    contact: "",
    address: "",
    paymentStatus: "not complete",
    totalOrders: "0",
  })
  const [editingCustomer, setEditingCustomer] = useState<null | {
    id: string
    paymentStatus: string
  }>(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCustomer({ ...newCustomer, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewCustomer({ ...newCustomer, [name]: value })
  }

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.contact) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const id = Date.now().toString()
    setCustomers([...customers, { ...newCustomer, id }])
    setNewCustomer({
      id: "",
      name: "",
      contact: "",
      address: "",
      paymentStatus: "not complete",
      totalOrders: "0",
    })
    setOpenAdd(false)
    toast({
      title: "Success",
      description: "Customer added successfully",
    })
  }

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
    toast({
      title: "Success",
      description: "Customer deleted successfully",
    })
  }

  const handleEditPaymentStatus = (id: string) => {
    const customer = customers.find((c) => c.id === id)
    if (customer) {
      setEditingCustomer({
        id,
        paymentStatus: customer.paymentStatus,
      })
      setOpenEdit(true)
    }
  }

  const handleUpdatePaymentStatus = () => {
    if (editingCustomer) {
      setCustomers(
        customers.map((customer) =>
          customer.id === editingCustomer.id ? { ...customer, paymentStatus: editingCustomer.paymentStatus } : customer,
        ),
      )
      setOpenEdit(false)
      toast({
        title: "Success",
        description: "Payment status updated successfully",
      })
    }
  }

  const viewCustomerHistory = (customerId: string) => {
    setSelectedCustomer(customerId)
  }

  // Get customer orders
  const getCustomerOrders = (customerId: string) => {
    return initialOrders.filter((order) => order.customerId === customerId)
  }

  // Calculate total spent by customer
  const calculateTotalSpent = (customerId: string) => {
    const orders = getCustomerOrders(customerId)
    return orders.reduce((total, order) => total + order.totalAmount, 0)
  }

  // Calculate total paid by customer
  const calculateTotalPaid = (customerId: string) => {
    const orders = getCustomerOrders(customerId)
    return orders.reduce((total, order) => {
      const orderPaid = order.payments.reduce((sum, payment) => sum + payment.amount, 0)
      return total + orderPaid
    }, 0)
  }

  // Get product name
  const getProductName = (productId: string) => {
    const product = initialProducts.find((p) => p.id === productId)
    return product ? product.name : "Unknown Product"
  }

  // Get payment status badge
  const getPaymentStatusBadge = (order: any) => {
    const totalPaid = order.payments.reduce((sum: number, payment: any) => sum + payment.amount, 0)
    const status = totalPaid === 0 ? "not paid" : totalPaid < order.totalAmount ? "partially paid" : "fully paid"

    return (
      <div className="flex flex-col gap-1">
        <Badge variant={status === "fully paid" ? "success" : status === "partially paid" ? "warning" : "destructive"}>
          {status}
        </Badge>
        <span className="text-xs">
          {totalPaid.toLocaleString()} / {order.totalAmount.toLocaleString()} KSh
        </span>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Add a new customer to your database. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  value={newCustomer.contact}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={newCustomer.address}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentStatus" className="text-right">
                  Payment Status
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("paymentStatus", value)}
                  value={newCustomer.paymentStatus}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="paid on delivery">Paid on Delivery</SelectItem>
                    <SelectItem value="not complete">Not Complete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCustomer}>
                Save Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Payment Status Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Payment Status</DialogTitle>
            <DialogDescription>Update the payment status for this customer.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editPaymentStatus" className="text-right">
                Payment Status
              </Label>
              <Select
                onValueChange={(value) =>
                  setEditingCustomer((prev) => (prev ? { ...prev, paymentStatus: value } : null))
                }
                value={editingCustomer?.paymentStatus || ""}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="paid on delivery">Paid on Delivery</SelectItem>
                  <SelectItem value="not complete">Not Complete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdatePaymentStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer History Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedCustomer &&
            (() => {
              const customer = customers.find((c) => c.id === selectedCustomer)
              if (!customer) return null

              const customerOrders = getCustomerOrders(selectedCustomer)
              const totalSpent = calculateTotalSpent(selectedCustomer)
              const totalPaid = calculateTotalPaid(selectedCustomer)

              return (
                <>
                  <DialogHeader>
                    <DialogTitle>Customer History</DialogTitle>
                    <DialogDescription>Order history and payment details for {customer.name}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Total Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{customerOrders.length}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Total Spent</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">KSh {totalSpent.toLocaleString()}</div>
                          <p className="text-xs text-muted-foreground">
                            {totalPaid.toLocaleString()} paid of {totalSpent.toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <Tabs defaultValue="orders" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                        <TabsTrigger value="payments">Payments</TabsTrigger>
                      </TabsList>
                      <TabsContent value="orders" className="border rounded-md mt-2">
                        <ScrollArea className="h-[300px]">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {customerOrders.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center">
                                    No orders found
                                  </TableCell>
                                </TableRow>
                              ) : (
                                customerOrders.map((order) => (
                                  <TableRow key={order.id}>
                                    <TableCell>{order.orderDate}</TableCell>
                                    <TableCell>
                                      <div className="max-h-20 overflow-auto">
                                        {order.items.map((item, idx) => (
                                          <div key={idx} className="text-sm">
                                            {item.quantity} x {getProductName(item.productId)}
                                          </div>
                                        ))}
                                      </div>
                                    </TableCell>
                                    <TableCell>KSh {order.totalAmount.toLocaleString()}</TableCell>
                                    <TableCell>
                                      <Badge
                                        variant={
                                          order.status === "delivered"
                                            ? "success"
                                            : order.status === "processing"
                                              ? "warning"
                                              : order.status === "cancelled"
                                                ? "destructive"
                                                : "outline"
                                        }
                                      >
                                        {order.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{getPaymentStatusBadge(order)}</TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="payments" className="border rounded-md mt-2">
                        <ScrollArea className="h-[300px]">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {customerOrders.flatMap((order) =>
                                order.payments.map((payment) => ({
                                  ...payment,
                                  orderDate: order.orderDate,
                                  orderId: order.id,
                                })),
                              ).length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center">
                                    No payments found
                                  </TableCell>
                                </TableRow>
                              ) : (
                                customerOrders.flatMap((order) =>
                                  order.payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                      <TableCell>{payment.date}</TableCell>
                                      <TableCell>{order.orderDate}</TableCell>
                                      <TableCell className="capitalize">{payment.method}</TableCell>
                                      <TableCell className="text-right">
                                        KSh {payment.amount.toLocaleString()}
                                      </TableCell>
                                    </TableRow>
                                  )),
                                )
                              )}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </div>
                </>
              )
            })()}
        </DialogContent>
      </Dialog>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => {
              const totalSpent = calculateTotalSpent(customer.id)
              const totalPaid = calculateTotalPaid(customer.id)
              const orderCount = getCustomerOrders(customer.id).length

              return (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.paymentStatus === "paid"
                          ? "success"
                          : customer.paymentStatus === "paid on delivery"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {customer.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{orderCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>KSh {totalSpent.toLocaleString()}</span>
                      {totalPaid < totalSpent && (
                        <span className="text-xs text-muted-foreground">{totalPaid.toLocaleString()} paid</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => viewCustomerHistory(customer.id)}>
                        <History className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEditPaymentStatus(customer.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCustomer(customer.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
