"use client"
import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function ThankYouPage() {
  const router = useRouter()

  return (
    <Box minH="100vh" bg="var(--bg)" display="flex" flexDirection="column" position="relative">
      <div className="grain" />

      {/* Navbar */}
      <Box
        as="nav"
        px={{ base: 6, md: 12 }}
        py={6}
        position="relative"
        zIndex={2}
      >
        <Text
          fontFamily="var(--font-nunito)"
          fontSize="2xl"
          fontWeight="900"
          color="#efc374"
          letterSpacing="-0.02em"
          cursor="pointer"
          onClick={() => router.push("/")}
          userSelect="none"
        >
          ricordo
        </Text>
      </Box>

      {/* Main content */}
      <Flex flex={1} align="center" justify="center" px={6} position="relative" zIndex={2}>
        <VStack gap={4} textAlign="center" maxW="480px">
          <Text
            fontFamily="var(--font-cormorant)"
            fontSize={{ base: "xl", md: "2xl" }}
            fontStyle="italic"
            fontWeight="400"
            color="var(--muted)"
            letterSpacing="0.02em"
          >
            you&apos;re part of something local
          </Text>
          <Text
            fontFamily="var(--font-nunito)"
            fontSize={{ base: "4xl", md: "7xl" }}
            fontWeight="900"
            color="var(--dark)"
            letterSpacing="-0.03em"
            lineHeight="0.9"
          >
            we&apos;ll be in touch
          </Text>
          <Text
            fontFamily="var(--font-dm-sans)"
            fontSize="sm"
            color="var(--muted)"
            lineHeight="1.7"
            mt={4}
            maxW="340px"
          >
            stay tuned
          </Text>
          <Text
            fontFamily="var(--font-dm-sans)"
            fontSize="xs"
            color="#C8B89A"
            mt={6}
            cursor="pointer"
            onClick={() => router.push("/")}
            _hover={{ color: "var(--muted)" }}
            transition="color 0.2s"
            letterSpacing="0.04em"
          >
            ← back to ricordo
          </Text>
        </VStack>
      </Flex>

    </Box>
  )
}
