import { CakeIcon } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <div className="flex items-center gap-2 text-sm">
          <CakeIcon className="h-4 w-4" />
          <p>© 2025 T.G.B Bakers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
