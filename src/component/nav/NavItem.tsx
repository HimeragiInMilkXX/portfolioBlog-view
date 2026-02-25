import { A } from "@solidjs/router"
import { Component } from "solid-js"

const NavItem: Component<{ href?: string, text: string, classes?: string }> = ({ href = "/", text, classes = "" }) => {

    return <li class={`h-full ${classes}`}><A href={href} class="w-30 sm:w-36 flex h-full items-center justify-center hover:underline"> {text} </A></li>

}

export default NavItem