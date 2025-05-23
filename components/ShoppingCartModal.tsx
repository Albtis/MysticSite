"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/CartContext"
import { initTinkoffPayment } from "@/lib/payment"

interface ShoppingCartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShoppingCartModal({ isOpen, onClose }: ShoppingCartModalProps) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [email, setEmail] = useState("")
  const [promoCode, setPromoCode] = useState("")

  const handlePayment = async () => {
    if (!email) {
      alert("Пожалуйста, введите ваш email")
      return
    }

    const paymentData = {
      amount: getTotalPrice(),
      orderId: `ORDER-${Date.now()}`,
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      customerEmail: email,
      customerPhone: "",
      customerName: "",
    }

    const result = await initTinkoffPayment(paymentData)

    if (result.success) {
      clearCart()
      onClose()
    } else {
      alert("Произошла ошибка при инициализации платежа. Пожалуйста, попробуйте снова.")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white border-purple-500 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                  Корзина
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <p>Корзина пуста</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 bg-purple-800 rounded-lg">
                        <div>
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-purple-200">{item.price} ₽ за шт.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            -
                          </Button>
                          <span className="mx-2 min-w-[20px] text-center">{item.quantity}</span>
                          <Button size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            +
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2"
                          >
                            Удалить
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="text-xl font-bold text-center pt-4 border-t border-purple-600">
                      Итого: {getTotalPrice().toFixed(2)} ₽
                    </div>
                  </>
                )}

                <div className="space-y-4 pt-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-purple-200">
                      Ваш Email:
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Введите ваш email"
                      className="bg-purple-800 text-white placeholder-purple-300 border-purple-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="promoCode" className="block text-sm font-medium mb-1 text-purple-200">
                      Промокод (если есть):
                    </label>
                    <Input
                      id="promoCode"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Введите промокод"
                      className="bg-purple-800 text-white placeholder-purple-300 border-purple-600"
                    />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
                    onClick={handlePayment}
                    disabled={cart.length === 0}
                  >
                    Оплатить
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
