import React from 'react'
import { Link } from 'react-router-dom'

const TopNav = () => {
    const text = '🚨 The Category Leaderboard-Live Now'

    return (

        <Link to={"#"}
            className="group inline-flex items-center gap-3 bg-[#b2f6e3] rounded-full h-8 mx-3 mt-3 justify-center px-4 text-black tracking-tighter font-extrabold cursor-pointer transition-all duration-300 ease-in-out hover:rounded-md z-[9999]"
            style={{ willChange: 'transform' }}
        >
            <span className="relative overflow-hidden flex items-center" style={{ height: '1.25rem' }}>
                <span className="block whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-full text-sm font-medium">
                    {text}
                </span>
                <span className="absolute left-0 top-full block whitespace-nowrap transition-transform duration-500 ease-in-out group-hover:-translate-y-full text-sm font-medium">
                    {text}
                </span>
            </span>
        </Link>
    )
}

export default TopNav