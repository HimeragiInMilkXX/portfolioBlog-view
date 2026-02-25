import { A } from "@solidjs/router"
import NavItem from "./NavItem"
import Avatar from "../auth/Avatar"

const Header = () => {

    return (

        <header class="z-50 w-full flex justify-between items-center box-border pl-4.5 pr-3 min-[496px]:pl-9 min-[496px]:pr-7.5 h-27 fixed top-0">

            <A href="/"><img src="/mylogo.svg" alt="oscar's logo" class="h-20 aspect-square object-contain"/></A>

            <ul class="flex items-center text-2xl h-full">

                <NavItem text="Portfolio" href="/"/>

                <Avatar classes="items-center aspect-square rounded-full h-12"/>

            </ul>

        </header>

    )

}

export default Header