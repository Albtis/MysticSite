import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface CheckoutFormProps {
  totalAmount: number
  onSubmit: (data: CheckoutFormData) => void
}

export interface CheckoutFormData {
  email: string
  promoCode: string
  acceptTerms: boolean
}

export default function CheckoutForm({ totalAmount, onSubmit }: CheckoutFormProps) {
  const [email, setEmail] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, promoCode, acceptTerms })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black text-white p-6 rounded-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm mb-2">Ваш Email:</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900 border-zinc-700"
            required
          />
        </div>

        <div>
          <label htmlFor="promoCode" className="block text-sm mb-2">Промокод (если есть):</label>
          <Input
            id="promoCode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="bg-zinc-900 border-zinc-700"
            placeholder="XXXXX"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <label htmlFor="terms" className="text-sm">
            Я принимаю условия{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              пользовательского соглашения
            </a>{" "}
            и{" "}
            <a href="/services" className="text-blue-500 hover:underline">
              оказания услуг
            </a>
          </label>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <div className="flex justify-between mb-4">
            <span>Стоимость товаров:</span>
            <span className="font-bold">{totalAmount.toFixed(2)} ₽</span>
          </div>

          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3"
            disabled={!acceptTerms}
          >
            Оплатить
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
