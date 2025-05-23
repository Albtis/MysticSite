"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"

interface ShopItemProps {
  item: {
    id: string
    name: string
    price: number
    description: string
  }
}

export default function ShopItem({ item }: ShopItemProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(item)
    // Простое уведомление без toast
    console.log(`${item.name} добавлен в корзину`)
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white border-purple-500">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            {item.name}
          </h3>
          <p className="text-purple-200 mb-4">{item.description}</p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
            {item.price} ₽
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
