/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"

export default function HackerLoading({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  function generateSimpleAscii(text) {
    const chars = {
      A: ["  █  ", " █ █ ", "█████", "█   █", "█   █"],
      B: ["████ ", "█   █", "████ ", "█   █", "████ "],
      C: [" ████", "█    ", "█    ", "█    ", " ████"],
      D: ["████ ", "█   █", "█   █", "█   █", "████ "],
      E: ["█████", "█    ", "███  ", "█    ", "█████"],
      F: ["█████", "█    ", "███  ", "█    ", "█    "],
      G: [" ████", "█    ", "█ ███", "█   █", " ████"],
      H: ["█   █", "█   █", "█████", "█   █", "█   █"],
      I: ["█████", "  █  ", "  █  ", "  █  ", "█████"],
      J: ["█████", "    █", "    █", "█   █", " ████"],
      K: ["█   █", "█  █ ", "███  ", "█  █ ", "█   █"],
      L: ["█    ", "█    ", "█    ", "█    ", "█████"],
      M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █"],
      N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
      O: [" ███ ", "█   █", "█   █", "█   █", " ███ "],
      P: ["████ ", "█   █", "████ ", "█    ", "█    "],
      Q: [" ███ ", "█   █", "█ █ █", "█  ██", " ████"],
      R: ["████ ", "█   █", "████ ", "█  █ ", "█   █"],
      S: [" ████", "█    ", " ███ ", "    █", "████ "],
      T: ["█████", "  █  ", "  █  ", "  █  ", "  █  "],
      U: ["█   █", "█   █", "█   █", "█   █", " ███ "],
      V: ["█   █", "█   █", "█   █", " █ █ ", "  █  "],
      W: ["█   █", "█   █", "█ █ █", "██ ██", "█   █"],
      X: ["█   █", " █ █ ", "  █  ", " █ █ ", "█   █"],
      Y: ["█   █", " █ █ ", "  █  ", "  █  ", "  █  "],
      Z: ["█████", "   █ ", "  █  ", " █   ", "█████"],
      " ": ["     ", "     ", "     ", "     ", "     "],
    }

    const lines = ["", "", "", "", ""]
    const upperText = text.toUpperCase()

    for (let i = 0; i < upperText.length; i++) {
      const char = upperText[i]
      const pattern = chars[char] || chars[" "]

      for (let row = 0; row < 5; row++) {
        lines[row] += pattern[row] + " "
      }
    }

    return lines.join("\n")
  }

  const messages = [
    "Booting up Portfolio OS...",
    "Compiling projects and research logs...",
    "Syncing distributed systems...",
    "Training models with extra guts...",
    "Deploying full-stack applications...",
    "Loading leadership & hackathon highlights...",
    "Optimizing for performance and resilience...",
    "System ready. Welcome, explorer.",
  ]

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing effect for messages
  useEffect(() => {
    if (currentMessage < messages.length) {
      const message = messages[currentMessage]
      let charIndex = 0

      const typeInterval = setInterval(() => {
        if (charIndex <= message.length) {
          setDisplayText(message.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)

          // Wait then go to next message or finish
          setTimeout(() => {
            if (currentMessage === messages.length - 1) {
              setProgress(100) // Ensure bar finishes
              setTimeout(() => {
                onComplete()
              }, 1000)
            } else {
              setCurrentMessage((prev) => prev + 1)
              setDisplayText("")
            }
          }, 800)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [currentMessage, onComplete])

  // Sync progress with messages
  useEffect(() => {
    setProgress(Math.min((currentMessage / messages.length) * 100, 100))
  }, [currentMessage, messages.length])

  return (
    <div className="h-screen w-screen bg-[#0B0E14] text-[#00E676] font-mono flex flex-col items-center justify-center p-8">
      {/* Matrix-style background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs animate-pulse text-[#E6EDF3]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {Math.random().toString(36).substring(2, 8)}
            </div>
          ))}
        </div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* ASCII Art Header */}
        <div className="flex justify-center mb-8 text-[#00E676] hidden xs:flex">
          <pre
            className="text-[10px] sm:text-xs md:text-sm leading-tight text-center break-words whitespace-pre-wrap px-2"
            style={{
              maxWidth: '100vw',
              wordBreak: 'break-word',
              overflowX: 'auto',
            }}
          >
            {generateSimpleAscii("Srirangam Umesh Chandra")}
          </pre>
        </div>

        {/* Loading message */}
        <div className="mb-8 h-6 text-center">
          <span className="text-[#E6EDF3]">
            {displayText}
            {showCursor && <span className="bg-[#00E676] text-[#0B0E14] px-1">█</span>}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-[#94A3B8] mb-2">
            <span>Loading...</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full bg-[#94A3B8] bg-opacity-20 h-2 rounded">
            <div
              className="bg-[#00E676] h-2 rounded transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* System info */}
        <div className="text-xs text-[#94A3B8] space-y-1">
          <div>System: Portfolio OS v2.1.0</div>
          <div>Architecture: x64</div>
          <div>Security Level: Maximum</div>
          <div>Status: {progress >= 100 ? "READY" : "LOADING..."}</div>
        </div>
      </div>
    </div>
  )
}
