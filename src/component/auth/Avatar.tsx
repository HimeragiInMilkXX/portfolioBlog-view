import { authState } from "../../states"
import { Dialog } from "@kobalte/core/dialog";
import { Component, createEffect, createSignal } from "solid-js";
import RegisterForm from "../form/RegisterForm";
import LoginForm from "../form/LoginForm";
import Profile from "./Profile";

const Avatar: Component<{ classes?: string }> = ({ classes = "" }) => {

    const [ form, setForm ] = createSignal<"login" | "register">("login");

    const [ url, setUrl ] = createSignal<string>("/default.jpg")

    createEffect( () => {
        console.log( authState.user )
        if( authState.isLogged ) setUrl(`${import.meta.env.VITE_BACKEND_DOMAIN}/media/${authState.user?.avatar}`);
    } )

    return (

        <Dialog>
            <Dialog.Trigger class={`${classes} bg-center bg-cover bg-white/20 bg-blend-lighten hover:bg-white/10 transition-all`} style={{ "background-image": `url(${url()})` }}></Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay class="fixed inset-0 bg-black/50 z-50" />
                <div class="fixed inset-0 z-200 flex items-center justify-center">
                    <Dialog.Content class="bg-white rounded-xl p-6 sm:min-w-150 w-100 shadow-xl">
                        <div class={`${form() != "login" && 'hidden!'}`} classList={{ hidden: authState.isLogged }}>
                            <LoginForm setForm={setForm} />
                        </div>
                        <div class={`${form() != "register" && 'hidden!'}`} classList={{ hidden: authState.isLogged }}>
                            <RegisterForm setForm={setForm} />
                        </div>
                        <div classList={{ hidden: !authState.isLogged }}>
                            <Profile/>
                        </div>
                    </Dialog.Content>
                </div>
            </Dialog.Portal>
        </Dialog>

    )

}

export default Avatar