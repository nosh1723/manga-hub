'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { User } from "@/models/user"
import useAuthStore from "@/stores/auth.store"
import { useRouter } from "next/navigation"

type Props = {
    currentUser: User | null
}

const AvatarDropdown = ({ currentUser }: Props) => {
    const router = useRouter()
    const { logout } = useAuthStore()
    const ava = currentUser?.username.charAt(0)

    const handleLogout = () => {
        logout().then((data) => {
            if(data) router.push('/login')
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Avatar className="cursor-pointer">
                    {currentUser?.avatar ? <>
                        <AvatarImage width={12} src={currentUser.avatar} />
                        <AvatarFallback className="w-12">A</AvatarFallback>
                    </> :
                        <div className="w-12 bg-slate-800 flex justify-center items-center text-xl">{ava?.toUpperCase()}</div>
                    }
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border-[.5px] border-[#27272a]" side="bottom" align="end">
                <DropdownMenuLabel>{currentUser?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarDropdown