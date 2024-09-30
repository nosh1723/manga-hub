import * as React from "react"

import { cn } from "@/lib/utils"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Search = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="flex items-center rounded-md border border-[--dark-cus-800] bg-[--dark-cus-900] bg-opacity-20">
                <MagnifyingGlassIcon className="ml-3"/>
                <input
                    type={type}
                    className={cn(
                        "flex h-8 w-full rounded-md bg-[--dark-cus-900] bg-opacity-20 px-3 py-1 text-sm text-[--gray-cus-300] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    placeholder="Search..."
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Search.displayName = "Search"

export { Search }
