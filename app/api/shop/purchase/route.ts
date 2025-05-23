import { NextResponse } from "next/server"
import { shopItems } from "@/lib/shop-items"

export async function POST(req: Request) {
  try {
    const { itemId, userId } = await req.json()
    const item = shopItems.find(i => i.id === itemId)
    
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Here you would typically check the user's balance and update it
    // For now, we'll just simulate a successful purchase
    
    console.log(`User ${userId} purchased item ${item.name} for ${item.price}₽`)

    return NextResponse.json({ 
      success: true, 
      message: `Successfully purchased ${item.name}`,
      item: item
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
