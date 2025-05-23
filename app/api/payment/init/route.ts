import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  try {
    const { items, totalAmount, nickname, email, paymentMethod, cardNumber } = await req.json()

    // Here you would typically create an order in your database
    const orderId = `ORDER-${Date.now()}`

    let paymentUrl

    if (paymentMethod === 'tinkoff') {
      // Initialize Tinkoff payment
      const tinkoffResponse = await axios.post('https://securepay.tinkoff.ru/v2/Init', {
        TerminalKey: process.env.TINKOFF_TERMINAL_KEY,
        Amount: totalAmount * 100, // Tinkoff expects amount in kopecks
        OrderId: orderId,
        Description: `Donation for ${nickname}`,
        DATA: {
          Email: email,
          Phone: "",
          CardNumber: cardNumber // Добавляем номер карты
        },
        Receipt: {
          Email: email,
          Phone: "",
          Taxation: "usn_income",
          Items: items.map((item: any) => ({
            Name: item.name,
            Price: item.price * 100, // in kopecks
            Quantity: item.quantity,
            Amount: item.price * item.quantity * 100, // in kopecks
            PaymentMethod: "full_prepayment",
            PaymentObject: "service",
            Tax: "none"
          }))
        }
      })

      paymentUrl = tinkoffResponse.data.PaymentURL
    } else if (paymentMethod === 'mts') {
      // Initialize MTS payment
      const mtsResponse = await axios.post('https://pay.mts.ru/api/v2/payments/create', {
        amount: {
          value: totalAmount,
          currency: "RUB"
        },
        order_id: orderId,
        description: `Donation for ${nickname}`,
        customer: {
          email: email
        },
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/fail`,
        card_number: cardNumber // Добавляем номер карты
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.MTS_API_KEY}`
        }
      })

      paymentUrl = mtsResponse.data.payment_url
    }

    return NextResponse.json({ paymentUrl })
  } catch (error) {
    console.error('Payment initialization failed:', error)
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 })
  }
}
