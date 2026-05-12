import React, { useEffect, useRef, useCallback, createContext, useContext, useState } from 'react'
import { GoArrowUpRight } from "react-icons/go"

const CursorContext = createContext({
  show: () => { },
  hide: () => { },
  activate: () => { },
  deactivate: () => { },
  getMousePos: () => ({ x: 0, y: 0 })
})

export const useCursor = () => useContext(CursorContext)

export const CursorProvider = ({ children }) => {
  const cursorRef = useRef(null)
  const [active, setActive] = useState(false)
  const [isHoveringTarget, setIsHoveringTarget] = useState(false)
  const [hideOnMove, setHideOnMove] = useState(false)
  const [icon, setIcon] = useState(null)
  const [label, setLabel] = useState(null)
  const isMovingMouse = useRef(false)
  const moveTimeout = useRef(null)
  const [isPointerFine, setIsPointerFine] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: fine)').matches
    }
    return false
  })
  const mousePos = useRef({ x: 0, y: 0 })
  const lastX = useRef(0)
  const lastY = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      setIsPointerFine(window.matchMedia('(pointer: fine)').matches)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!cursorRef.current) return
    mousePos.current = { x: e.clientX, y: e.clientY }

    const deltaX = Math.abs(e.clientX - lastX.current)
    const deltaY = Math.abs(e.clientY - lastY.current)

    if (isHoveringTarget && hideOnMove && (deltaX > 2 || deltaY > 2)) {
      setActive(false)
    }

    if (deltaX > 1 || deltaY > 1) {
      isMovingMouse.current = true
      if (moveTimeout.current) clearTimeout(moveTimeout.current)
      moveTimeout.current = setTimeout(() => {
        isMovingMouse.current = false
      }, 150)
    }

    lastX.current = e.clientX
    lastY.current = e.clientY

    const x = e.clientX - cursorRef.current.clientWidth / 2
    const y = e.clientY - cursorRef.current.clientHeight / 2
    cursorRef.current.style.left = `${x}px`
    cursorRef.current.style.top = `${y}px`
  }, [isHoveringTarget, hideOnMove])

  useEffect(() => {
    if (isPointerFine) {
      window.addEventListener('pointermove', handleMouseMove)
      return () => window.removeEventListener('pointermove', handleMouseMove)
    }
  }, [handleMouseMove, isPointerFine])

  const show = useCallback(() => {
    setIsHoveringTarget(true)
    setHideOnMove(false)
    setIcon(null)
    setLabel(null)
    setActive(true)
    if (isPointerFine) {
      document.body.classList.add('hide-cursor')
      document.documentElement.classList.add('hide-cursor')
    }
  }, [isPointerFine])

  const hide = useCallback(() => {
    setIsHoveringTarget(false)
    setHideOnMove(false)
    setActive(false)
    if (isPointerFine) {
      document.body.classList.remove('hide-cursor')
      document.documentElement.classList.remove('hide-cursor')
    }
  }, [isPointerFine])

  const activate = useCallback((opts = {}) => {
    if (opts.hideOnMove && isMovingMouse.current) return

    setIsHoveringTarget(true)
    setHideOnMove(!!opts.hideOnMove)
    setIcon(opts.icon || null)
    setLabel(opts.label || null)
    
    if (cursorRef.current) {
      const x = mousePos.current.x - (opts.label ? 60 : 64)
      const y = mousePos.current.y - (opts.label ? 24 : 64)
      cursorRef.current.style.left = `${x}px`
      cursorRef.current.style.top = `${y}px`
    }
    setActive(true)
    if (isPointerFine) {
      document.body.classList.add('hide-cursor')
      document.documentElement.classList.add('hide-cursor')
    }
  }, [isPointerFine])

  const deactivate = useCallback(() => {
    setIsHoveringTarget(false)
    setHideOnMove(false)
    setActive(false)
    if (isPointerFine) {
      document.body.classList.remove('hide-cursor')
      document.documentElement.classList.remove('hide-cursor')
    }
  }, [isPointerFine])

  const getMousePos = useCallback(() => mousePos.current, [])

  const value = React.useMemo(() => ({ show, hide, activate, deactivate, getMousePos }), [show, hide, activate, deactivate, getMousePos])

  if (!isPointerFine) {
    return children
  }

  return (
    <CursorContext.Provider value={value}>
      {children}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed z-[9999] isolate overflow-hidden rounded-full flex items-center justify-center custom-cursor bg-[#B3F4E1] text-[#1a1a1a] transition-[opacity,transform,scale] duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${label ? 'px-6 py-3 w-auto h-auto min-w-[120px]' : 'w-24 h-24 lg:w-32 lg:h-32'}`}
        style={{
          willChange: 'transform, left, top'
        }}
      >
        <div className="flex items-center gap-2 whitespace-nowrap">
          {label && <span className="text-sm lg:text-base font-bold tracking-tight">{label}</span>}
          <span className={label ? 'text-lg lg:text-xl' : 'text-3xl lg:text-5xl'}>
            {icon ? icon : <GoArrowUpRight />}
          </span>
        </div>
      </div>
    </CursorContext.Provider>
  )
}

export default CursorProvider
