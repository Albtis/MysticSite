"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { shopItems } from "@/lib/shop-items"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart } from "lucide-react"
import ShopItem from "@/components/ShopItem"
import ShoppingCartModal from "@/components/ShoppingCartModal"
import { useCart } from "@/contexts/CartContext"

export default function Shop() {
  const [selectedServer, setSelectedServer] = useState("Анархия")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { getTotalPrice } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredItems = shopItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!mounted) return null

  return (
    <div className="container mx-auto py-8 text-white min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Магазин
        </h1>
        <Button
          variant="outline"
          onClick={() => setIsCartOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-none"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> {getTotalPrice().toFixed(2)} ₽
        </Button>
      </motion.div>

      <motion.div
        className="mb-6 flex space-x-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Select value={selectedServer} onValueChange={setSelectedServer}>
          <SelectTrigger className="w-[200px] bg-gradient-to-r from-pink-500 to-violet-500 text-white border-none">
            <SelectValue placeholder="Выберите сервер" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Анархия">Анархия</SelectItem>
            <SelectItem value="Дуэли #1">Дуэли #1</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Поиск по товарам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-purple-800 text-white placeholder-purple-300 border-purple-600"
        />
      </motion.div>

      <Tabs defaultValue="privileges" className="mt-8">
        <TabsList className="mb-6 bg-purple-800">
          <TabsTrigger
            value="privileges"
            className="data-[state=active]:bg-gradient-to-r from-pink-500 to-violet-500 text-white"
          >
            Привилегии
          </TabsTrigger>
          <TabsTrigger
            value="currency"
            className="data-[state=active]:bg-gradient-to-r from-pink-500 to-violet-500 text-white"
          >
            Донат-валюта
          </TabsTrigger>
          <TabsTrigger
            value="cases"
            className="data-[state=active]:bg-gradient-to-r from-pink-500 to-violet-500 text-white"
          >
            Кейсы
          </TabsTrigger>
          <TabsTrigger
            value="other"
            className="data-[state=active]:bg-gradient-to-r from-pink-500 to-violet-500 text-white"
          >
            Другое
          </TabsTrigger>
        </TabsList>
        <TabsContent value="privileges" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ShopItem key={item.id} item={item} />
            </motion.div>
          ))}
        </TabsContent>
        <TabsContent value="currency" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p className="text-center text-purple-200">Скоро будет доступно</p>
        </TabsContent>
        <TabsContent value="cases" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p className="text-center text-purple-200">Скоро будет доступно</p>
        </TabsContent>
        <TabsContent value="other" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p className="text-center text-purple-200">Скоро будет доступно</p>
        </TabsContent>
      </Tabs>

      <ShoppingCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
