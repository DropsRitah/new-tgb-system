import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { CakeIcon } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CakeIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">T.G.B Bakers</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
              Dashboard
            </Link>
            <Link href="/products" className="transition-colors hover:text-foreground/80">
              Products
            </Link>
            <Link href="/ingredients" className="transition-colors hover:text-foreground/80">
              Ingredients
            </Link>
            <Link href="/customers" className="transition-colors hover:text-foreground/80">
              Customers
            </Link>
            <Link href="/orders" className="transition-colors hover:text-foreground/80">
              Orders
            </Link>
            <Link href="/employees" className="transition-colors hover:text-foreground/80">
              Employees
            </Link>
            <Link href="/reports" className="transition-colors hover:text-foreground/80">
              Reports
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" className="ml-auto hidden h-8 lg:flex">
              <span>Help</span>
            </Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
