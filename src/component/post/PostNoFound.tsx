import { A } from "@solidjs/router";
import { publicAsset } from "../../exports";

const PostNotFound = () => (
    <section class="w-full absolute h-dvh flex flex-col gap-3 justify-center items-center box-border pb-9">
		<img src={publicAsset("mylogo.svg")} alt="" class="h-50 object-contain aspect-square w-fit" />
		<h2 class="text-6xl font-extrabold text-black text-center">404 – Not found</h2>
		<div class="flex flex-col gap-1.5 leading-tight items-center text-center">

			<p>The post you’re looking for doesn’t exist.</p>
			<A href="/" class="text-blue-900 underline cursor-pointer"> Back to top of oscar's blog </A>

		</div>
    </section>
);

export default PostNotFound;
