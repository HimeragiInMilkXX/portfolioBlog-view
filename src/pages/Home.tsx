import { createSignal, For, onMount } from "solid-js";
import { getPosts } from "../utils/post";
import { PostData } from "../exports";
import gsap from "gsap"
import { SteppedEase } from "gsap";
import { Icon } from "@iconify-icon/solid";
import { Search } from "lucide-solid";
import PostRow from "../component/post/PostRow";

export default function Home() {

	const [ posts, setPosts ] = createSignal<PostData[]>();


	const cancelScroll = (e) => {e.preventDefault();}
	window.scrollTo(0, 0);
	window.addEventListener("wheel", cancelScroll, { passive: false } );

	const fetchPost = async () => {

		const posts = await getPosts(searchInput?.value ?? "");
		setPosts( posts );

	}

	let title: HTMLHeadingElement | undefined;
	let cursor: HTMLSpanElement | undefined;
	let overlay: HTMLDivElement | undefined
	let container: HTMLDivElement | undefined;

	onMount( async () => {

		await fetchPost();

		if( !title || !cursor || !overlay || !container ) return;

		const typing = gsap.fromTo( cursor,

			{ autoAlpha: 0, x: 25 },
			{
				autoAlpha: 1,
				repeat: -1,
				ease: SteppedEase.config(1)
			}

		)

		gsap.timeline().to( title, {

			text: { value: "Oscar's Blog" },
			duration: 1.5,
			delay: 1,
			ease: 'none',

		}).to( container, {

			height: "100%",
			duration: 0.5,
			delay: 0.35,
			ease: 'power1.out',
			onStart: () => { typing.kill(); cursor.remove() }
			
		})
		.to( overlay, {

			opacity: 0,
			duration: 0.75,
			delay: 0,
			ease: 'power2.in'

		} ).eventCallback( 'onComplete', () => {
			overlay.remove();
			window.removeEventListener("wheel", cancelScroll)
		} )

	} );

	let searchInput: HTMLInputElement | undefined;

	return (

		<>

			<div class="absolute w-full h-dvh bg-white z-100" ref={overlay} ></div>

			<section class="w-full h-[70vh] overflow-hidden relative">

				<img src="/default.jpg" alt="" class="absolute w-full opacity-40 object-cover h-full hover:opacity-50! hover:scale-[101%] transition-all!"/>

				<div class="absolute z-101 pointer-events-none flex flex-col items-center justify-center left-1/2 -translate-x-1/2 h-dvh" ref={container}>
					<h2 ref={title} class="tracking-tight md:text-9xl text-6xl font-medium whitespace-nowrap"></h2>
					<span ref={cursor} class="absolute md:text-9xl text-6xl md:right-0 right-3">|</span>
				</div>

			</section>

			<div class="relative max-w-292 m-auto flex flex-col items-center gap-6 mt-12 px-6">

				<section class="flex justify-between w-full items-center">

					<h2 class="text-5xl font-medium flex items-center gap-3"> <Icon icon="mdi:blog-outline"/> <span class="max-sm:hidden">Blog Posts</span> </h2>
					<div class="flex gap-3 h-full items-center">

						<input type="text" class="outline-none border-b text p-1.5 px-3" ref={searchInput} placeholder="Enter keyword..." onKeyDown={(e) => {

							if( e.key === "Enter" ) {
								e.target.blur()
								fetchPost();
							}

						}}/>
						<Search width={27} height={27} onclick={ () => {

							searchInput?.blur()
							fetchPost();

						}}/>

					</div>

				</section>

				<div class="w-full flex flex-col gap-6">
					<For each={posts()} fallback={
						posts() ?
							<div class="w-full aspect-10/3 flex justify-center items-center text-6xl font-extrabold text-black/20 tracking-wider"> No result matches '{searchInput?.value}' </div> :
							<div class="w-full aspect-10/3 flex justify-center items-center text-6xl font-extrabold text-black/20 tracking-wider"> Fetching Posts... </div>
						}>
						{ item => <PostRow post={item}/>}
					</For>
				</div>

			</div>

		</>

	);

}
