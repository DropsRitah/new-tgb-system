export const initialProducts = [
  {
    id: "1",
    name: "12 Pack Star Cookies",
    category: "cookies",
    price: "450",
    stock: "120",
    color: "vanilla brown",
    packSize: "12 pack",
  },
  {
    id: "2",
    name: "12 Pack Star Cookies",
    category: "cookies",
    price: "450",
    stock: "85",
    color: "red",
    packSize: "12 pack",
  },
  {
    id: "3",
    name: "12 Pack Star Cookies",
    category: "cookies",
    price: "450",
    stock: "95",
    color: "green",
    packSize: "12 pack",
  },
  {
    id: "4",
    name: "10 Pack Star Cookies",
    category: "cookies",
    price: "380",
    stock: "110",
    color: "vanilla brown",
    packSize: "10 pack",
  },
  {
    id: "5",
    name: "Heart Cookies",
    category: "cookies",
    price: "350",
    stock: "75",
    color: "red",
    packSize: "8 pack",
  },
  {
    id: "6",
    name: "Far Far",
    category: "pastries",
    price: "250",
    stock: "60",
    color: "n/a",
    packSize: "20 pack",
  },
  {
    id: "7",
    name: "Mini Cookies",
    category: "cookies",
    price: "200",
    stock: "90",
    color: "chocolate brown",
    packSize: "24 pack",
  },
  {
    id: "8",
    name: "Kaimati",
    category: "pastries",
    price: "300",
    stock: "45",
    color: "n/a",
    packSize: "15 pack",
  },
  {
    id: "9",
    name: "Red Velvet Cake",
    category: "cakes",
    price: "1500",
    stock: "12",
    color: "red",
    packSize: "1 cake",
  },
  {
    id: "10",
    name: "Fancy Cake",
    category: "cakes",
    price: "1800",
    stock: "8",
    color: "n/a",
    packSize: "1 cake",
  },
]

export const initialIngredients = [
  {
    id: "1",
    name: "All-Purpose Flour",
    category: "flour",
    quantity: "120",
    unit: "kg",
    lastUsed: "2025-05-13",
    reorderLevel: "50",
  },
  {
    id: "2",
    name: "White Sugar",
    category: "sugar",
    quantity: "85",
    unit: "kg",
    lastUsed: "2025-05-13",
    reorderLevel: "40",
  },
  {
    id: "3",
    name: "Brown Sugar",
    category: "sugar",
    quantity: "45",
    unit: "kg",
    lastUsed: "2025-05-12",
    reorderLevel: "25",
  },
  {
    id: "4",
    name: "Butter",
    category: "dairy",
    quantity: "35",
    unit: "kg",
    lastUsed: "2025-05-13",
    reorderLevel: "30",
  },
  {
    id: "5",
    name: "Eggs",
    category: "dairy",
    quantity: "200",
    unit: "pcs",
    lastUsed: "2025-05-13",
    reorderLevel: "100",
  },
  {
    id: "6",
    name: "Vanilla Extract",
    category: "flavoring",
    quantity: "15",
    unit: "l",
    lastUsed: "2025-05-13",
    reorderLevel: "10",
  },
  {
    id: "7",
    name: "Baking Powder",
    category: "other",
    quantity: "8",
    unit: "kg",
    lastUsed: "2025-05-12",
    reorderLevel: "5",
  },
  {
    id: "8",
    name: "Chocolate Chips",
    category: "other",
    quantity: "40",
    unit: "kg",
    lastUsed: "2025-05-11",
    reorderLevel: "25",
  },
  {
    id: "9",
    name: "Red Food Coloring",
    category: "flavoring",
    quantity: "5",
    unit: "l",
    lastUsed: "2025-05-10",
    reorderLevel: "3",
  },
  {
    id: "10",
    name: "Green Food Coloring",
    category: "flavoring",
    quantity: "4",
    unit: "l",
    lastUsed: "2025-05-09",
    reorderLevel: "3",
  },
]

export const initialCustomers = [
  {
    id: "1",
    name: "Nairobi Retail Store",
    contact: "+254 712 345 678",
    address: "123 Kenyatta Ave, Nairobi",
    paymentStatus: "paid",
    totalOrders: "25",
  },
  {
    id: "2",
    name: "Mombasa Supermarket",
    contact: "+254 723 456 789",
    address: "456 Moi Ave, Mombasa",
    paymentStatus: "not complete",
    totalOrders: "18",
  },
  {
    id: "3",
    name: "Kisumu Cafe",
    contact: "+254 734 567 890",
    address: "789 Oginga St, Kisumu",
    paymentStatus: "paid",
    totalOrders: "12",
  },
  {
    id: "4",
    name: "Nakuru School",
    contact: "+254 745 678 901",
    address: "101 School Rd, Nakuru",
    paymentStatus: "paid on delivery",
    totalOrders: "8",
  },
  {
    id: "5",
    name: "Eldoret Hotel",
    contact: "+254 756 789 012",
    address: "202 Hotel St, Eldoret",
    paymentStatus: "paid",
    totalOrders: "15",
  },
]

// Updated orders structure to support multiple products per order
export const initialOrders = [
  {
    id: "1",
    customerId: "1",
    orderDate: "2025-05-10",
    deliveryDate: "2025-05-14",
    status: "delivered",
    totalAmount: 22500,
    payments: [{ id: "p1", amount: 22500, date: "2025-05-10", method: "bank transfer" }],
    items: [{ productId: "1", quantity: 50, price: 450 }],
  },
  {
    id: "2",
    customerId: "2",
    orderDate: "2025-05-11",
    deliveryDate: "2025-05-15",
    status: "processing",
    totalAmount: 15400,
    payments: [{ id: "p2", amount: 5000, date: "2025-05-11", method: "cash" }],
    items: [
      { productId: "4", quantity: 30, price: 380 },
      { productId: "6", quantity: 10, price: 250 },
    ],
  },
  {
    id: "3",
    customerId: "3",
    orderDate: "2025-05-12",
    deliveryDate: "2025-05-16",
    status: "pending",
    totalAmount: 13000,
    payments: [],
    items: [
      { productId: "7", quantity: 25, price: 200 },
      { productId: "8", quantity: 20, price: 300 },
    ],
  },
  {
    id: "4",
    customerId: "4",
    orderDate: "2025-05-13",
    deliveryDate: "2025-05-17",
    status: "pending",
    totalAmount: 7500,
    payments: [],
    items: [{ productId: "9", quantity: 5, price: 1500 }],
  },
  {
    id: "5",
    customerId: "5",
    orderDate: "2025-05-09",
    deliveryDate: "2025-05-13",
    status: "delivered",
    totalAmount: 18000,
    payments: [
      { id: "p3", amount: 10000, date: "2025-05-09", method: "mpesa" },
      { id: "p4", amount: 8000, date: "2025-05-13", method: "mpesa" },
    ],
    items: [{ productId: "2", quantity: 40, price: 450 }],
  },
  {
    id: "6",
    customerId: "1",
    orderDate: "2025-05-14",
    deliveryDate: "2025-05-18",
    status: "pending",
    totalAmount: 25000,
    payments: [{ id: "p5", amount: 15000, date: "2025-05-14", method: "bank transfer" }],
    items: [
      { productId: "3", quantity: 30, price: 450 },
      { productId: "5", quantity: 20, price: 350 },
    ],
  },
]

export const initialEmployees = [
  {
    id: "1",
    name: "John Doe",
    position: "baker",
    contact: "+254 712 123 456",
    joinDate: "2023-01-15",
    status: "active",
    attendance: {
      "2025-05-13": true,
      "2025-05-12": true,
      "2025-05-11": true,
      "2025-05-10": false,
      "2025-05-09": true,
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    position: "assistant",
    contact: "+254 723 234 567",
    joinDate: "2023-03-10",
    status: "active",
    attendance: {
      "2025-05-13": true,
      "2025-05-12": true,
      "2025-05-11": true,
      "2025-05-10": true,
      "2025-05-09": true,
    },
  },
  {
    id: "3",
    name: "Michael Johnson",
    position: "driver",
    contact: "+254 734 345 678",
    joinDate: "2023-05-20",
    status: "active",
    attendance: {
      "2025-05-13": true,
      "2025-05-12": false,
      "2025-05-11": true,
      "2025-05-10": true,
      "2025-05-09": true,
    },
  },
  {
    id: "4",
    name: "Sarah Williams",
    position: "sales marketer",
    contact: "+254 745 456 789",
    joinDate: "2023-07-05",
    status: "on leave",
    attendance: {
      "2025-05-13": false,
      "2025-05-12": false,
      "2025-05-11": false,
      "2025-05-10": true,
      "2025-05-09": true,
    },
  },
  {
    id: "5",
    name: "Robert Brown",
    position: "packager",
    contact: "+254 756 567 890",
    joinDate: "2022-11-10",
    status: "active",
    attendance: {
      "2025-05-13": true,
      "2025-05-12": true,
      "2025-05-11": true,
      "2025-05-10": true,
      "2025-05-09": true,
    },
  },
  {
    id: "6",
    name: "Lucy Kamau",
    position: "sales marketer",
    contact: "+254 712 987 654",
    joinDate: "2023-09-15",
    status: "active",
    attendance: {
      "2025-05-13": true,
      "2025-05-12": true,
      "2025-05-11": true,
      "2025-05-10": true,
      "2025-05-09": true,
    },
  },
]

// Store inventory data
export const initialStoreInventory = [
  {
    id: "si1",
    date: "2025-05-13",
    productId: "1",
    previousStock: 0,
    newStock: 50,
    sold: 35,
    remaining: 15,
    price: 500, // Store selling price (different from wholesale)
  },
  {
    id: "si2",
    date: "2025-05-13",
    productId: "4",
    previousStock: 0,
    newStock: 40,
    sold: 28,
    remaining: 12,
    price: 420,
  },
  {
    id: "si3",
    date: "2025-05-13",
    productId: "7",
    previousStock: 0,
    newStock: 60,
    sold: 45,
    remaining: 15,
    price: 250,
  },
  {
    id: "si4",
    date: "2025-05-14",
    productId: "1",
    previousStock: 15,
    newStock: 40,
    sold: 38,
    remaining: 17,
    price: 500,
  },
  {
    id: "si5",
    date: "2025-05-14",
    productId: "4",
    previousStock: 12,
    newStock: 30,
    sold: 25,
    remaining: 17,
    price: 420,
  },
  {
    id: "si6",
    date: "2025-05-14",
    productId: "7",
    previousStock: 15,
    newStock: 40,
    sold: 42,
    remaining: 13,
    price: 250,
  },
]
