"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const attendanceData = [
  {
    name: "Week 1",
    attendance: 95,
  },
  {
    name: "Week 2",
    attendance: 92,
  },
  {
    name: "Week 3",
    attendance: 88,
  },
  {
    name: "Week 4",
    attendance: 90,
  },
]

const employeePerformance = [
  {
    name: "John Doe",
    position: "Baker",
    attendance: "95%",
    productivity: "High",
    status: "active",
  },
  {
    name: "Jane Smith",
    position: "Assistant Baker",
    attendance: "92%",
    productivity: "High",
    status: "active",
  },
  {
    name: "Michael Johnson",
    position: "Delivery",
    attendance: "88%",
    productivity: "Medium",
    status: "active",
  },
  {
    name: "Sarah Williams",
    position: "Sales",
    attendance: "98%",
    productivity: "High",
    status: "active",
  },
  {
    name: "Robert Brown",
    position: "Manager",
    attendance: "100%",
    productivity: "High",
    status: "active",
  },
]

export function EmployeeReport() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Rate</CardTitle>
          <CardDescription>Weekly attendance percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip formatter={(value) => [`${value}%`, "Attendance Rate"]} labelFormatter={(label) => `${label}`} />
              <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employee Performance</CardTitle>
          <CardDescription>Attendance and productivity metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Productivity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeePerformance.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.attendance}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.productivity === "High"
                          ? "success"
                          : employee.productivity === "Medium"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {employee.productivity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "active"
                          ? "success"
                          : employee.status === "on leave"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
