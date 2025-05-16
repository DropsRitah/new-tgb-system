"use client"

import { Progress } from "@/components/ui/progress"

export function InventoryStatus() {
  const products = [
    {
      name: "12 Pack Star Cookies (Vanilla Brown)",
      stock: 85,
      capacity: 100,
    },
    {
      name: "10 Pack Star Cookies (Red)",
      stock: 42,
      capacity: 100,
    },
    {
      name: "Heart Cookies",
      stock: 23,
      capacity: 100,
    },
    {
      name: "Far Far",
      stock: 65,
      capacity: 100,
    },
    {
      name: "Mini Cookies",
      stock: 12,
      capacity: 100,
    },
    {
      name: "Kaimati",
      stock: 8,
      capacity: 100,
    },
    {
      name: "Red Velvet Cake",
      stock: 5,
      capacity: 20,
    },
    {
      name: "Fancy Cake",
      stock: 3,
      capacity: 20,
    },
  ]

  return (
    <div className="space-y-8">
      {products.map((product) => {
        const percentage = (product.stock / product.capacity) * 100
        let statusColor = "bg-green-500"

        if (percentage < 15) {
          statusColor = "bg-red-500"
        } else if (percentage < 40) {
          statusColor = "bg-yellow-500"
        }

        return (
          <div key={product.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs text-muted-foreground">
                  {product.stock} of {product.capacity} in stock
                </span>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  percentage < 15
                    ? "bg-red-100 text-red-800"
                    : percentage < 40
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {percentage < 15 ? "Low Stock" : percentage < 40 ? "Medium Stock" : "Good Stock"}
              </span>
            </div>
            <Progress value={percentage} className={`h-2 ${statusColor}`} />
          </div>
        )
      })}
    </div>
  )
}
