import { Component, createEffect, createSignal, on } from "solid-js";
import { authState } from "../../states";
import { Button } from "@kobalte/core/button";

const CommentField: Component<{ classes?: string, postComment: ( content: string ) => Promise<void> }> = ({ classes = "", postComment }) => {

    const [ url, setUrl ] = createSignal<string>("/default.jpg")
    const [ editing, setEditing ] = createSignal<boolean>(false)

    let inputField: HTMLDivElement | undefined;

    createEffect( () => {
        if( authState.isLogged ) setUrl(`${import.meta.env.VITE_BACKEND_DOMAIN}/media/${authState.user?.avatar}`);
    } )

    function commentUpdate() {

        if( !inputField ) return;

        if( inputField?.innerText.trim().length <= 0 ) {
            inputField.innerText = ""
            setEditing( false )
        }

    }

    function clear() {

        if( !inputField ) return;
        inputField.innerText = ""
        setEditing( false )

    }

    function submit() {

        if( !inputField ) return;

        if( inputField?.innerText.trim().length <= 0 ) {

            alert( "Please enter a comment!")
            return;

        }

        const content = inputField.innerText;

        postComment( content ).then( () => clear() )

    }

    return (

        <div class={`${classes} flex gap-3 items-center`}>

            <img src={url()} alt="" class={`rounded-full object-cover grow w-5 ${editing() ? 'self-start sm:max-w-[6%]' : 'sm:max-w-[3%]'} aspect-square`}/>
            <div class={`flex flex-col gap-3 self-center ${editing() ? 'max-w-[94%] w-[94%]' : 'max-w-[97%] w-[97%]'}`}>
                <div contentEditable data-placeholder="Add a comment..."
                    class="editableDiv w-full outline-none border-b border-black/50 py-1.5 px-1.5"
                    ref={inputField}
                    onFocus={() => {
                        if( !authState.isLogged ) return
                        setEditing( true )
                    }}
                    onBlur={commentUpdate}></div>
                <div class="flex gap-3 self-end" classList={{ 'hidden': !editing() }}>

                    <Button class="transition-all rounded-xl py-1.5 px-3 cursor-pointer hover:bg-black/10" onClick={clear}> Cancel </Button>
                    <Button class="transition-all rounded-xl py-1.5 px-3 cursor-pointer hover:bg-black/70 bg-black/80 text-white" onClick={submit}> Comment </Button>

                </div>
            </div>

        </div>

    )

}

export default CommentField