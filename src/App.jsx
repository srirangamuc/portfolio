import { useState } from "react"
import Terminal from "./components/terminal"
import HackerLoading from "./components/hacker-loading"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [isTvSwitchOn, setIsTvSwitchOn] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setIsTvSwitchOn(true)
    }, 100)
  }

  return (
    <main className="min-h-screen w-screen relative bg-[#0B0E14]">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ease-out ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
        style={{ display: isLoading ? "block" : "none" }}
      >
        <HackerLoading onComplete={handleLoadingComplete} />
      </div>

      <div className={`absolute inset-0 overflow-hidden ${!isLoading ? "block" : "none"}`}>
        <div
          className={`h-full w-full transition-all duration-700 ease-out ${
            isTvSwitchOn ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
          style={{
            transformOrigin: "center center",
            clipPath: isTvSwitchOn ? "inset(0% 0% 0% 0%)" : "inset(50% 0% 50% 0%)",
          }}
        >
          <div className="h-full w-full overflow-auto">
            <Terminal />
          </div>
        </div>
      </div>
    </main>
  )
}
