import { createStore } from "solid-js/store";
import { User } from "./exports";

export const [ authState, setAuthState ] = createStore<{ isLogged: boolean, user: User | null }>({

    isLogged: false,
    user: null

})