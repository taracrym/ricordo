"use client"
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-cormorant), Georgia, serif" },
        body: { value: "var(--font-dm-sans), system-ui, sans-serif" },
      },
    },
  },
  globalCss: {
    "input:focus, input:focus-visible, select:focus, select:focus-visible, textarea:focus, textarea:focus-visible": {
      outline: "none !important",
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>
}
