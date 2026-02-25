import { Editor } from "@tiptap/core";
import type { JSX } from "solid-js";
import { createEditorTransaction } from "solid-tiptap";
import { Toggle, Toolbar } from "terracotta";

interface ControlProps {
    class?: string;
    editor: Editor;
    title: string;
    key: string | any;
    onChange: () => void;
    isActive?: (editor: Editor) => boolean;
    children: JSX.Element;
}

function Control(props: ControlProps): JSX.Element {

    const flag = createEditorTransaction(

        () => props.editor,

            (instance) => {

            if (props.isActive) {
                return props.isActive(instance);
            }

            return instance.isActive(props.key);

        },

    );

    return (

        <Toggle
            defaultPressed={false}
            class={`${props.class} p-1.5`}
            classList={{
                "bg-gray-300": flag(),
            }}
            title={props.title}
            onChange={props.onChange}
            type="button"
            >
            {props.children}
        </Toggle>

    );

}

export default Control;