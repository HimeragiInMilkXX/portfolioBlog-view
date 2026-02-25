import { useParams } from "@solidjs/router";
import axios from "axios";
import { createSignal, onMount } from "solid-js";
import { constructUrlToImage, PostData } from "../../exports";
import PostNotFound from "../../component/post/PostNoFound";
import HeroImg from "../../component/HeroImg";
import Post from "../../component/post/Post";
import gsap from "gsap"
import { getLike, toggleLike } from "../../utils/post";
import CommentSection from "../../component/post/CommentSection";

const PostView = () => {

    const { id } = useParams<{ id: string }>();
    const [ postData, setPostData ] = createSignal<PostData>();
    const [ trying, setTrying ] = createSignal<boolean>(true);

    const getPost = async () => {

        setTrying( true );

        try {

            const res = await axios.get<PostData>( `${import.meta.env.VITE_BACKEND_DOMAIN}/api/posts/${id}` )
            setPostData( res.data );

        } catch ( err ) {

            console.error( err );

        }

        setTrying( false );

    }

    const [ position, setPosition ] = createSignal<number>(200);
    const [ opacity, setOpacity ] = createSignal<number>(0);

    const animate = () => {

        const proxy = { value: position() }

        gsap.to( proxy, {

            value: 0,
            duration: 1.25,
            ease: "power4.out",
            onUpdate: () => {

                setPosition( proxy.value );
                setOpacity( 1 - proxy.value / 200 );

            }

        })

    }

    onMount( () => {

        getPost().then( () => {

            animate()

        })


    })


    return (

        <>

            { postData()?.cover_photo && <HeroImg path={postData()!.cover_photo} classes="absolute w-full top-0"/>}

            { postData() ? (

                <div class="relative max-w-292 px-6 m-auto flex flex-col items-center gap-9" style={ { 'transform': `translateY(${position()}px)`, 'opacity': opacity() }}>
                    <Post postData={postData()} classes={`mt-[43vh] relative`} post_id={id}/>
                    <CommentSection post_id={id}/>
                </div>

            ):  ( !trying() && <PostNotFound/> )}

        </>
    )

}

export default PostView