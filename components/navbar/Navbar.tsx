import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop */}
        <div className="hidden md:flex">
          <NavbarDesktop />
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <NavbarMobile />
        </div>
      </div>
    </nav>
  )
}
