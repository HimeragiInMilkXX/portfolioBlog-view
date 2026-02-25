import { Component, For } from "solid-js";
import { useComments } from "../../hooks/useComments";
import CommentField from "./CommentField";
import CommentRow from "./CommentRow";

const CommentSection: Component<{ post_id: number | string, classes?: string }> = ({ post_id, classes = ""}) => {

    const { comments, postComment } = useComments( post_id );

    return (

        <section class={`${classes} w-full box-border px-9 flex flex-col items-stretch gap-4.5`}>

            <h2 class="text-3xl font-medium"> {comments()?.length} Comment{(comments()?.length ?? 0) > 1 && 's'} </h2>

            <CommentField postComment={postComment}/>

            <div class="flex flex-col gap-6 mt-3">
                <For each={comments()}>
                    {(item) => <CommentRow comment={item}/>}
                </For>
            </div>

        </section>

    )

}

export default CommentSection;