import { Component, Show, createSignal, onCleanup } from "solid-js";
import { createTiptapEditor } from "solid-tiptap";
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import ImageResize from 'tiptap-extension-resize-image';
import CodeBlock from '@tiptap/extension-code-block'
import TextAlign from '@tiptap/extension-text-align'
import {TextStyleKit} from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { TableKit } from '@tiptap/extension-table'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import { Toolbar } from "terracotta";
import "./styles.css"
import ToolbarContents from "./ToolbarContents";
import { Editor } from "@tiptap/core";
import { CleanImageResize } from "./CleanImageResize";

export type EditorRef = { getHTML: () => any }

const RichTextEditor: Component<{ classes?: string, ref?: (api: EditorRef) => void }> = ( { classes = "", ref } ) => {

    const [container, setContainer] = createSignal<HTMLDivElement>();
    const [_, setMenu] = createSignal<HTMLDivElement>();

    const editor = createTiptapEditor(() => ({
        element: container()!,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            CleanImageResize.configure({inline: true}),
            CodeBlock.configure({exitOnArrowDown: true}),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TextStyleKit,
            Color,
            TableKit,
            Superscript.configure({}),
            Subscript,
        ],
        editorProps: {
            attributes: { class: "bg-white box-border p-4 w-full h-160 overflow-y-scroll outline-none", style: "scrollbar-width: none" }
        }
    }));

    const api: EditorRef = { getHTML: () => editor()?.getHTML() }
    ref?.(api);

    return (

        <div class={`border-2 ${classes}`}>

            <Toolbar
                ref={setMenu}
                class=""
                horizontal
                >
                <Show when={editor()} keyed>
                    {(instance) => <ToolbarContents editor={instance} />}
                </Show>
            </Toolbar>

            <div
                class="h-[80vh] bg-white overflow-y-scroll rounded-lg editor p-4.5"
                ref={setContainer}
            />

        </div>

    );

}

export default RichTextEditor;