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
import { Plus, Trash, TrendingUp, DollarSign, Package, ShoppingCart, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { initialStoreInventory, initialProducts } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function StorePage() {
  const { toast } = useToast()
  const [storeInventory, setStoreInventory] = useState(initialStoreInventory)
  const [newInventory, setNewInventory] = useState({
    id: "",
    date: new Date().toISOString().split("T")[0],
    productId: "",
    previousStock: 0,
    newStock: 0,
    sold: 0,
    remaining: 0,
    price: 0,
  })
  const [openAdd, setOpenAdd] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [viewSalesData, setViewSalesData] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewInventory({ ...newInventory, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "productId") {
      const product = initialProducts.find((p) => p.id === value)
      if (product) {
        // Get previous remaining stock for this product
        const previousInventory = storeInventory
          .filter((item) => item.productId === value)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

        const previousStock = previousInventory ? previousInventory.remaining : 0

        setNewInventory({
          ...newInventory,
          productId: value,
          previousStock,
          price: Number.parseInt(product.price) * 1.1, // 10% markup for retail
        })
      }
    } else {
      setNewInventory({ ...newInventory, [name]: value })
    }
  }

  const calculateRemaining = () => {
    const previous = Number.parseInt(newInventory.previousStock.toString()) || 0
    const newStock = Number.parseInt(newInventory.newStock.toString()) || 0
    const sold = Number.parseInt(newInventory.sold.toString()) || 0

    return previous + newStock - sold
  }

  const handleAddInventory = () => {
    if (!newInventory.productId || !newInventory.date || newInventory.newStock <= 0) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const id = `si${Date.now()}`
    const remaining = calculateRemaining()

    setStoreInventory([
      ...storeInventory,
      {
        ...newInventory,
        id,
        remaining,
      },
    ])

    setNewInventory({
      id: "",
      date: new Date().toISOString().split("T")[0],
      productId: "",
      previousStock: 0,
      newStock: 0,
      sold: 0,
      remaining: 0,
      price: 0,
    })

    setOpenAdd(false)
    toast({
      title: "Success",
      description: "Store inventory updated successfully",
    })
  }

  const handleDeleteInventory = (id: string) => {
    setStoreInventory(storeInventory.filter((item) => item.id !== id))
    toast({
      title: "Success",
      description: "Inventory record deleted successfully",
    })
  }

  const getProductName = (id: string) => {
    const product = initialProducts.find((p) => p.id === id)
    return product ? product.name : "Unknown"
  }

  // Get inventory for selected date
  const getInventoryByDate = (date: string) => {
    return storeInventory.filter((item) => item.date === date)
  }

  // Calculate total sales for a date
  const calculateTotalSales = (date: string) => {
    const items = getInventoryByDate(date)
    return items.reduce((total, item) => total + item.sold * item.price, 0)
  }

  // Get unique dates from inventory
  const getUniqueDates = () => {
    const dates = storeInventory.map((item) => item.date)
    return [...new Set(dates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Kariobangi Store</h2>
        <div className="flex gap-2">
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Store Inventory
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Store Inventory</DialogTitle>
                <DialogDescription>Record products shipped to the Kariobangi store and track sales.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newInventory.date}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="productId" className="text-right">
                    Product
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("productId", value)}
                    value={newInventory.productId}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {initialProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="previousStock" className="text-right">
                    Previous Stock
                  </Label>
                  <Input
                    id="previousStock"
                    name="previousStock"
                    type="number"
                    value={newInventory.previousStock}
                    readOnly
                    className="col-span-3 bg-muted"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newStock" className="text-right">
                    New Stock
                  </Label>
                  <Input
                    id="newStock"
                    name="newStock"
                    type="number"
                    value={newInventory.newStock}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sold" className="text-right">
                    Sold
                  </Label>
                  <Input
                    id="sold"
                    name="sold"
                    type="number"
                    value={newInventory.sold}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Retail Price (KSh)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={newInventory.price}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="remaining" className="text-right">
                    Remaining
                  </Label>
                  <Input
                    id="remaining"
                    name="remaining"
                    type="number"
                    value={calculateRemaining()}
                    readOnly
                    className="col-span-3 bg-muted"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddInventory}>
                  Save Inventory
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={viewSalesData} onOpenChange={setViewSalesData}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Sales Data
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Store Sales Data</DialogTitle>
                <DialogDescription>View sales performance for the Kariobangi store by date.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Total Sales Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        KSh {calculateTotalSales(new Date().toISOString().split("T")[0]).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Products Sold Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {getInventoryByDate(new Date().toISOString().split("T")[0]).reduce(
                          (total, item) => total + item.sold,
                          0,
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Current Stock Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        KSh{" "}
                        {storeInventory
                          .reduce((total, item) => total + item.remaining * item.price, 0)
                          .toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue={getUniqueDates()[0] || ""} className="w-full">
                  <ScrollArea className="w-full" orientation="horizontal">
                    <TabsList className="w-full">
                      {getUniqueDates().map((date) => (
                        <TabsTrigger key={date} value={date}>
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </ScrollArea>

                  {getUniqueDates().map((date) => (
                    <TabsContent key={date} value={date} className="border rounded-md mt-2">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">
                            Sales for{" "}
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h3>
                          <Badge variant="outline" className="text-lg">
                            KSh {calculateTotalSales(date).toLocaleString()}
                          </Badge>
                        </div>

                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead className="text-right">Previous Stock</TableHead>
                              <TableHead className="text-right">New Stock</TableHead>
                              <TableHead className="text-right">Total Available</TableHead>
                              <TableHead className="text-right">Sold</TableHead>
                              <TableHead className="text-right">Remaining</TableHead>
                              <TableHead className="text-right">Sales (KSh)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getInventoryByDate(date).map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">{getProductName(item.productId)}</TableCell>
                                <TableCell className="text-right">{item.previousStock}</TableCell>
                                <TableCell className="text-right">{item.newStock}</TableCell>
                                <TableCell className="text-right">{item.previousStock + item.newStock}</TableCell>
                                <TableCell className="text-right">{item.sold}</TableCell>
                                <TableCell className="text-right">{item.remaining}</TableCell>
                                <TableCell className="text-right">
                                  {(item.sold * item.price).toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              KSh {calculateTotalSales(new Date().toISOString().split("T")[0]).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Sold Today</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getInventoryByDate(new Date().toISOString().split("T")[0]).reduce((total, item) => total + item.sold, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {storeInventory.reduce((total, item) => total + item.remaining, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              KSh {storeInventory.reduce((total, item) => total + item.remaining * item.price, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="dateFilter">Filter by Date:</Label>
          <Input
            id="dateFilter"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Previous Stock</TableHead>
                <TableHead className="text-right">New Stock</TableHead>
                <TableHead className="text-right">Sold</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="text-right">Price (KSh)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storeInventory
                .filter((item) => item.date === selectedDate)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="font-medium">{getProductName(item.productId)}</TableCell>
                    <TableCell className="text-right">{item.previousStock}</TableCell>
                    <TableCell className="text-right">{item.newStock}</TableCell>
                    <TableCell className="text-right">{item.sold}</TableCell>
                    <TableCell className="text-right">{item.remaining}</TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteInventory(item.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
