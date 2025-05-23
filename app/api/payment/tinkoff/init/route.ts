import { NextResponse } from 'next/server'
import axios from 'axios'
import crypto from 'crypto'

const TINKOFF_API_URL = 'https://securepay.tinkoff.ru/v2/Init'

export async function POST(req: Request) {
  try {
    const { amount, orderId, items, customerEmail, customerPhone, customerName } = await req.json()

    const data = {
      TerminalKey: process.env.TINKOFF_TERMINAL_KEY,
      Amount: Math.round(amount * 100), // Конвертируем в копейки
      OrderId: orderId,
      Description: `Оплата доната на Mystic Time`,
      DATA: {
        Phone: customerPhone,
        Email: customerEmail,
        Name: customerName
      },
      Receipt: {
        Email: customerEmail,
        Phone: customerPhone,
        Taxation: "usn_income",
        Items: items.map((item: any) => ({
          Name: item.name,
          Price: Math.round(item.price * 100),
          Quantity: item.quantity,
          Amount: Math.round(item.price * item.quantity * 100),
          PaymentMethod: "full_prepayment",
          PaymentObject: "service",
          Tax: "none"
        }))
      }
    }

    // Создаем токен для подписи запроса
    const token = crypto
      .createHash('sha256')
      .update(Object.values(data).sort().join('') + process.env.TINKOFF_TERMINAL_PASSWORD)
      .digest('hex')

    data.Token = token

    // Инициализируем платеж в Тинькофф
    const response = await axios.post(TINKOFF_API_URL, data)

    if (response.data.Success) {
      return NextResponse.json({ 
        success: true,
        paymentUrl: response.data.PaymentURL 
      })
    } else {
      throw new Error(response.data.Message || 'Ошибка инициализации платежа')
    }
  } catch (error) {
    console.error('Ошибка инициализации платежа:', error)
    return NextResponse.json(
      { error: 'Ошибка инициализации платежа' },
      { status: 500 }
    )
  }
}
