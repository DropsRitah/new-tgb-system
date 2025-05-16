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
import { Plus, Trash, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { initialEmployees } from "@/lib/data"

export default function EmployeesPage() {
  const { toast } = useToast()
  const [employees, setEmployees] = useState(initialEmployees)
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    position: "",
    contact: "",
    joinDate: "",
    status: "active",
  })
  const [open, setOpen] = useState(false)
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEmployee({ ...newEmployee, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewEmployee({ ...newEmployee, [name]: value })
  }

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.contact) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const id = Date.now().toString()
    setEmployees([
      ...employees,
      {
        ...newEmployee,
        id,
        attendance: {},
      },
    ])
    setNewEmployee({
      id: "",
      name: "",
      position: "",
      contact: "",
      joinDate: "",
      status: "active",
    })
    setOpen(false)
    toast({
      title: "Success",
      description: "Employee added successfully",
    })
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
    toast({
      title: "Success",
      description: "Employee deleted successfully",
    })
  }

  const toggleAttendance = (employeeId: string) => {
    setEmployees(
      employees.map((employee) => {
        if (employee.id === employeeId) {
          const updatedAttendance = { ...employee.attendance }
          if (updatedAttendance[attendanceDate]) {
            updatedAttendance[attendanceDate] = !updatedAttendance[attendanceDate]
          } else {
            updatedAttendance[attendanceDate] = true
          }
          return { ...employee, attendance: updatedAttendance }
        }
        return employee
      }),
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Add a new employee to your team. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Select onValueChange={(value) => handleSelectChange("position", value)} value={newEmployee.position}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baker">Baker</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="packager">Packager</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="sales marketer">Sales Marketer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">
                  Contact
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  value={newEmployee.contact}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="joinDate" className="text-right">
                  Join Date
                </Label>
                <Input
                  id="joinDate"
                  name="joinDate"
                  type="date"
                  value={newEmployee.joinDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select onValueChange={(value) => handleSelectChange("status", value)} value={newEmployee.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddEmployee}>
                Save Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Label htmlFor="attendanceDate">Attendance Date:</Label>
        <Input
          id="attendanceDate"
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          className="w-auto"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.contact}</TableCell>
                <TableCell>{employee.joinDate}</TableCell>
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
                <TableCell>
                  <Button
                    variant={employee.attendance?.[attendanceDate] ? "success" : "outline"}
                    size="sm"
                    onClick={() => toggleAttendance(employee.id)}
                  >
                    {employee.attendance?.[attendanceDate] ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <X className="h-4 w-4 mr-1" />
                    )}
                    {employee.attendance?.[attendanceDate] ? "Present" : "Absent"}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteEmployee(employee.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
