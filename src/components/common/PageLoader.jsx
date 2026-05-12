import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const PageLoader = () => {
    const [isLoading, setIsLoading] = useState(true)
    const ellipseRef = useRef(null)
    const maskRef = useRef(null)
    const leaveEllipseRef = useRef(null)
    const leaveSvgRef = useRef(null)

    useEffect(() => {
        if (ellipseRef.current) {
            gsap.to(ellipseRef.current, {
                attr: { rx: 2700, ry: 2150 },
                duration: 1.25,
                ease: 'power2.out',
                onComplete: () => {
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 300)
                }
            })
        }

        const handleLinkClick = (e) => {
            const link = e.target.closest('a')
            if (link && link.href && link.href.startsWith(window.location.origin) && !link.href.includes('#')) {
                e.preventDefault()
                if (leaveEllipseRef.current) {
                    gsap.to(leaveEllipseRef.current, {
                        attr: { ry: 1500 },
                        duration: 0.8,
                        ease: 'power2.in',
                        onComplete: () => {
                            window.location.href = link.href
                        }
                    })
                }
            }
        }

        document.addEventListener('click', handleLinkClick)
        return () => document.removeEventListener('click', handleLinkClick)
    }, [])

    if (!isLoading) return null

    return (
        <>
            <div className="fixed inset-0 w-screen h-screen-fix h-svh z-[999999] pointer-events-none hidden md:block"
                style={{ pointerEvents: 'none' }}
            >
                <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="none" className="block w-screen h-svh">
                    <defs>
                        <mask id="circle-reveal-mask">
                            <rect width="100%" height="100%" fill="white"/>
                            <ellipse
                                ref={ellipseRef}
                                cx="960"
                                cy="2000"
                                rx="0"
                                ry="0"
                                fill="black"
                            />
                        </mask>
                    </defs>
                    <rect
                        ref={maskRef}
                        width="100%"
                        height="100%"
                        fill="#b2f6e3"
                        mask="url(#circle-reveal-mask)"
                    />
                </svg>
            </div>

            <div
                className="fixed inset-0 w-screen h-screen-fix h-svh z-[100] hidden pointer-events-none md:block"
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            >
                <svg
                    ref={leaveSvgRef}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    className="block w-screen h-svh"
                >
                    <ellipse
                        ref={leaveEllipseRef}
                        cx="50%"
                        cy="120%"
                        rx="500"
                        ry="0"
                        fill="#f4f4f4"
                    />
                </svg>
            </div>
        </>
    )
}

export default PageLoader
