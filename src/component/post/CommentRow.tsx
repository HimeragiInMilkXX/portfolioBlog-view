import { Component } from "solid-js";
import { CommentItem, constructUrlToImage, splitDate } from "../../exports";

const CommentRow: Component<{ comment: CommentItem, classes?: string }> = ( { comment, classes = "" } ) => {

    return (

        <div class={`${classes} w-full flex gap-3 items-start`}>

            <img src={constructUrlToImage(comment.avatar)} alt="" class={`rounded-full object-cover grow self-start max-w-[5%] aspect-square`}/>
            <div class={`flex flex-col gap-0.5 self-center max-w-[95%] w-[95%]`}>

                <div class="flex gap-6 items-center">

                    <p> {comment.username} </p>
                    <p class="text-xs flex gap-1.5"> <span>{splitDate(comment.createdOn)[0]}</span> <span>{splitDate(comment.createdOn)[1]}</span> </p>

                </div>

                <p class="break-all"> {comment.content} </p>

            </div>

        </div>

    )

}

export default CommentRow;