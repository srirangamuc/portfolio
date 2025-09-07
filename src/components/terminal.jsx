"use client"

import React from "react"
import Typewriter from "./typewriter"
import { cn } from "../lib/utils"

const PROMPT_USER = "guest"
const PROMPT_HOST = "portfolio"
const PROMPT_PATH = "~"

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

function Cmd({ children }) {
  return <code className="cmd">{children}</code>
}

function Link({ href, children }) {
  const external = href.startsWith("http")
  return (
    <a
      className="t-link"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      {children}
    </a>
  )
}

function AsciiArt({ art, className = "" }) {
  return <pre className={`font-mono text-xs leading-tight whitespace-pre primary ${className}`}>{art}</pre>
}

export default function Terminal() {
  const [history, setHistory] = React.useState([])
  const [input, setInput] = React.useState("")
  const [commandHistory, setCommandHistory] = React.useState([])
  const [historyIndex, setHistoryIndex] = React.useState(null)
  const [bannerDone, setBannerDone] = React.useState(false)
  const [profileAscii] = React.useState(() => generateSimpleAscii("SRIRANGAM UMESH CHANDRA"))
  const containerRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const [focused, setFocused] = React.useState(false)

  const prompt = `${PROMPT_USER}@${PROMPT_HOST}:${PROMPT_PATH}$`

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  React.useEffect(() => {
    const el = containerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history, bannerDone])

    const commands = React.useMemo(() => {
    return {
      help: {
        describe: "List available commands",
        handle: () => [
          <div key="h-0">Available commands:</div>,
          <ul key="h-ul" className="list-none pl-0 muted">
            <li><Cmd>about</Cmd> — Learn about me</li>
            <li><Cmd>experience</Cmd> — Internships & research</li>
            <li><Cmd>projects</Cmd> — See selected work</li>
            <li><Cmd>skills</Cmd> — Technical stack</li>
            <li><Cmd>education</Cmd> — Academic details</li>
            <li><Cmd>leadership</Cmd> — Leadership & volunteering</li>
            <li><Cmd>contact</Cmd> — Email and social links</li>
            <li><Cmd>banner</Cmd> — Show ASCII banner</li>
            <li><Cmd>clear</Cmd> — Clear the screen</li>
          </ul>,
          <div key="h-1" className="muted">
            Tip: Use ArrowUp/ArrowDown to navigate history. Press Ctrl+C to cancel a command.
          </div>,
        ],
      },

      about: {
        describe: "About me",
        handle: () => [
          <div key="a-art" className="mb-4">
            <AsciiArt art={profileAscii} />
          </div>,
          <div key="a-0" className="primary">
            Hi, I'm Srirangam Umesh Chandra — Computer Science undergrad passionate about AI Engineering and Scalable Systems.
          </div>,
          <div key="a-1">
            I enjoy building full-stack applications, developing ML solutions, and working with distributed systems.
          </div>,
          <div key="a-2" className="muted">
            Strong foundation in DSA, ML, and software engineering. Skilled in Python, Java, JavaScript, React, Django, FastAPI, and PyTorch.
          </div>,
        ],
      },

      experience: {
        describe: "My internships and research roles",
        handle: () => [
          <div key="exp-0">Experience:</div>,
          <ul key="exp-ul" className="list-disc pl-5">
            <li><strong>LifeCykul (May 2025 – Present)</strong> — SDE Intern. Built Campus.Life backend, forms system, URL shortener, Django ORM migration.</li>
            <li><strong>Silo Fortune (Aug 2025 – Present)</strong> — AI Engineering Intern. Developed Agentic Voice Orchestrator with MCP for cattle health/trading platform.</li>
            <li><strong>IIIT Sricity (Jul 2024 – Present)</strong> — Undergraduate Researcher. Built domain-adapted Visual Question Answering system for pathology, experimented with federated learning.</li>
            <li><strong>Stealth Startup (Nov 2024 – Feb 2025)</strong> — Generative AI Developer. Engineered RAG pipeline with fine-tuned T5 for purchase order summarization.</li>
            <li><strong>Omdena Paris Chapter (Jul 2024 – Sep 2024)</strong> — Junior ML Intern. Web scraping + Streamlit dashboard for housing affordability analysis in France.</li>
          </ul>
        ],
      },

      projects: {
        describe: "List selected projects",
        handle: () => [
          <div key="p-0">Selected projects:</div>,
          <ul key="p-ul" className="list-disc pl-5">
            <li>
              <strong>SBucket</strong> — Self-hosted S3-compatible object store in Go, with MinIO + Postgres + JWT Auth.{" "}
              <Link href="https://github.com/code-cults/sbucket">Repo</Link>
            </li>
            <li>
              <strong>Agromart</strong> — MERN e-commerce platform with Redis caching + analytics.{" "}
              <Link href="https://agromart-mern-frontend.onrender.com">Live</Link>
            </li>
            <li>
              <strong>TaskflowAI</strong> — Productivity dashboard with FastAPI + PostgreSQL + AI agents.{" "}
              <Link href="https://github.com/srirangamuc/taskflowai">Repo</Link>
            </li>
          </ul>
        ],
      },

      skills: {
        describe: "Technical Skills",
        handle: () => [
          <div key="s-0">Programming: Python, Java, JavaScript, MySQL, PHP, Golang (learning)</div>,
          <div key="s-1">ML/AI: PyTorch, HuggingFace, LangChain, Scikit-learn, Pandas, NumPy</div>,
          <div key="s-2">Web/Backend: React, Next.js, FastAPI, Django, Express</div>,
          <div key="s-3">Databases & Tools: PostgreSQL, Redis, MinIO, Docker, Jenkins, Git</div>,
        ],
      },

      education: {
        describe: "Education",
        handle: () => [
          <div key="e-0">B.Tech (Hons.) — Computer Science, IIIT Sri City (2022–2026)</div>,
          <div key="e-1">CGPA: 8.77/10</div>,
        ],
      },

      leadership: {
        describe: "Leadership & Volunteering",
        handle: () => [
          <ul key="l-ul" className="list-disc pl-5">
            <li>Led AI-related outreach and Hackathon initiatives as part of the AI for Society group at IIIT Sri City (2024–2025).</li>
            <li>Assisted with logistics and event operations during the Abhisarga’24 techno-cultural festival (Mar 2024).</li>
          </ul>
        ],
      },

      contact: {
        describe: "Contact details",
        handle: () => [
          <div key="c-0">Get in touch:</div>,
          <ul key="c-ul" className="list-none pl-0">
            <li>Email: <Link href="mailto:dev.srirangam.uc@gmail.com">dev.srirangam.uc@gmail.com</Link></li>
            <li>GitHub: <Link href="https://github.com/srirangamuc">github.com/srirangamuc</Link></li>
            <li>LinkedIn: <Link href="https://www.linkedin.com/in/srirangam-umesh-chandra">linkedin.com/in/srirangam-umesh-chandra</Link></li>
            <li>Leetcode: <Link href="https://leetcode.com/xinirs">@xinirs</Link></li>
          </ul>
        ],
      },

      banner: {
        describe: "Show ASCII banner",
        handle: () => [
          <div key="b-art">
            <AsciiArt art={profileAscii} />
          </div>,
        ],
      },

      clear: {
        describe: "Clear the screen",
        handle: () => null,
      },

      riddle: {
        describe: "Solve a riddle about character",
        handle: () => [
            <div key="r-0" className="primary">Here's your riddle:</div>,
            <div key="r-1" className="mt-2">
            I am the courage when fear takes its stand,<br />
            I walk the edge when others demand.<br />
            Not seen in comfort, but in the fight,<br />
            I turn doubt into daring, and darkness to light.
            </div>,
            <div key="r-2" className="muted mt-2">
            (Type <Cmd>guess [your answer]</Cmd> to try solving.)
            </div>,
        ],
        },

        guess: {
        describe: "Try answering the riddle",
        handle: (raw) => {
            const answer = raw.split(" ").slice(1).join(" ").toLowerCase().trim()
            if (!answer) {
            return <div className="muted">Usage: <Cmd>guess guts</Cmd></div>
            }

      if (["guts", "courage", "bravery"].includes(answer)) {
      return (
        <div className="primary">
        Correct! The answer is <strong>Guts</strong>.
        <div className="muted">Because true character is having the guts to act with courage when it matters most.</div>
        </div>
      )
      }

      return <div>Not quite. Try again!</div>
        },
    },
   secret: {
        describe: "???",
        handle: () => {
            const quotes = [
            "'Perfectly balanced, as all things should be.' — Except my CSS grid layouts.",
            "'I am inevitable.' — So is that one bug I keep ignoring.",
            "'The hardest choices require the strongest wills.' — Like deleting node_modules.",

            // Ultron
            "'When the dust settles, the only thing living in this world… will be metal.' — Also true for my codebase after too many refactors.",
            "'You're all puppets, tangled in strings.' — Me, watching async/await spaghetti.",
            "'Everyone creates the thing they dread.' — Me, building my own deadline monster.",

            // Other MCU style jokes
            "'I can do this all day.' — Debugging, basically.",
            "'With great power comes great responsibility.' — Don't misuse `sudo rm -rf /`.",
            ]
            const line = quotes[Math.floor(Math.random() * quotes.length)]

            return [
            <div key="sec-1" className="mt-2">{line}</div>,
            <div key="sec-2" className="muted mt-2">Even villains leave wisdom in the terminal.</div>,
            ]
        },
        },
    }
  }, [profileAscii])


  const handleSubmit = React.useCallback(
    (raw) => {
      const trimmed = raw.trim()
      if (!trimmed) {
        setHistory((prev) => [...prev, { id: Date.now() + Math.random(), kind: "user", prompt, command: "" }])
        return
      }

      setHistory((prev) => [...prev, { id: Date.now() + Math.random(), kind: "user", prompt, command: trimmed }])

      setCommandHistory((prev) => (prev[prev.length - 1] === trimmed ? prev : [...prev, trimmed]))
      setHistoryIndex(null)

      const [name] = trimmed.split(/\s+/)
      const key = String(name || "").toLowerCase()

      if (key === "clear") {
        setHistory([])
        setInput("")
        return
      }

      const cmd = commands[key]
      if (!cmd) {
        setHistory((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            kind: "output",
            content: (
              <div>
                {trimmed}: command not found. Type <Cmd>help</Cmd> to see available commands.
              </div>
            ),
          },
        ])
        setInput("")
        return
      }

      const out = cmd.handle(trimmed)
      if (Array.isArray(out)) {
        out.forEach((node) => {
          setHistory((prev) => [...prev, { id: Date.now() + Math.random(), kind: "output", content: node }])
        })
      } else if (out) {
        setHistory((prev) => [...prev, { id: Date.now() + Math.random(), kind: "output", content: out }])
      }
      setInput("")
    },
    [commands, prompt],
  )

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(input)
      return
    }

    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault()
      setHistory((prev) => [...prev, { id: Date.now() + Math.random(), kind: "system", content: "^C" }])
      setInput("")
      setHistoryIndex(null)
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!commandHistory.length) return
      if (historyIndex === null) {
        const idx = commandHistory.length - 1
        setHistoryIndex(idx)
        setInput(commandHistory[idx] ?? "")
      } else if (historyIndex > 0) {
        const nextIndex = historyIndex - 1
        setHistoryIndex(nextIndex)
        setInput(commandHistory[nextIndex] ?? "")
      }
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex === null) return
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1
        setHistoryIndex(nextIndex)
        setInput(commandHistory[nextIndex] ?? "")
      } else {
        setHistoryIndex(null)
        setInput("")
      }
      return
    }
  }

  return (
    <div className="terminal h-screen flex flex-col" onClick={() => inputRef.current && inputRef.current.focus()}>

      <div ref={containerRef} className="flex-1 overflow-auto p-4 md:p-6" role="region" aria-label="Terminal output">
        <Typewriter
          lines={[`Welcome to ${PROMPT_HOST}.`, `Type 'help' to see available commands.`]}
          speed={16}
          onDone={() => setBannerDone(true)}
          className="mb-4 muted"
        />

        <div className="space-y-2">
          {history.map((item) => {
            if (item.kind === "system") {
              return (
                <pre key={item.id} className="whitespace-pre-wrap font-mono text-sm leading-6 muted">
                  {String(item.content)}
                </pre>
              )
            }
            if (item.kind === "user") {
              return (
                <div key={item.id} className="flex flex-wrap font-mono text-sm leading-6">
                  <span className="prompt mr-2">{prompt}</span>
                  <span>{item.command}</span>
                </div>
              )
            }
            return (
              <div key={item.id} className="font-mono text-sm leading-6">
                {item.content}
              </div>
            )
          })}
        </div>

        <div
          className={cn("mt-3 flex items-start font-mono text-sm leading-6 outline-none")}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <span className="prompt mr-2">{prompt}</span>

          <input
            ref={inputRef}
            aria-label="Terminal command input"
            className="sr-only"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />

          <div className="relative -mt-[1px]">
            <span aria-hidden>{input}</span>
            <span className={cn("cursor-block ml-[1px]", focused ? "opacity-100" : "opacity-60")}> </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terminal {
          --t-bg: #0b0e14;
          --t-fg: #e6edf3;
          --t-muted: #94a3b8;
          --t-primary: #00e676;
          --t-accent: #22d3ee;

          background-color: var(--t-bg);
          color: var(--t-fg);
          overflow:auto
        }
        .prompt {
          color: var(--t-primary);
        }
        .muted {
          color: var(--t-muted);
        }
        .primary {
          color: var(--t-primary);
        }
        .cmd {
          color: var(--t-primary);
        }
        .t-link {
          color: var(--t-accent);
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .t-link:hover,
        .t-link:focus {
          color: #17bcd3;
          outline: none;
        }
        .dot {
          background-color: var(--t-muted);
        }
        .cursor-block {
          display: inline-block;
          width: 8px;
          height: 1.1em;
          background-color: var(--t-fg);
          vertical-align: text-bottom;
          animation: blink 1s steps(1, end) infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
