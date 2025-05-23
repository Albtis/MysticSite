import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { grantPrivileges } from '@/lib/minecraft-server'

export async function POST(req: Request) {
  const body = await req.json()

  // Проверяем подпись
  const token = crypto
    .createHash('sha256')
    .update(Object.values(body).sort().join('') + process.env.TINKOFF_TERMINAL_PASSWORD)
    .digest('hex')

  if (token !== body.Token) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 })
  }

  if (body.Status === 'CONFIRMED') {
    // Платеж подтвержден, выдаем привилегии
    const orderId = body.OrderId
    const order = await getOrderFromDatabase(orderId)
    
    if (order) {
      await grantPrivileges(order.minecraftUsername, order.items)
      // Обновляем статус заказа в базе данных
      await updateOrderStatus(orderId, 'completed')
      return NextResponse.json({ message: 'Privileges granted successfully' })
    } else {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 })
    }
  }

  return NextResponse.json({ message: 'Webhook processed' })
}

async function getOrderFromDatabase(orderId: string) {
  // Здесь должна быть логика получения заказа из вашей базы данных
  // Возвращаем заглушку для примера
  return {
    minecraftUsername: 'example_player',
    items: [{ name: 'VIP', duration: '30d' }]
  }
}

async function updateOrderStatus(orderId: string, status: string) {
  // Здесь должна быть логика обновления статуса заказа в вашей базе данных
  console.log(`Updating order ${orderId} status to ${status}`)
}
