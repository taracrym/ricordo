"use client"
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-cormorant), Georgia, serif" },
        body: { value: "var(--font-dm-sans), system-ui, sans-serif" },
      },
      // Exponential scale — Major Third (×1.25), 14px minimum
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>
}
