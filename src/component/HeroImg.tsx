import { Component } from "solid-js";
import { constructUrlToImage } from "../exports";

const HeroImg: Component<{ path: string, classes?: string }> = ({ path, classes = "" }) => {
    
    return (

        <div class={`${classes} w-full h-[70vh] overflow-hidden`}>

            <img src={constructUrlToImage(path)} alt="" class="absolute w-full opacity-40 object-cover h-full hover:opacity-50 hover:scale-[101%] transition-all" />

        </div>

    )

}

export default HeroImg;