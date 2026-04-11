"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Box, Text, VStack, Textarea } from "@chakra-ui/react"

interface FormData {
  businessName: string
  firstName: string
  lastName: string
  email: string
  city: string
  budget: string
  frequency: string
  description: string
}

const EMPTY: FormData = {
  businessName: "", firstName: "", lastName: "", email: "", city: "", budget: "", frequency: "", description: "",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "white",
  border: "1.5px solid var(--border)",
  borderRadius: "10px",
  fontSize: "14px",
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  color: "var(--dark)",
  padding: "12px 16px",
  outline: "none",
  appearance: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
  paddingRight: "40px",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  color: "var(--dark)",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  marginBottom: "6px",
}

const focusStyle = {
  borderColor: "var(--yellow-border)",
  boxShadow: "0 0 0 3px rgba(239, 195, 116, 0.25)",
}

export default function BusinessFormModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "business", ...form }),
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
              join as a business
            </Text>
            <Text fontFamily="var(--font-dm-sans)" fontSize="sm" color="var(--muted)" lineHeight="1.6">
              Get matched with a local creator who films short-form video for your TikTok and Instagram.
              No contracts, no long-term commitment. Just content you can use right away.
              We&apos;ll reach out when we launch in your area.
            </Text>
          </VStack>

          <Box as="form" onSubmit={handleSubmit}>
            <VStack gap={5} align="stretch">
              {/* Business Name */}
              <Box>
                <label style={labelStyle} htmlFor="businessName">Business Name</label>
                <input
                  id="businessName" name="businessName" placeholder="e.g. Bella Cucina"
                  value={form.businessName} onChange={handleChange} required style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                />
              </Box>

              {/* First + Last Name */}
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
                <Box>
                  <label style={labelStyle} htmlFor="firstName">First Name</label>
                  <input
                    id="firstName" name="firstName" placeholder="Jane"
                    value={form.firstName} onChange={handleChange} required style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                  />
                </Box>
                <Box>
                  <label style={labelStyle} htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName" name="lastName" placeholder="Smith"
                    value={form.lastName} onChange={handleChange} required style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                  />
                </Box>
              </Box>

              {/* Email */}
              <Box>
                <label style={labelStyle} htmlFor="email">Email</label>
                <input
                  id="email" name="email" type="email" placeholder="hello@yourbusiness.com"
                  value={form.email} onChange={handleChange} required style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                />
              </Box>

              {/* City */}
              <Box>
                <label style={labelStyle} htmlFor="city">City</label>
                <input
                  id="city" name="city" placeholder="e.g. Vancouver, Toronto, Montreal"
                  value={form.city} onChange={handleChange} required style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                />
              </Box>

              {/* Budget */}
              <Box>
                <label style={labelStyle} htmlFor="budget">Monthly Content Budget</label>
                <div style={{ position: "relative" }}>
                  <select
                    id="budget" name="budget" value={form.budget} onChange={handleChange}
                    style={selectStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                  >
                    <option value="" disabled>Select a range...</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500–$1,000">$500–$1,000</option>
                    <option value="$1,000–$2,500">$1,000–$2,500</option>
                    <option value="$2,500+">$2,500+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)" }}>▾</div>
                </div>
              </Box>

              {/* Frequency */}
              <Box>
                <label style={labelStyle} htmlFor="frequency">How often do you need content?</label>
                <div style={{ position: "relative" }}>
                  <select
                    id="frequency" name="frequency" value={form.frequency} onChange={handleChange}
                    style={selectStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                  >
                    <option value="" disabled>Select frequency...</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="One-time project">One-time project</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)" }}>▾</div>
                </div>
              </Box>

              {/* Description */}
              <Box>
                <label style={labelStyle} htmlFor="description">What are you looking for?</label>
                <Textarea
                  id="description" name="description"
                  placeholder="Tell us about your business and the kind of content you'd like..."
                  value={form.description} onChange={handleChange}
                  rows={4} bg="white" border="1.5px solid" borderColor="var(--border)"
                  borderRadius="10px" fontSize="sm" fontFamily="var(--font-dm-sans)"
                  color="var(--dark)" px={4} py={3} resize="vertical"
                  _focus={{ borderColor: "var(--yellow-border)", boxShadow: "0 0 0 3px rgba(239, 195, 116, 0.15)", outline: "none" }}
                  _placeholder={{ color: "#B0A898" }}
                />
              </Box>

              {error && <Text fontFamily="var(--font-dm-sans)" fontSize="sm" color="var(--red)">{error}</Text>}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? "#F5D898" : "#efc374",
                  color: "var(--dark)",
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
