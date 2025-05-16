"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Plus, PlusCircle, MinusCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { initialOrders, initialCustomers, initialProducts } from "@/lib/data"
import { Separator } from "@/components/ui/separator"

export default function OrdersPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState(initialOrders)
  const [newOrder, setNewOrder] = useState({
    id: "",
    customerId: "",
    orderDate: new Date().toISOString().split("T")[0],
    deliveryDate: "",
    status: "pending",
    totalAmount: 0,
    payments: [],
    items: [] as { productId: string; quantity: number; price: number }[],
  })
  const [editingOrder, setEditingOrder] = useState<null | {
    id: string;
    status: string;
  }>(null)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedQuantity, setSelectedQuantity] = useState("")
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openPayment, setOpenPayment] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [currentOrderId, setCurrentOrderId] = useState("")
  const [viewOrderDetails, setViewOrderDetails] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewOrder({ ...newOrder, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewOrder({ ...newOrder, [name]: value })
  }

  const addProductToOrder = () => {
    if (!selectedProduct || !selectedQuantity || Number.parseInt(selectedQuantity) <= 0) {
      toast({
        title: "Error",
        description: "Please select a product and enter a valid quantity",
        variant: "destructive",
      })
      return
    }

    const product = initialProducts.find((p) => p.id === selectedProduct)
    if (!product) return

    const price = Number.parseInt(product.price)
    const quantity = Number.parseInt(selectedQuantity)

    // Check if product already exists in order
    const existingItemIndex = newOrder.items.findIndex((item) => item.productId === selectedProduct)

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...newOrder.items]
      updatedItems[existingItemIndex].quantity += quantity
      setNewOrder({
        ...newOrder,
        items: updatedItems,
        totalAmount: newOrder.totalAmount + price * quantity,
      })
    } else {
      // Add new item
      setNewOrder({
        ...newOrder,
        items: [...newOrder.items, { productId: selectedProduct, quantity, price }],
        totalAmount: newOrder.totalAmount + price * quantity,
      })
    }

    setSelectedProduct("")
    setSelectedQuantity("")
  }

  const removeProductFromOrder = (index: number) => {
    const item = newOrder.items[index]
    const updatedItems = newOrder.items.filter((_, i) => i !== index)
    setNewOrder({
      ...newOrder,
      items: updatedItems,
      totalAmount: newOrder.totalAmount - item.price * item.quantity,
    })
  }

  const handleAddOrder = () => {
    if (!newOrder.customerId || newOrder.items.length === 0 || !newOrder.deliveryDate) {
      toast({
        title: "Error",
        description: "Please fill all required fields and add at least one product",
        variant: "destructive",
      })
      return
    }

    const id = Date.now().toString()
    setOrders([...orders, { ...newOrder, id }])
    setNewOrder({
      id: "",
      customerId: "",
      orderDate: new Date().toISOString().split("T")[0],
      deliveryDate: "",
      status: "pending",
      totalAmount: 0,
      payments: [],
      items: [],
    })
    setOpenAdd(false)
    toast({
      title: "Success",
      description: "Order added successfully",
    })
  }

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id))
    toast({
      title: "Success",
      description: "Order deleted successfully",
    })
  }

  const handleEditOrder = (id: string) => {
    const order = orders.find((o) => o.id === id)
    if (order) {
      setEditingOrder({
        id,
        status: order.status,
      })
      setOpenEdit(true)
    }
  }

  const handleUpdateOrder = () => {
    if (editingOrder) {
      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id ? { ...order, status: editingOrder.status } : order
        )
      )
      setOpenEdit(false)
      toast({
        title: "Success",
        description: "Order updated successfully",
      })
    }
  }

  const openPaymentDialog = (orderId: string) => {
    setCurrentOrderId(orderId)
    setPaymentAmount("")
    setPaymentMethod("cash")
    setOpenPayment(true)
  }

  const handleAddPayment = () => {
    if (!paymentAmount || Number.parseFloat(paymentAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(paymentAmount)
    const paymentId = `p${Date.now()}`
    const paymentDate = new Date().toISOString().split("T")[0]

    setOrders(
      orders.map((order) => {
        if (order.id === currentOrderId) {
          const newPayment = {
            id: paymentId,
            amount,
            date: paymentDate,
            method: paymentMethod,
          }
          return {
            ...order,
            payments: [...order.payments, newPayment],
          }
        }
        return order
      })
    )

    setOpenPayment(false)
    toast({
      title: "Success",
      description: "Payment added successfully",
    })
  }

  const getCustomerName = (id: string) => {
    const customer = initialCustomers.find((c) => c.id === id)
    return customer ? customer.name : "Unknown"
  }

  const getProductName = (id: string) => {
    const product = initialProducts.find((p) => p.id === id)
    return product ? product.name : "Unknown"
  }

  const calculateTotalPaid = (payments: any[]) => {
    return payments.reduce((total, payment) => total + payment.amount, 0)
  }

  const getPaymentStatus = (order: any) => {
    const totalPaid = calculateTotalPaid(order.payments)
    
    if (totalPaid === 0) return "not paid"
    if (totalPaid < order.totalAmount) return "partially paid"
    return "fully paid"
  }

  const getPaymentStatusBadge = (order: any) => {
    const status = getPaymentStatus(order)
    const totalPaid = calculateTotalPaid(order.payments)
    const remaining = order.totalAmount - totalPaid
    
    return (
      <div className="flex flex-col gap-1">
        <Badge
          variant={
            status === "fully paid"
              ? "success"
              : status === "partially paid"
                ? "warning"
                : "destructive"
          }
        >
          {status}
        </Badge>
        <span className="text-xs">
          {totalPaid.toLocaleString()} / {order.totalAmount.toLocaleString()} KSh
          {remaining > 0 && ` (${remaining.toLocaleString()} remaining)`}
        </span>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Order</DialogTitle>
              <DialogDescription>Add a new customer order with multiple products.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerId" className="text-right">
                  Customer
                </Label>
                <Select onValueChange={(value) => handleSelectChange("customerId", value)} value={newOrder.customerId}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {initialCustomers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="orderDate" className="text-right">
                  Order Date
                </Label>
                <Input
                  id="orderDate"
                  name="orderDate"
                  type="date"
                  value={newOrder.orderDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deliveryDate" className="text-right">
                  Delivery Date
                </Label>
                <Input
                  id="deliveryDate"
                  name="deliveryDate"
                  type="date"
                  value={newOrder.deliveryDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select onValueChange={(value) => handleSelectChange("status", value)} value={newOrder.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-2" />
              <h3 className="text-lg font-medium">Add Products</h3>

              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <Select onValueChange={setSelectedProduct} value={selectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {initialProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - KSh {product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  />
                </div>
                <div className="col-span-4">
                  <Button type="button" onClick={addProductToOrder}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </div>
              </div>

              {newOrder.items.length > 0 && (
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {newOrder.items.map((item, index) => {
                      const product = initialProducts.find((p) => p.id === item.productId)
                      return (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{getProductName(item.productId)}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              {item.quantity} x KSh {item.price}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-4">KSh {item.quantity * item.price}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeProductFromOrder(index)}
                            >
                              <MinusCircle className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>KSh {newOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddOrder}>
                Save Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Order Dialog */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>Update the status for this order.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editStatus" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(value) => setEditingOrder((prev) => (prev ? { ...prev, status: value } : null))}
                value={editingOrder?.status || ""}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateOrder}>
              Update Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog open={openPayment} onOpenChange={setOpenPayment}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Payment</DialogTitle>
            <DialogDescription>Record a payment for this order.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentAmount" className="text-right">
                Amount (KSh)
              </Label>
              <Input
                id="paymentAmount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Method
              </Label>
              <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>
\
