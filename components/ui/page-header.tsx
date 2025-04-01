import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="border-b border-border pb-6 sm:pb-8 mb-6 sm:mb-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3">{title}</h1>
        {description && <p className="text-muted-foreground text-base sm:text-lg">{description}</p>}
        {children}
      </div>
    </div>
  )
}

