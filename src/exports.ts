import axios from 'axios';
import * as z from 'zod';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// POST FORM
export const PostSchema = z.object({

    title: z.string( "required" ).min(1, "required"),
    description: z.string( "required" ).min(1, "required"),
    cover_photo: z.instanceof( File ).optional(),
    category: z.string().default("uncategorized")

})

export type PostForm = z.infer<typeof PostSchema>

// REGISTER FORM
export const RegisterSchema = z.object( {

    email: z.email( "Please enter a valid email" ),
    username: z.string( "required" ).min( 7, "Username must be at least 7 characters" ),
    password: z.string( "required" )
        .min( 8, "Password must be at least 8 characters" )
        .max( 20, "Password must be less than 20 characters" )
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain a symbol"),

} )

export type RegisterMForm = z.infer<typeof RegisterSchema>

// LOGIN FORM
export const LoginSchema = z.object( {

    email: z.email( "Please enter a valid email" ),
    password: z.string( "required" )

} )

export type LoginMForm = z.infer<typeof LoginSchema>

export type User = {

    user_id: number | string | undefined,
    email: string | undefined,
    username: string | undefined,
    avatar: string | undefined

}

export const ProfileSchema = z.object( {

    email: z.email( "Please enter a valid email" ),
    username: z.string( "required" ).min( 7, "Username must be at least 7 characters" ),

})

export type ProfileMForm = z.infer<typeof ProfileSchema>

export const uploadEmbeddedImage = async ( file: File | Blob ) => {

    const formData = new FormData();
    formData.append( "image", file );

    const res = await axios.post( `${import.meta.env.VITE_BACKEND_DOMAIN}/api/image/embed`, formData );
    const data = await res.data;

    return data.url;

}

export type PostData = {

    id: number | string;
    title: string;
    description: string;
    category: string;
    cover_photo: string;
    content: string;
    createdOn: string;
    updatedOn: string;

}

export type CommentItem = {

    id: number | string;
    content: string;
    createdOn: string;
    username: string;
    avatar: string;

}

export const constructUrlToImage = ( path: string ): string => { return `${import.meta.env.VITE_BACKEND_DOMAIN}${path}` }

export const splitDate = ( date: string | undefined ): [ date: string, time: string ] => {

    const d = dayjs( date );
    const jst = d.tz( 'Asia/Tokyo' );

    return jst.format().split( "T" ) as [ date: string, time: string ];

}

// API
const getCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : null;
};

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = getCsrfToken();
    if (token) {
        config.headers["X-CSRFToken"] = token;
    }
    return config;
});