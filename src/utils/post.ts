import { api, CommentItem, PostData } from "../exports"

export const getLike = async ( post_id: number | string ) => {

    const res = await api.get<{ likes: number, alreadyLiked: boolean }>( `/api/posts/${post_id}/like` )
    return res.data;

}

export const toggleLike = async ( post_id: number | string ) => {

    try {

        const res = await api.post<{ likes: number, liked: boolean }>( `/api/posts/${post_id}/like` )
        return res.data

    } catch ( err: any ) {

        console.error("UPDATE ERROR:", err.response?.data);
        throw err.response?.data ?? err;

    }

}

export const getComments = async ( post_id: number | string ) => {

    const res = await api.get<{ comments_count: number, comments: CommentItem[] }>( `/api/posts/${post_id}/comment` )
    return res.data;

}

export const pushComment = async ( post_id: number | string, content: string ) => {

    try {

        await api.post(`/api/posts/${post_id}/comment`, {

            content: content

        });
        const res = await getComments( post_id )

        return res

    } catch( err: any ) {

        console.error("UPDATE ERROR:", err.response?.data);
        throw err.response?.data ?? err;

    }

}

export const getPosts = async ( keyword?: string ) => {

    const res = await api.get<PostData[]>( `/api/posts/get?keyword=${keyword ?? ""}` )
    return res.data;

}