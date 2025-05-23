import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PaymentMethodSelectProps {
  onSelect: (method: string) => void
}

export default function PaymentMethodSelect({ onSelect }: PaymentMethodSelectProps) {
  return (
    <div className="bg-black text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Оплата</h2>
      <p className="text-xl mb-8">Выберите предпочитаемый способ оплаты.</p>
      
      <div className="space-y-4">
        <h3 className="text-xl mb-4">Электронные деньги</h3>
        
        <Button
          onClick={() => onSelect('volet')}
          className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800"
        >
          <div className="flex items-center gap-4">
            <Image src="/volet-logo.svg" alt="Volet" width={32} height={32} />
            <div>
              <div className="text-lg">Volet</div>
              <div className="text-zinc-400">ЭЛЕКТРОННЫЕ ДЕНЬГИ</div>
            </div>
          </div>
        </Button>

        <h3 className="text-xl mt-8 mb-4">Россия</h3>
        
        <Button
          onClick={() => onSelect('sbp')}
          className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800"
        >
          <div className="flex items-center gap-4">
            <Image src="/sbp-logo.svg" alt="СБП" width={32} height={32} />
            <div>
              <div className="text-lg">СБП</div>
              <div className="text-zinc-400">МИНИМУМ 10 ₽</div>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onSelect('mir')}
          className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800"
        >
          <div className="flex items-center gap-4">
            <Image src="/mir-logo.svg" alt="МИР" width={32} height={32} />
            <div>
              <div className="text-lg">МИР, ₽</div>
              <div className="text-zinc-400">РОССИЯ</div>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onSelect('visa')}
          className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800"
        >
          <div className="flex items-center gap-4">
            <Image src="/visa-logo.svg" alt="Visa" width={32} height={32} />
            <div>
              <div className="text-lg">Visa, ₽</div>
              <div className="text-zinc-400">РОССИЯ</div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  )
}
