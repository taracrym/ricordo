"use client"
import { useState, useEffect } from "react"
import { Box, Flex, Text, VStack, Grid, GridItem } from "@chakra-ui/react"
import { PiCameraLight, PiStorefrontLight, PiEnvelopeLight, PiInstagramLogoLight } from "react-icons/pi"
import CreatorFormModal from "./components/CreatorFormModal"
import BusinessFormModal from "./components/BusinessFormModal"
import PhoneMockup from "./components/PhoneMockup"


export default function Home() {
  const [modal, setModal] = useState<"choose" | "creator" | "business" | null>(null)

  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-l, .reveal-r")
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Box bg="var(--bg)" position="relative">
        <div className="grain" />

        {/* ── HERO — no photo, pure postcard ── */}
        <Box display="flex" flexDirection="column" position="relative" zIndex={2}>

          {/* Nav */}
          <Box as="nav" px={{ base: 6, md: 12 }} pt={8} pb={0}>
            <Text
              fontFamily="var(--font-nunito)"
              fontSize="xl"
              fontWeight="900"
              color="#efc374"
              letterSpacing="-0.02em"
              userSelect="none"
            >
              ricordo
            </Text>
          </Box>

          {/* Hero content */}
          <Box flex={1} px={{ base: 6, md: 12 }} pt={{ base: 2, md: 4 }} pb={{ base: 2, md: 2 }}>
            <Box maxW="960px" mx="auto">

              {/* Animated wordmark */}
              <Box mb={{ base: 2, md: 3 }} className="reveal">
                <Text
                  fontFamily="var(--font-nunito)"
                  fontSize={{ base: "clamp(26px, 7.5vw, 48px)", md: "clamp(64px, 10vw, 130px)" }}
                  fontWeight="900"
                  color="var(--dark)"
                  letterSpacing="-0.04em"
                  lineHeight="0.9"
                >
                  local
                </Text>
                {/* Pure CSS flip — two faces, no JS */}
                <Box position="relative" whiteSpace="nowrap">
                  {/* Ghost: holds space of longest word */}
                  <Text
                    fontFamily="var(--font-nunito)"
                    fontSize={{ base: "clamp(26px, 7.5vw, 48px)", md: "clamp(64px, 10vw, 130px)" }}
                    fontWeight="900"
                    letterSpacing="-0.04em"
                    lineHeight="0.9"
                    visibility="hidden"
                    userSelect="none"
                    whiteSpace="nowrap"
                  >
                    content creators
                  </Text>
                  <Text
                    className="flip-word-a"
                    fontFamily="var(--font-nunito)"
                    fontSize={{ base: "clamp(26px, 7.5vw, 48px)", md: "clamp(64px, 10vw, 130px)" }}
                    fontWeight="900"
                    color="var(--marine)"
                    letterSpacing="-0.04em"
                    lineHeight="0.9"
                    position="absolute"
                    top={0} left={0}
                    whiteSpace="nowrap"
                  >
                    content creators
                  </Text>
                  <Text
                    className="flip-word-b"
                    fontFamily="var(--font-nunito)"
                    fontSize={{ base: "clamp(26px, 7.5vw, 48px)", md: "clamp(64px, 10vw, 130px)" }}
                    fontWeight="900"
                    color="var(--melon)"
                    letterSpacing="-0.04em"
                    lineHeight="0.9"
                    position="absolute"
                    top={0} left={0}
                    whiteSpace="nowrap"
                  >
                    businesses
                  </Text>
                </Box>
              </Box>

              {/* Two-column: left=text+cards, right=phone */}
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 8, md: 6 }} alignItems="start">

                {/* Left: text + CTA cards */}
                <GridItem>
                  <VStack align="start" gap={5}>
                    <Text
                      className="reveal d1"
                      fontFamily="var(--font-dm-sans)"
                      fontSize={{ base: "sm", md: "md" }}
                      color="var(--dark)"
                      lineHeight="1.75"
                    >
                      Creators get paid doing what they love.
                      Businesses get scroll-stopping video — without the agency price tag.
                    </Text>

                    <Box
                      className="stamp reveal d2"
                      as="button" bg="white" border="none" p={6} cursor="pointer" w="100%"
                      textAlign="left" onClick={() => setModal("creator")}
                      style={{ boxShadow: "0 6px 28px rgba(58,110,138,0.12)", transition: "all 0.2s ease" }}
                      _hover={{ transform: "translateY(-3px)", boxShadow: "0 12px 36px rgba(58,110,138,0.22)" } as never}
                    >
                      <Flex align="center" gap={4}>
                        <Box w="42px" h="42px" borderRadius="50%" bg="var(--bg)" display="flex" alignItems="center" justifyContent="center" flexShrink={0} color="var(--marine)">
                          <PiCameraLight size={22} />
                        </Box>
                        <VStack align="start" gap={0}>
                          <Text fontFamily="var(--font-nunito)" fontSize="md" fontWeight="900" color="var(--dark)" letterSpacing="-0.01em">I&apos;m a Creator</Text>
                          <Text fontFamily="var(--font-dm-sans)" fontSize="xs" color="var(--dark)">Get paid to film local businesses</Text>
                        </VStack>
                      </Flex>
                    </Box>

                    <Box
                      className="stamp reveal d3"
                      as="button" bg="white" border="none" p={6} cursor="pointer" w="100%"
                      textAlign="left" onClick={() => setModal("business")}
                      style={{ boxShadow: "0 6px 28px rgba(58,110,138,0.12)", transition: "all 0.2s ease" }}
                      _hover={{ transform: "translateY(-3px)", boxShadow: "0 12px 36px rgba(58,110,138,0.22)" } as never}
                    >
                      <Flex align="center" gap={4}>
                        <Box w="42px" h="42px" borderRadius="50%" bg="var(--bg)" display="flex" alignItems="center" justifyContent="center" flexShrink={0} color="var(--melon)">
                          <PiStorefrontLight size={22} />
                        </Box>
                        <VStack align="start" gap={0}>
                          <Text fontFamily="var(--font-nunito)" fontSize="md" fontWeight="900" color="var(--dark)" letterSpacing="-0.01em">I&apos;m a Business</Text>
                          <Text fontFamily="var(--font-dm-sans)" fontSize="xs" color="var(--dark)">Find a local creator who gets your brand</Text>
                        </VStack>
                      </Flex>
                    </Box>
                  </VStack>
                </GridItem>

                {/* Right: phone — desktop only */}
                <GridItem display={{ base: "none", md: "block" }} mt="60px">
                  <Box className="reveal d2">
                    <PhoneMockup />
                  </Box>
                </GridItem>
              </Grid>

              {/* Phone — mobile only, after cards */}
              <Box display={{ base: "block", md: "none" }} className="reveal" mt={8}>
                <PhoneMockup />
              </Box>

            </Box>

          </Box>
        </Box>

        {/* ── WHAT WE DO + STEPS ── */}
        <Box
          px={{ base: 6, md: 12 }} pt={{ base: 10, md: 14 }} pb={{ base: 10, md: 14 }}
          position="relative" zIndex={2}
          bg="var(--bg)"
        >
          <Box maxW="960px" mx="auto">
            <Text
              className="reveal"
              fontFamily="var(--font-nunito)"
              fontSize={{ base: "3.125rem", md: "7.75rem" }}
              fontWeight="900"
              color="var(--dark)"
              letterSpacing="-0.04em"
              lineHeight="0.88"
              mb={{ base: 2, md: 2 }}
            >
              what<br />we do
            </Text>
            <VStack gap={{ base: 0, md: 0 }} align="stretch">
              {[
                { num: "01", title: "The match is made", body: null, color: "#efc374" },
                { num: "02", title: "Content comes to life", body: null, color: "#efc374" },
                { num: "03", title: "Everyone wins", body: null, color: "#efc374" },
              ].map((step, idx) => (
                <Box
                  key={step.num}
                  className={`reveal d${idx + 1}`}
                  borderTop="1px solid var(--border)"
                  py={{ base: 8, md: 10 }}
                >
                  <Grid templateColumns={{ base: "1fr", md: "80px 1fr 1fr" }} gap={{ base: 4, md: 8 }} alignItems="start">
                    <Text
                      fontFamily="var(--font-nunito)"
                      fontSize={{ base: "3xl", md: "4xl" }}
                      fontWeight="900"
                      color={step.color}
                      lineHeight="1"
                    >
                      {step.num}
                    </Text>
                    {step.num === "03" ? (
                      <Text fontFamily="var(--font-nunito)" fontSize={{ base: "lg", md: "xl" }} fontWeight="900" color="var(--dark)" letterSpacing="-0.01em" lineHeight="1.2">{step.title}</Text>
                    ) : (
                      <Text fontFamily="var(--font-nunito)" fontSize={{ base: "lg", md: "xl" }} fontWeight="900" color="var(--dark)" letterSpacing="-0.01em" lineHeight="1.2">{step.title}</Text>
                    )}
                    {step.body ? (
                      <Text fontFamily="var(--font-dm-sans)" fontSize={{ base: "sm", md: "md" }} color="var(--dark)" lineHeight="1.75">{step.body}</Text>
                    ) : step.num === "01" ? (
                      <Text fontFamily="var(--font-dm-sans)" fontSize={{ base: "sm", md: "md" }} color="var(--dark)" lineHeight="1.75">
                        We pair a creator who fits your niche with a business worth filming. Both sides see each other&apos;s profile before anything starts.
                      </Text>
                    ) : step.num === "02" ? (
                      <Text fontFamily="var(--font-dm-sans)" fontSize={{ base: "sm", md: "md" }} color="var(--dark)" lineHeight="1.75">
                        The creator films on-location with a shot list built for Reels + TikTok. The business stays as hands-on or hands-off as they want.
                      </Text>
                    ) : step.num === "03" ? (
                      <Text fontFamily="var(--font-dm-sans)" fontSize={{ base: "sm", md: "md" }} color="var(--dark)" lineHeight="1.75">
                        Creators get paid. Businesses get edited videos, captions, and raw clips — ready to post within 48 hours.
                      </Text>
                    ) : null}
                  </Grid>
                </Box>
              ))}
              <Box borderTop="1px solid var(--border)" />
            </VStack>
          </Box>
        </Box>

        {/* ── DELIVERABLE STATEMENT ── */}
        <Box
          bg="#efc374" px={{ base: 6, md: 12 }} py={{ base: 10, md: 14 }}
          position="relative" zIndex={2}
        >
          <Box maxW="960px" mx="auto">
            <Text
              className="reveal"
              fontFamily="var(--font-nunito)"
              fontWeight="900"
              fontSize={{ base: "2xl", md: "4rem" }}
              color="var(--dark)"
              letterSpacing="-0.03em"
              lineHeight="1.1"
            >
              Edited videos, captions, and raw clips.{" "}
              <Box as="span" color="white">Delivered within 48 hours.</Box>
            </Text>
          </Box>
        </Box>

        {/* ── LOW RISK ── */}
        <Box
          px={{ base: 6, md: 12 }} py={{ base: 16, md: 24 }}
          position="relative" zIndex={2}
          bg="var(--bg)"
        >
          <Box maxW="960px" mx="auto">
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 12, md: 20 }} alignItems="start">
              <Box>
                <Text
                  className="reveal-l"
                  fontFamily="var(--font-nunito)"
                  fontSize={{ base: "3.125rem", md: "5rem" }}
                  fontWeight="900"
                  color="var(--dark)"
                  letterSpacing="-0.03em"
                  lineHeight="0.92"
                  mb={3}
                >
                  low risk,{" "}
                  <Box as="span" color="var(--dark)">low commitment</Box>
                </Text>
                <Text
                  className="reveal d1"
                  fontFamily="var(--font-cormorant)"
                  fontStyle="italic"
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="var(--dark)"
                  lineHeight="1.5"
                >
                  No contracts. No subscriptions.<br />No obligation to continue.
                </Text>
              </Box>

              <VStack align="stretch" gap={4}>
                <Box
                  className="stamp reveal d1"
                  bg="white"
                  px={5} py={5}
                  style={{ boxShadow: "0 4px 20px rgba(58,110,138,0.10)" }}
                >
                  <VStack align="start" gap={1}>
                    <Text fontFamily="var(--font-nunito)" fontWeight="900" fontSize={{ base: "md", md: "lg" }} color="var(--dark)" letterSpacing="-0.01em">
                      Not an agency.
                    </Text>
                    <Text fontFamily="var(--font-dm-sans)" fontSize={{ base: "sm", md: "md" }} color="var(--dark)" lineHeight="1.75">
                      A curated network of local creators who know your city and film your story. Book one shoot, get content that&apos;s ready to post.
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </Grid>
          </Box>
        </Box>

        {/* ── STAT ── */}
        <Box
          px={{ base: 6, md: 12 }} py={{ base: 16, md: 24 }}
          position="relative" zIndex={2}
          bg="var(--bg)"
          textAlign="center"
        >
          <Box maxW="600px" mx="auto">
            <Text
              className="reveal"
              fontFamily="var(--font-nunito)"
              fontWeight="900"
              fontSize={{ base: "7.75rem", md: "10rem" }}
              color="var(--dark)"
              letterSpacing="-0.04em"
              lineHeight="0.85"
              mb={5}
            >
              58%
            </Text>
            <Text
              className="reveal d1"
              fontFamily="var(--font-cormorant)"
              fontStyle="italic"
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="600"
              color="var(--dark)"
              letterSpacing="-0.01em"
              lineHeight="1.4"
              mb={3}
            >
              of consumers discover new businesses on social media.
            </Text>
            <Text fontFamily="var(--font-dm-sans)" fontSize="xs" color="var(--dark)" letterSpacing="0.08em" textTransform="uppercase">— Sprinklr</Text>
          </Box>
        </Box>

        {/* ── FINAL CTA ── */}
        <Box
          px={{ base: 6, md: 12 }} py={{ base: 20, md: 32 }}
          position="relative" zIndex={2}
          bg="#efc374"
        >
          <Box maxW="960px" mx="auto">
            <Text
              className="reveal"
              fontFamily="var(--font-nunito)"
              fontSize={{ base: "2.5rem", md: "6.25rem" }}
              fontWeight="900"
              color="var(--dark)"
              letterSpacing="-0.04em"
              lineHeight="0.9"
              mb={5}
            >
              ready to be part of something local?
            </Text>
            <Text
              className="reveal d1"
              fontFamily="var(--font-dm-sans)"
              fontSize={{ base: "sm", md: "md" }}
              color="var(--dark)"
              lineHeight="1.6"
              mb={10}
              maxW="520px"
            >
              Whether you&apos;re a creator looking for your next gig or a business ready for content that actually works — you&apos;re in the right place.
            </Text>
            <Flex gap={4} flexWrap="wrap" className="reveal d2">
              <button
                onClick={() => setModal("creator")}
                style={{
                  background: "white", color: "var(--dark)",
                  padding: "15px 36px", fontSize: "12px",
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", cursor: "pointer", border: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#FAF8F2")}
                onMouseLeave={e => (e.currentTarget.style.background = "white")}
              >
                I&apos;m a Creator
              </button>
              <button
                onClick={() => setModal("business")}
                style={{
                  background: "#111111", color: "white",
                  padding: "15px 36px", fontSize: "12px",
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", cursor: "pointer",
                  border: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#333333" }}
                onMouseLeave={e => { e.currentTarget.style.background = "#111111" }}
              >
                I&apos;m a Business
              </button>
            </Flex>
          </Box>
        </Box>

        {/* ── FOOTER ── */}
        <Box position="relative" zIndex={2} bg="#111111">
          <Box py={6} px={{ base: 6, md: 12 }}>
            <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
              <Text fontFamily="var(--font-nunito)" fontSize="md" fontWeight="900" color="#efc374" letterSpacing="-0.02em">ricordo</Text>
              <Flex gap={3} align="center">
                <a href="mailto:tara@ricordosocial.com" aria-label="Email" style={{ color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.16)" }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)" }}>
                  <PiEnvelopeLight size={22} />
                </a>
                <a href="https://instagram.com/ricordosocial" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.16)" }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)" }}>
                  <PiInstagramLogoLight size={22} />
                </a>
              </Flex>
            </Flex>
          </Box>
        </Box>

      </Box>

      {modal === "choose" && (
        <Box position="fixed" inset={0} zIndex={100}>
          <Box position="fixed" inset={0} bg="rgba(0,0,0,0.7)" onClick={() => setModal(null)} />
          <Box
            position="relative" zIndex={1}
            maxW="480px" mt={{ base: "20vh", md: "25vh" }}
            bg="var(--bg)" borderRadius="20px" px={{ base: 6, md: 10 }} py={10}
            mx={{ base: 4, md: "auto" }}
          >
            <Box
              as="button" position="absolute" top={5} right={5}
              onClick={() => setModal(null)} bg="transparent" border="none"
              cursor="pointer" color="var(--dark)" fontSize="22px" lineHeight={1}
            >✕</Box>
            <Text fontFamily="var(--font-nunito)" fontSize="2xl" fontWeight="900" color="var(--dark)" letterSpacing="-0.02em" mb={2}>
              join the network
            </Text>
            <Text fontFamily="var(--font-dm-sans)" fontSize="sm" color="var(--dark)" mb={8} lineHeight="1.6">
              Are you a creator or a business?
            </Text>
            <VStack gap={4} align="stretch">
              <Box
                as="button" className="stamp" bg="white" border="none" p={5}
                cursor="pointer" textAlign="left" onClick={() => setModal("creator")}
                style={{ boxShadow: "0 4px 20px rgba(58,110,138,0.12)", transition: "all 0.18s ease" }}
                _hover={{ transform: "translateY(-2px)", boxShadow: "0 8px 28px rgba(58,110,138,0.22)" } as never}
              >
                <Flex align="center" gap={4}>
                  <Box w="40px" h="40px" borderRadius="50%" bg="var(--yellow-card)" display="flex" alignItems="center" justifyContent="center" flexShrink={0} color="var(--marine)">
                    <PiCameraLight size={20} />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Text fontFamily="var(--font-nunito)" fontSize="md" fontWeight="900" color="var(--dark)">I&apos;m a Creator</Text>
                    <Text fontFamily="var(--font-dm-sans)" fontSize="xs" color="var(--dark)">Get paid to film local businesses</Text>
                  </VStack>
                </Flex>
              </Box>
              <Box
                as="button" className="stamp" bg="white" border="none" p={5}
                cursor="pointer" textAlign="left" onClick={() => setModal("business")}
                style={{ boxShadow: "0 4px 20px rgba(58,110,138,0.12)", transition: "all 0.18s ease" }}
                _hover={{ transform: "translateY(-2px)", boxShadow: "0 8px 28px rgba(58,110,138,0.22)" } as never}
              >
                <Flex align="center" gap={4}>
                  <Box w="40px" h="40px" borderRadius="50%" bg="var(--yellow-card)" display="flex" alignItems="center" justifyContent="center" flexShrink={0} color="var(--melon)">
                    <PiStorefrontLight size={20} />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Text fontFamily="var(--font-nunito)" fontSize="md" fontWeight="900" color="var(--dark)">I&apos;m a Business</Text>
                    <Text fontFamily="var(--font-dm-sans)" fontSize="xs" color="var(--dark)">Authentic local content, on demand</Text>
                  </VStack>
                </Flex>
              </Box>
            </VStack>
          </Box>
        </Box>
      )}
      {modal === "creator" && <CreatorFormModal onClose={() => setModal(null)} />}
      {modal === "business" && <BusinessFormModal onClose={() => setModal(null)} />}
    </>
  )
}
