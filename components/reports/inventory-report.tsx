"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  {
    name: "Flour",
    current: 120,
    used: 80,
    reorder: 50,
  },
  {
    name: "Sugar",
    current: 85,
    used: 45,
    reorder: 40,
  },
  {
    name: "Butter",
    current: 35,
    used: 25,
    reorder: 30,
  },
  {
    name: "Eggs",
    current: 200,
    used: 150,
    reorder: 100,
  },
  {
    name: "Vanilla",
    current: 15,
    used: 5,
    reorder: 10,
  },
  {
    name: "Chocolate",
    current: 40,
    used: 20,
    reorder: 25,
  },
]

export function InventoryReport() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Ingredient Usage</CardTitle>
          <CardDescription>Current stock vs. used in last shift</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" name="Current Stock" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="used" name="Used Last Shift" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reorder" name="Reorder Level" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ingredients to Reorder</CardTitle>
          <CardDescription>Items below or near reorder level</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => {
                const status =
                  item.current <= item.reorder
                    ? "Reorder Now"
                    : item.current <= item.reorder * 1.2
                      ? "Reorder Soon"
                      : "OK"
                const statusClass =
                  status === "Reorder Now"
                    ? "text-red-500 font-medium"
                    : status === "Reorder Soon"
                      ? "text-yellow-500 font-medium"
                      : "text-green-500 font-medium"

                return (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.current}</TableCell>
                    <TableCell>{item.reorder}</TableCell>
                    <TableCell className={statusClass}>{status}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
