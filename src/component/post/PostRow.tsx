import { Component } from "solid-js";
import { constructUrlToImage, PostData, splitDate } from "../../exports";
import { Calendar, Clock10, Tag, ThumbsUp } from "lucide-solid";
import { useLikes } from "../../hooks/useLikes";
import { A } from "@solidjs/router";

const PostRow: Component<{ classes?: string, post: PostData }> = ( { classes = "", post } ) => {

    const [ date, time ] = splitDate( post?.createdOn );
    const { likes } = useLikes( post?.id );

    return (

        <A href={`/post/view/${post?.id}`}>
            <article class={`${classes} drop-shadow-[0_2px_4px_#00000025] w-full`}>
                <section style={ { "clip-path": "polygon(0 0, calc( 100% - 60px ) 0, 100% 60px, 100% 100%, 0 100%)" } } class="bg-white relative px-6 py-6 flex gap-6 items-center">
                    <div class="w-15 aspect-square absolute right-0 top-0 bg-white z-2 drop-shadow-[0_4px_6.6px_#00000040]">
                        <div class="w-full h-full"
                            style={ { "clip-path": "polygon(0 0, 92.5% 0, 100% 7.5%, 100% 100%, 0 100%)" } }></div>
                    </div>
                    <div class="max-sm:min-w-30 w-30 aspect-square sm:w-60 self-stretch"><img src={constructUrlToImage(post.cover_photo)} alt="" class="object-cover w-full h-full border border-black/20"/></div>
                    <div class="flex flex-col gap-3 border-black/10 grow basis-0">
                        <h2 class="text-4xl font-bold line-clamp-2 text-ellipsis"> {post?.title} </h2>
                        <p class="max-[430px]:hidden text-xl ml-0.5 leading-relaxed line-clamp-3 text-ellipsis"> {post?.description} </p>
                        <div class="flex gap-6 text-black/70 ml-0.5 flex-wrap gap-y-3 max-sm:hidden ">
                            <div class="flex gap-1.5 items-center"> <Tag size={20}/> {post?.category} </div>
                            <div class="flex gap-1.5 items-center"> <Calendar size={20}/> {date} </div>
                            <div class="flex gap-1.5 items-center"> <Clock10 size={20}/> {time} </div>
                            <div class="flex gap-1.5 items-center"> <ThumbsUp size={20}/> {likes()} </div>
                        </div>
                    </div>
                </section>
            </article>
        </A>

    )

}

export default PostRow;