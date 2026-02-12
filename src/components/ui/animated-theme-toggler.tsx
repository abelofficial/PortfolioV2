"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    duration?: number
}

export const AnimatedThemeToggler = ({
                                         className,
                                         duration = 400,
                                         ...props
                                     }: AnimatedThemeTogglerProps) => {
    // Initialize as null to avoid hydration mismatch (SSR vs Client)
    const [isDark, setIsDark] = useState<boolean | null>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // 1. Initial Sync & Persistence Logic
    useEffect(() => {
        const root = document.documentElement

        // Check localStorage first, then fallback to system preference
        const savedTheme = localStorage.getItem("theme")
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        const shouldBeDark = savedTheme ? savedTheme === "dark" : systemPrefersDark

        setIsDark(shouldBeDark)
        root.classList.toggle("dark", shouldBeDark)

        // Listen for external changes (like other tabs or system settings)
        const updateTheme = () => {
            setIsDark(root.classList.contains("dark"))
        }

        const observer = new MutationObserver(updateTheme)
        observer.observe(root, {
            attributes: true,
            attributeFilter: ["class"],
        })

        return () => observer.disconnect()
    }, [])

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current || isDark === null) return

        // Support for View Transitions API
        if (!document.startViewTransition) {
            const nextTheme = !isDark
            setIsDark(nextTheme)
            document.documentElement.classList.toggle("dark")
            localStorage.setItem("theme", nextTheme ? "dark" : "light")
            return
        }

        await document.startViewTransition(() => {
            flushSync(() => {
                const nextTheme = !isDark
                setIsDark(nextTheme)
                document.documentElement.classList.toggle("dark")
                localStorage.setItem("theme", nextTheme ? "dark" : "light")
            })
        }).ready

        const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2
        const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }, [isDark, duration])

    // Avoid rendering icons until we know the theme (prevents flickering)
    if (isDark === null) return <div className={cn("h-9 w-9", className)} />

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            {...props}
        >
            {isDark ? (
                <Sun className="stroke-amber-400 fill-amber-400/20" />
            ) : (
                <Moon />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}