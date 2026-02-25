import { createSignal, onMount } from "solid-js";
import { getComments, pushComment } from "../utils/post";
import { CommentItem } from "../exports";

export function useComments( post_id: number | string ) {

    const [ comments, setComments ] = createSignal<CommentItem[]>();

    onMount( async () => {

        const { comments_count, comments } = await getComments( post_id );
        setComments( comments );

    })

    async function postComment( content: string ) {

        const { comments_count, comments } = await pushComment( post_id, content );
        setComments( comments );

    }

    return { comments, postComment }

}