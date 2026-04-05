"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Text,
  Container,
  VStack,
  Textarea,
} from "@chakra-ui/react"
import { PiArrowLeftLight } from "react-icons/pi"

interface FormData {
  businessName: string
  email: string
  city: string
  budget: string
  frequency: string
  description: string
}

const EMPTY: FormData = {
  businessName: "",
  email: "",
  city: "",
  budget: "",
  frequency: "",
  description: "",
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

export default function BusinessPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
              join as a business
            </Text>
            <Text
              fontFamily="var(--font-dm-sans)"
              fontSize="sm"
              color="var(--muted)"
              lineHeight="1.6"
            >
              Get matched with a local creator who films short-form video
              for your TikTok and Instagram. No contracts, no long-term
              commitment. Just content you can use right away. We&apos;ll
              reach out when we launch in your area.
            </Text>
          </VStack>

          {/* Form */}
          <Box as="form" onSubmit={handleSubmit}>
            <VStack gap={5} align="stretch">
              {/* Business Name */}
              <Box>
                <label style={labelStyle} htmlFor="businessName">
                  Business Name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  placeholder="e.g. Bella Cucina"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    Object.assign(e.target.style, {
                      borderColor: "var(--yellow-border)",
                      boxShadow: "0 0 0 3px rgba(232, 200, 64, 0.15)",
                    })
                  }
                  onBlur={(e) =>
                    Object.assign(e.target.style, {
                      borderColor: "var(--border)",
                      boxShadow: "none",
                    })
                  }
                />
              </Box>

              {/* Email */}
              <Box>
                <label style={labelStyle} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hello@yourbusiness.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    Object.assign(e.target.style, {
                      borderColor: "var(--yellow-border)",
                      boxShadow: "0 0 0 3px rgba(232, 200, 64, 0.15)",
                    })
                  }
                  onBlur={(e) =>
                    Object.assign(e.target.style, {
                      borderColor: "var(--border)",
                      boxShadow: "none",
                    })
                  }
                />
              </Box>

              {/* City */}
              <Box>
                <label style={labelStyle} htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  placeholder="e.g. Vancouver, Toronto, Montreal"
                  value={form.city}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    Object.assign(e.target.style, {
                      borderColor: "var(--yellow-border)",
                      boxShadow: "0 0 0 3px rgba(232, 200, 64, 0.15)",
                    })
                  }
                  onBlur={(e) =>
                    Object.assign(e.target.style, {
                      borderColor: "var(--border)",
                      boxShadow: "none",
                    })
                  }
                />
              </Box>

              {/* Monthly Budget */}
              <Box>
                <label style={labelStyle} htmlFor="budget">
                  Monthly Content Budget
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    id="budget"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      paddingRight: "40px",
                    }}
                    onFocus={(e) =>
                      Object.assign(e.target.style, {
                        borderColor: "var(--yellow-border)",
                        boxShadow: "0 0 0 3px rgba(232, 200, 64, 0.15)",
                      })
                    }
                    onBlur={(e) =>
                      Object.assign(e.target.style, {
                        borderColor: "var(--border)",
                        boxShadow: "none",
                      })
                    }
                  >
                    <option value="" disabled>
                      Select a range...
                    </option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500–$1,000">$500–$1,000</option>
                    <option value="$1,000–$2,500">$1,000–$2,500</option>
                    <option value="$2,500+">$2,500+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <div
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "var(--muted)",
                    }}
                  >
                    ▾
                  </div>
                </div>
              </Box>

              {/* Frequency */}
              <Box>
                <label style={labelStyle} htmlFor="frequency">
                  How often do you need content?
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    id="frequency"
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      paddingRight: "40px",
                    }}
                    onFocus={(e) =>
                      Object.assign(e.target.style, {
                        borderColor: "var(--yellow-border)",
                        boxShadow: "0 0 0 3px rgba(232, 200, 64, 0.15)",
                      })
                    }
                    onBlur={(e) =>
                      Object.assign(e.target.style, {
                        borderColor: "var(--border)",
                        boxShadow: "none",
                      })
                    }
                  >
                    <option value="" disabled>
                      Select frequency...
                    </option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="One-time project">One-time project</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  <div
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "var(--muted)",
                    }}
                  >
                    ▾
                  </div>
                </div>
              </Box>

              {/* Description */}
              <Box>
                <label style={labelStyle} htmlFor="description">
                  What are you looking for?
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about your business and the kind of content you'd like..."
                  value={form.description}
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
                    borderColor: "var(--yellow-border)",
                    boxShadow: "0 0 0 3px rgba(232, 200, 64, 0.15)",
                    outline: "none",
                  }}
                  _placeholder={{ color: "#B0A898" }}
                />
              </Box>

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
