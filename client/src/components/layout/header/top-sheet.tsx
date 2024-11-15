"use client"

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import SearchBarHeader from "./search-bar-header"

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

type SheetSide = (typeof SHEET_SIDES)[number]

export function SheetSide() {
    return (
            <Sheet>
                <SheetTrigger asChild>
                    <div className='rounded-full w-9 h-9 flex justify-center items-center border border-[--dark-cus-800] bg-[--dark-cus-700] hover:bg-opacity-60'>
                        <MagnifyingGlassIcon />
                    </div>
                </SheetTrigger>
                <SheetContent side='top' className="px-4 py-3">
                    <SearchBarHeader />
                </SheetContent>
            </Sheet>
    )
}
