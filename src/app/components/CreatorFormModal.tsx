"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Box, Flex, Text, VStack, SimpleGrid, Input, Textarea, Field,
} from "@chakra-ui/react"

const NICHES = [
  "Food & Drink", "Fashion", "Fitness", "Beauty", "Travel",
  "Lifestyle", "Retail", "Real Estate", "Health & Wellness", "Entertainment", "Other",
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  instagram: string
  tiktok: string
  portfolio: string
  location: string
  rate: string
  availability: string
  notes: string
}

const EMPTY: FormData = {
  firstName: "", lastName: "", email: "", instagram: "", tiktok: "",
  portfolio: "", location: "", rate: "", availability: "", notes: "",
}

const inputStyle = {
  bg: "white",
  border: "1.5px solid",
  borderColor: "var(--border)",
  borderRadius: "10px",
  fontSize: "md",
  fontFamily: "var(--font-dm-sans)",
  color: "var(--dark)",
  px: 4,
  py: 3,
  h: "auto",
  _focus: {
    borderColor: "var(--blue-border)",
    boxShadow: "0 0 0 3px rgba(104, 152, 176, 0.25)",
    outline: "none",
  },
  _placeholder: { color: "#B0A898" },
}

const labelStyle = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: "xs",
  fontWeight: "500",
  color: "var(--dark)",
  mb: 1.5,
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
}

export default function CreatorFormModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [selectedNiches, setSelectedNiches] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const toggleNiche = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "creator", ...form, niches: selectedNiches.join(", ") }),
      })
      if (!res.ok) throw new Error("Failed to submit")
      router.push("/thank-you")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box position="fixed" inset={0} zIndex={100} overflowY="auto">
      {/* Backdrop */}
      <Box
        position="fixed"
        inset={0}
        bg="rgba(0,0,0,0.75)"
        onClick={onClose}
      />

      {/* Modal card */}
      <Box
        position="relative"
        zIndex={1}
        mx="auto"
        maxW="600px"
        my={{ base: 0, md: 10 }}
        minH={{ base: "100vh", md: "auto" }}
        bg="var(--bg)"
        borderRadius={{ base: "0", md: "20px" }}
        px={{ base: 6, md: 10 }}
        py={10}
      >
        {/* Close button */}
        <Box
          as="button"
          position="absolute"
          top={5}
          right={5}
          onClick={onClose}
          color="var(--muted)"
          fontSize="22px"
          lineHeight={1}
          bg="transparent"
          border="none"
          cursor="pointer"
          _hover={{ color: "var(--dark)" }}
          transition="color 0.2s"
          aria-label="Close"
        >
          ✕
        </Box>

        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack gap={2} align="start">
            <Text
              fontFamily="var(--font-nunito)"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="900"
              color="var(--dark)"
              letterSpacing="-0.02em"
              lineHeight="1.1"
            >
              join as a creator
            </Text>
            <Text fontFamily="var(--font-dm-sans)" fontSize="sm" color="var(--muted)" lineHeight="1.6">
              Get matched with local businesses looking for short-form video
              for their TikTok and Instagram. We&apos;ll reach out when we launch in your area.
            </Text>
          </VStack>

          <Box as="form" onSubmit={handleSubmit}>
            <VStack gap={5} align="stretch">
              {/* Name */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <Field.Root required>
                  <Field.Label {...labelStyle}>First Name</Field.Label>
                  <Input name="firstName" placeholder="Sofia" value={form.firstName} onChange={handleChange} required {...inputStyle} />
                </Field.Root>
                <Field.Root required>
                  <Field.Label {...labelStyle}>Last Name</Field.Label>
                  <Input name="lastName" placeholder="Rossi" value={form.lastName} onChange={handleChange} required {...inputStyle} />
                </Field.Root>
              </SimpleGrid>

              {/* Email */}
              <Field.Root required>
                <Field.Label {...labelStyle}>Email</Field.Label>
                <Input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required {...inputStyle} />
              </Field.Root>

              {/* Instagram + TikTok */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <Field.Root>
                  <Field.Label {...labelStyle}>
                    Instagram{" "}
                    <Box as="span" color="var(--muted)" textTransform="none" fontWeight="400" letterSpacing="0">(optional)</Box>
                  </Field.Label>
                  <Input name="instagram" placeholder="@handle" value={form.instagram} onChange={handleChange} {...inputStyle} />
                </Field.Root>
                <Field.Root>
                  <Field.Label {...labelStyle}>
                    TikTok{" "}
                    <Box as="span" color="var(--muted)" textTransform="none" fontWeight="400" letterSpacing="0">(optional)</Box>
                  </Field.Label>
                  <Input name="tiktok" placeholder="@handle" value={form.tiktok} onChange={handleChange} {...inputStyle} />
                </Field.Root>
              </SimpleGrid>

              {/* Portfolio */}
              <Field.Root>
                <Field.Label {...labelStyle}>
                  Portfolio / Website{" "}
                  <Box as="span" color="var(--muted)" textTransform="none" fontWeight="400" letterSpacing="0">(optional)</Box>
                </Field.Label>
                <Input name="portfolio" placeholder="https://yoursite.com" value={form.portfolio} onChange={handleChange} {...inputStyle} />
              </Field.Root>

              {/* Niches */}
              <Field.Root>
                <Field.Label {...labelStyle}>Content Niche</Field.Label>
                <Flex wrap="wrap" gap={2}>
                  {NICHES.map((niche) => {
                    const selected = selectedNiches.includes(niche)
                    return (
                      <button
                        key={niche}
                        type="button"
                        onClick={() => toggleNiche(niche)}
                        style={{
                          padding: "6px 16px",
                          borderRadius: "9999px",
                          border: `1.5px solid ${selected ? "var(--blue-border)" : "var(--border)"}`,
                          background: selected ? "var(--blue-card)" : "white",
                          color: selected ? "#3A6E8A" : "var(--muted)",
                          fontSize: "14px",
                          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {niche}
                      </button>
                    )
                  })}
                </Flex>
              </Field.Root>

              {/* Location */}
              <Field.Root required>
                <Field.Label {...labelStyle}>City</Field.Label>
                <Input name="location" placeholder="e.g. Vancouver, Toronto, Montreal" value={form.location} onChange={handleChange} required {...inputStyle} />
              </Field.Root>

              {/* Rate */}
              <Field.Root>
                <Field.Label {...labelStyle}>Rate</Field.Label>
                <Input name="rate" placeholder="e.g. $75/video or $60/hour" value={form.rate} onChange={handleChange} {...inputStyle} />
                <Field.HelperText fontFamily="var(--font-dm-sans)" fontSize="xs" color="var(--muted)" mt={1.5}>
                  Your rate, per video or hourly
                </Field.HelperText>
              </Field.Root>

              {/* Availability */}
              <Field.Root>
                <Field.Label {...labelStyle}>Availability</Field.Label>
                <Input name="availability" placeholder="e.g. 10 hours/week" value={form.availability} onChange={handleChange} {...inputStyle} />
                <Field.HelperText fontFamily="var(--font-dm-sans)" fontSize="xs" color="var(--muted)" mt={1.5}>
                  How many hours per week are you available?
                </Field.HelperText>
              </Field.Root>

              {/* Notes */}
              <Field.Root>
                <Field.Label {...labelStyle}>Notes / Questions</Field.Label>
                <Textarea
                  name="notes"
                  placeholder="Anything else you'd like us to know..."
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  bg="white"
                  border="1.5px solid"
                  borderColor="var(--border)"
                  borderRadius="10px"
                  fontSize="md"
                  fontFamily="var(--font-dm-sans)"
                  color="var(--dark)"
                  px={4}
                  py={3}
                  resize="vertical"
                  _focus={{ borderColor: "var(--blue-border)", boxShadow: "0 0 0 3px rgba(126, 200, 218, 0.15)", outline: "none" }}
                  _placeholder={{ color: "#B0A898" }}
                />
              </Field.Root>

              {error && <Text fontFamily="var(--font-dm-sans)" fontSize="sm" color="var(--red)">{error}</Text>}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? "#7AAFC5" : "#3A6E8A",
                  color: "white",
                  borderRadius: "12px",
                  padding: "16px",
                  fontSize: "13px",
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  border: "none",
                  marginTop: "8px",
                  transition: "opacity 0.2s ease",
                }}
              >
                {loading ? "Joining..." : "Join the Network"}
              </button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
