"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes" // Import this
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
    duration?: number
}

export const AnimatedThemeToggler = ({
                                         className,
                                         duration = 400,
                                         ...props
                                     }: AnimatedThemeTogglerProps) => {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setMounted(true);
        });
        return () => cancelAnimationFrame(raf);
    }, []);

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current) return

        const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

        // Support for View Transitions API
        if (!document.startViewTransition) {
            setTheme(nextTheme)
            return
        }

        await document.startViewTransition(() => {
            flushSync(() => {
                setTheme(nextTheme)
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
    }, [resolvedTheme, setTheme, duration])

    // Prevent rendering until mounted to match server HTML
    if (!mounted) return <div className={cn("h-9 w-9", className)} />

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            {...props}
        >
            {resolvedTheme === "dark" ? (
                <Sun className="stroke-amber-400 fill-amber-400/20 size-5" />
            ) : (
                <Moon className="size-5" />
            )}
        </button>
    )
}