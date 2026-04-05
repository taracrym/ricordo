"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Flex,
  Text,
  Container,
  VStack,
  SimpleGrid,
  Input,
  Textarea,
  Field,
} from "@chakra-ui/react"
import { PiArrowLeftLight } from "react-icons/pi"

const NICHES = [
  "Food & Drink",
  "Fashion",
  "Fitness",
  "Beauty",
  "Travel",
  "Lifestyle",
  "Retail",
  "Real Estate",
  "Health & Wellness",
  "Entertainment",
  "Other",
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
  firstName: "",
  lastName: "",
  email: "",
  instagram: "",
  tiktok: "",
  portfolio: "",
  location: "",
  rate: "",
  availability: "",
  notes: "",
}

const inputStyle = {
  bg: "white",
  border: "1.5px solid",
  borderColor: "var(--border)",
  borderRadius: "10px",
  fontSize: "sm",
  fontFamily: "var(--font-dm-sans)",
  color: "var(--dark)",
  px: 4,
  py: 3,
  h: "auto",
  _focus: {
    borderColor: "var(--blue-border)",
    boxShadow: "0 0 0 3px rgba(126, 200, 218, 0.15)",
    outline: "none",
  },
  _placeholder: { color: "#B0A898" },
}

export default function CreatorPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [selectedNiches, setSelectedNiches] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        body: JSON.stringify({
          type: "creator",
          ...form,
          niches: selectedNiches.join(", "),
        }),
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
    <Box minH="100vh" bg="var(--bg)">
      {/* Navbar */}
      <Box
        as="nav"
        px={{ base: 6, md: 10 }}
        py={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="var(--border)"
      >
        <Text
          fontFamily="var(--font-nunito)"
          fontSize="xl"
          fontWeight="900"
          color="var(--red)"
          letterSpacing="-0.02em"
        >
          ricordo
        </Text>
        <Box
          as="button"
          onClick={() => router.push("/")}
          display="flex"
          alignItems="center"
          gap={2}
          color="var(--muted)"
          fontFamily="var(--font-dm-sans)"
          fontSize="sm"
          cursor="pointer"
          _hover={{ color: "var(--dark)" }}
          transition="color 0.2s"
          bg="transparent"
          border="none"
          p={0}
        >
          <PiArrowLeftLight size={16} />
          Back
        </Box>
      </Box>

      {/* Form */}
      <Container maxW="600px" px={{ base: 6, md: 10 }} py={10}>
        <VStack gap={8} align="stretch">
          {/* Header */}
          <VStack gap={2} align="start">
            <Text
              fontFamily="var(--font-cormorant)"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontStyle="italic"
              fontWeight="400"
              color="var(--dark)"
              lineHeight="1.1"
            >
              join as a creator
            </Text>
            <Text
              fontFamily="var(--font-dm-sans)"
              fontSize="sm"
              color="var(--muted)"
              lineHeight="1.6"
            >
              Get matched with local businesses looking for short-form video
              for their TikTok and Instagram. We&apos;ll reach out when we
              launch in your area.
            </Text>
          </VStack>

          {/* Form fields */}
          <Box as="form" onSubmit={handleSubmit}>
            <VStack gap={5} align="stretch">
              {/* Name row */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <Field.Root required>
                  <Field.Label
                    fontFamily="var(--font-dm-sans)"
                    fontSize="xs"
                    fontWeight="500"
                    color="var(--dark)"
                    mb={1.5}
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                  >
                    First Name
                  </Field.Label>
                  <Input
                    name="firstName"
                    placeholder="Sofia"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    {...inputStyle}
                  />
                </Field.Root>
                <Field.Root required>
                  <Field.Label
                    fontFamily="var(--font-dm-sans)"
                    fontSize="xs"
                    fontWeight="500"
                    color="var(--dark)"
                    mb={1.5}
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                  >
                    Last Name
                  </Field.Label>
                  <Input
                    name="lastName"
                    placeholder="Rossi"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    {...inputStyle}
                  />
                </Field.Root>
              </SimpleGrid>

              {/* Email */}
              <Field.Root required>
                <Field.Label
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  fontWeight="500"
                  color="var(--dark)"
                  mb={1.5}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  Email
                </Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  {...inputStyle}
                />
              </Field.Root>

              {/* Instagram + TikTok */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <Field.Root>
                  <Field.Label
                    fontFamily="var(--font-dm-sans)"
                    fontSize="xs"
                    fontWeight="500"
                    color="var(--dark)"
                    mb={1.5}
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                  >
                    Instagram{" "}
                    <Box as="span" color="var(--muted)" textTransform="none" fontWeight="400" letterSpacing="0">
                      (optional)
                    </Box>
                  </Field.Label>
                  <Input
                    name="instagram"
                    placeholder="@handle"
                    value={form.instagram}
                    onChange={handleChange}
                    {...inputStyle}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    fontFamily="var(--font-dm-sans)"
                    fontSize="xs"
                    fontWeight="500"
                    color="var(--dark)"
                    mb={1.5}
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                  >
                    TikTok{" "}
                    <Box as="span" color="var(--muted)" textTransform="none" fontWeight="400" letterSpacing="0">
                      (optional)
                    </Box>
                  </Field.Label>
                  <Input
                    name="tiktok"
                    placeholder="@handle"
                    value={form.tiktok}
                    onChange={handleChange}
                    {...inputStyle}
                  />
                </Field.Root>
              </SimpleGrid>

              {/* Portfolio */}
              <Field.Root>
                <Field.Label
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  fontWeight="500"
                  color="var(--dark)"
                  mb={1.5}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  Portfolio / Website{" "}
                  <Box as="span" color="var(--muted)" textTransform="none" fontWeight="400" letterSpacing="0">
                    (optional)
                  </Box>
                </Field.Label>
                <Input
                  name="portfolio"
                  placeholder="https://yoursite.com"
                  value={form.portfolio}
                  onChange={handleChange}
                  {...inputStyle}
                />
              </Field.Root>

              {/* Content Niches */}
              <Field.Root>
                <Field.Label
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  fontWeight="500"
                  color="var(--dark)"
                  mb={2}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  Content Niche
                </Field.Label>
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
                          color: selected ? "#2A6E80" : "var(--muted)",
                          fontSize: "14px",
                          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                          fontWeight: 400,
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
                <Field.Label
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  fontWeight="500"
                  color="var(--dark)"
                  mb={1.5}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  City
                </Field.Label>
                <Input
                  name="location"
                  placeholder="e.g. Vancouver, Toronto, Montreal"
                  value={form.location}
                  onChange={handleChange}
                  required
                  {...inputStyle}
                />
              </Field.Root>

              {/* Rate */}
              <Field.Root>
                <Field.Label
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  fontWeight="500"
                  color="var(--dark)"
                  mb={1.5}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  Rate
                </Field.Label>
                <Input
                  name="rate"
                  placeholder="e.g. $75/video or $60/hour"
                  value={form.rate}
                  onChange={handleChange}
                  {...inputStyle}
                />
                <Field.HelperText
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  color="var(--muted)"
                  mt={1.5}
                >
                  Your rate, per video or hourly
                </Field.HelperText>
              </Field.Root>

              {/* Availability */}
              <Field.Root>
                <Field.Label
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  fontWeight="500"
                  color="var(--dark)"
                  mb={1.5}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  Availability
                </Field.Label>
                <Input
                  name="availability"
                  placeholder="e.g. 10 hours/week"
                  value={form.availability}
                  onChange={handleChange}
                  {...inputStyle}
                />
                <Field.HelperText
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  color="var(--muted)"
                  mt={1.5}
                >
                  How many hours per week are you available?
                </Field.HelperText>
              </Field.Root>

              {/* Notes */}
              <Field.Root>
                <Field.Label
                  fontFamily="var(--font-dm-sans)"
                  fontSize="xs"
                  fontWeight="500"
                  color="var(--dark)"
                  mb={1.5}
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                >
                  Notes / Questions
                </Field.Label>
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
                  fontSize="sm"
                  fontFamily="var(--font-dm-sans)"
                  color="var(--dark)"
                  px={4}
                  py={3}
                  resize="vertical"
                  _focus={{
                    borderColor: "var(--blue-border)",
                    boxShadow: "0 0 0 3px rgba(126, 200, 218, 0.15)",
                    outline: "none",
                  }}
                  _placeholder={{ color: "#B0A898" }}
                />
              </Field.Root>

              {/* Error */}
              {error && (
                <Text
                  fontFamily="var(--font-dm-sans)"
                  fontSize="sm"
                  color="var(--red)"
                >
                  {error}
                </Text>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? "#C0A8A0" : "var(--red)",
                  color: "white",
                  borderRadius: "12px",
                  padding: "16px",
                  fontSize: "13px",
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  border: "none",
                  marginTop: "8px",
                  transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {loading ? "Joining..." : "Join the List"}
              </button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
