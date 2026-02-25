import { createSignal, onMount } from "solid-js";
import { getLike, toggleLike } from "../utils/post";
import { authState } from "../states";

export function useLikes( post_id: number | string ) {

    const [ likes, setLikes ] = createSignal<number>(0);
    const [ liked, setLiked ] = createSignal<boolean>(false);

    onMount( async () => {

        const { likes, alreadyLiked } = await getLike( post_id )
        setLikes( likes );
        setLiked( alreadyLiked );

    })

    async function likePost() {

        if( !authState.isLogged ) {
            console.log( "not logged in");
            return;
        }

        const { liked, likes } = await toggleLike( post_id );
        setLikes( likes );
        setLiked( liked );

    }

    return { likes, liked, likePost }

}