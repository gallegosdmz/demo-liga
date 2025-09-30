import React from 'react'
import Image from 'next/image'

interface LigaLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

export function LigaLogo({ className = "", size = 'md' }: LigaLogoProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
    '2xl': 'h-16 w-20',
    '3xl': 'h-20 w-20'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <Image
        src="/logos/liga+.png"
        alt="LIGA+ Logo"
        width={200}
        height={60}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
