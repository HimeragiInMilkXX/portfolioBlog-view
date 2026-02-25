import { Component, onMount } from "solid-js";
import { PostData, splitDate } from "../../exports";
import { Calendar, Tag, Clock10, ThumbsUp, Link, Bookmark, Share } from "lucide-solid";
import "../richTextEditor/styles.css"
import LikeButton from "./LikeButton";
import { useLikes } from "../../hooks/useLikes";

const Post: Component<{ postData: PostData | undefined, classes?: string, post_id: string | number }> = ( { postData, classes = "", post_id } ) => {

    const [ date, time ] = splitDate( postData?.createdOn );

    const { likes, liked, likePost } = useLikes( post_id );

    return (

        <div class={`${classes} m-auto drop-shadow-[0_2px_4px_#00000010]`}>

            <section style={ { "clip-path": "polygon(0 0, calc( 100% - 80px ) 0, 100% 80px, 100% 100%, 0 100%)" } } class="bg-white relative px-9 py-12 flex flex-col gap-9">

                <div class="w-20 aspect-square absolute right-0 top-0 bg-white z-2 drop-shadow-[0_4px_6.6px_#00000025]">
                    <div class="w-full h-full"
                        style={ { "clip-path": "polygon(0 0, 92.5% 0, 100% 7.5%, 100% 100%, 0 100%)" } }></div>
                </div>

                <div class="flex flex-col gap-4.5 border-b pb-6 border-black/10">
                    <h2 class="text-6xl font-bold"> {postData?.title} </h2>
                    <p class="text-xl ml-0.5 leading-relaxed"> {postData?.description} </p>
                    <div class="flex gap-6 text-black/70 ml-0.5 flex-wrap gap-y-3">
                        <div class="flex gap-1.5 items-center hover:text-blue-800 cursor-pointer"> <Tag size={20}/> {postData?.category} </div>
                        <div class="flex gap-1.5 items-center"> <Calendar size={20}/> {date} </div>
                        <div class="flex gap-1.5 items-center"> <Clock10 size={20}/> {time} </div>
                        <LikeButton liked={liked} likes={likes} likePost={likePost} size={20} classes=""/>
                    </div>
                </div>

                <div class="tiptap mb-6" innerHTML={postData?.content}></div>
                <div class="flex justify-between w-full ml-0.5 items-center">
                    <LikeButton size={27} classes="" liked={liked} likes={likes} likePost={likePost} />
                    <div class="flex gap-6 text-black/70 ml-0.5">
                        <Link size={27} class="hover:text-blue-700 cursor-pointer"/>
                        <Bookmark size={27} class="hover:text-blue-700 cursor-pointer"/>
                        <Share size={27} class="hover:text-blue-700 cursor-pointer"/>
                    </div>
                </div>

            </section>

        </div>

    )

}

export default Post