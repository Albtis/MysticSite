"use client"

import type React from "react"

import { CartProvider } from "@/contexts/CartContext"

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
