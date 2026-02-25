import axios from "axios";
import { api, LoginMForm, ProfileMForm, RegisterMForm, User } from "../exports";
import { authState, setAuthState } from "../states";

export const initCsrf = async () => await api.get("/api/auth/csrf");

export const updateProfile = async ( values: ProfileMForm, avatar?: File ) => {

    try {

        const res = await api.put( "/api/auth/update", {

            email: values.email,
            username: values.username,

        } )

        console.log( res.data.detail );

        let avatarSave = authState.user?.avatar;

        if( avatar ) {

            const formData = new FormData();
            formData.append( "avatar", avatar );

            const res = await api.post( "/api/image/avatar", formData );

            avatar = await res.data.avatar

        }

        setAuthState( {

            isLogged: true,
            user: {

                user_id: authState.user?.user_id,
                email: values.email,
                username: values.username,
                avatar: avatarSave
                
            }

        } );

    } catch ( err: any ) {

        console.error("UPDATE ERROR:", err.response?.data);
        throw err.response?.data ?? err;

    }

}

export const me = async () => {

    try {

        const res = await api.get<{ user: User }>("/api/auth/me");

        setAuthState( { isLogged: true, user: res.data.user } )

        return authState.isLogged;

    } catch (err: any) {

        console.log( "Not logged in" )
        
    }

}

export const register = async (values: RegisterMForm) => {

    try {

        const res = await api.post<{ detail: string, user: User }>("/api/auth/register", {
            email: values.email,
            username: values.username,
            password: values.password,
        } );

        console.log( res.data.detail );
        setAuthState( { isLogged: true, user: res.data.user } )

        return authState.isLogged;

    } catch (err: any) {

        console.error("REGISTER ERROR:", err.response?.data);
        throw err.response?.data ?? err;

    }
    
};

export const login = async (values: LoginMForm ) => {

    try {

        const res = await api.post<{ detail: string, user: User }>("/api/auth/login", {
            email: values.email,
            password: values.password,
        } );

        console.log( res.data.detail );
        setAuthState( { isLogged: true, user: res.data.user } )

        return authState.isLogged;

    } catch (err: any) {

        console.error("LOGIN ERROR:", err.response?.data);
        throw err.response?.data ?? err;

    }

};

export const logout = async() => {

    try {

        const res = await api.post("/api/auth/logout");

        console.log( res.data.detail );
        setAuthState( { isLogged: false, user: null } )

        return authState.isLogged;

    } catch (err: any) {

        console.error("LOGOUT ERROR:", err.response?.data);
        throw err.response?.data ?? err;

    }

}