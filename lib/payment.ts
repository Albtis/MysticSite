import axios from 'axios'

interface PaymentData {
  amount: number
  orderId: string
  items: Array<{
    name: string
    price: number
    quantity: number
  }>
  customerEmail: string
  customerPhone: string
  customerName: string
}

export async function initTinkoffPayment(data: PaymentData) {
  try {
    const response = await axios.post('/api/payment/tinkoff/init', data)
    
    if (response.data.paymentUrl) {
      window.location.href = response.data.paymentUrl
    } else {
      throw new Error('Не удалось получить URL для оплаты')
    }

    return { success: true }
  } catch (error) {
    console.error('Ошибка инициализации платежа:', error)
    return { success: false, error: 'Не удалось инициализировать платеж' }
  }
}
