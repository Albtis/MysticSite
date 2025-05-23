import { NextResponse } from 'next/server'
import { grantItemsOnServer } from '@/lib/minecraft-server'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Verify the payment status
    if (data.Status === 'CONFIRMED' || data.status === 'success') {
      const orderId = data.OrderId || data.order_id
      
      // Retrieve order details from your database using orderId
      const order = await getOrderFromDatabase(orderId)

      // Grant items on the Minecraft server
      await grantItemsOnServer(order.nickname, order.items)

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, message: 'Payment not confirmed' })
  } catch (error) {
    console.error('Webhook processing failed:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function getOrderFromDatabase(orderId: string) {
  // Implement this function to retrieve order details from your database
  // This is a placeholder implementation
  return {
    nickname: 'example_player',
    items: [
      { name: 'VIP', quantity: 1 },
      { name: 'Diamonds', quantity: 10 }
    ]
  }
}
