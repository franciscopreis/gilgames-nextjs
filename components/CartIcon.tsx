'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface CartIconProps {
  itemsCount?: number
}

export default function CartIcon({ itemsCount = 0 }: CartIconProps) {
  return (
    <Button variant="ghost" className="relative p-2">
      <ShoppingCart className="h-5 w-5" />
      {itemsCount > 0 && (
        <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
          {itemsCount}
        </span>
      )}
    </Button>
  )
}
