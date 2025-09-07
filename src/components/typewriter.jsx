import React from "react"
export default function Typewriter({ lines, speed = 18, onDone, className = "" }) {
  const [displayLines, setDisplayLines] = React.useState([])
  const [lineIdx, setLineIdx] = React.useState(0)
  const [charIdx, setCharIdx] = React.useState(0)

  React.useEffect(() => {
    let timeout
    const typeNext = () => {
      if (lineIdx >= lines.length) {
        onDone && onDone()
        return
      }
      const line = lines[lineIdx]
      if (charIdx <= line.length) {
        const next = line.slice(0, charIdx)
        setDisplayLines((prev) => {
          const copy = prev.slice()
          if (copy[lineIdx] == null) copy[lineIdx] = ""
          copy[lineIdx] = next
          return copy
        })
        setCharIdx(charIdx + 1)
        timeout = setTimeout(typeNext, speed)
      } else {
        setLineIdx(lineIdx + 1)
        setCharIdx(0)
        timeout = setTimeout(typeNext, speed * 3)
      }
    }
    timeout = setTimeout(typeNext, speed)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIdx, charIdx, lines])

  return (
    <div className={className}>
      {lines.map((_, i) => (
        <pre
          key={i}
          className="whitespace-pre-wrap font-mono text-sm leading-6"
          aria-live={i === lineIdx ? "polite" : "off"}
        >
          {displayLines[i] ?? ""}
        </pre>
      ))}
    </div>
  )
}
