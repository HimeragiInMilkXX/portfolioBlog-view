import { ThumbsUp } from "lucide-solid";
import { Accessor, Component, createSignal, onMount } from "solid-js";
import { getLike, toggleLike } from "../utils/post";

const LikeButton: Component<{ classes?: string, size?: number, liked: Accessor<boolean>, likes: Accessor<number>, likePost: () => void }> = ( { classes = "", size = 20, likes, liked, likePost } ) => {

    return (

        <div class={`${classes} flex gap-1.5 items-center cursor-pointer ${liked() ? 'text-blue-800 hover:text-blue-900' : 'hover:text-blue-800'}`}
            onClick={() => likePost()}> <ThumbsUp size={size}/> {likes()} </div>

    )

}

export default LikeButton;