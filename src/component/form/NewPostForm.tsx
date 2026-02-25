import { createForm, reset, zodForm } from "@modular-forms/solid"
import { PostForm, PostSchema } from "../../exports"
import { Button } from "@kobalte/core/button";
import { Component, createSignal } from "solid-js";
import { TextField } from "@kobalte/core/text-field";
import { FileField } from "@kobalte/core/file-field";
import RichTextEditor, { EditorRef } from "../richTextEditor/RichTextEditor";
import axios from 'axios'
import { useNavigate } from "@solidjs/router";

const NewPostForm: Component<{ classes?: string }> = ( { classes = "" } ) => {

    const navigate = useNavigate();

    const [ _, { Form, Field } ] = createForm<PostForm>({ validate: zodForm(PostSchema) });

    const [ editor, setEditor ] = createSignal<null | EditorRef >(null);
    const [ coverPhoto, setCoverPhoto ] = createSignal<null | File>(null);

    const handleSubmit = ( values: PostForm ) => {

        const formData = new FormData();
        formData.append("title", values.title );
        formData.append("description", values.description );
        formData.append("category", values.category );

        if( values.cover_photo )
            formData.append("cover_photo", values.cover_photo);

        formData.append("content", editor()?.getHTML() );

        axios.post( `${import.meta.env.VITE_BACKEND_DOMAIN}/api/posts/create`, formData )
            .then( ( res ) => {
                console.log( res.data );
                navigate( "/", { replace: true } );
            } )
            .catch( err => console.log( err.response?.data ) );

    }

    return (

        

        <Form class={`${classes} flex flex-col gap-3`} onSubmit={handleSubmit}>

            <h1 class="text-6xl font-extrabold mb-3"> New Post </h1>

            <Field name="title" >
                { ( field, props ) =>
                    <TextField class="flex flex-col gap-1.5 w-full">
                        <TextField.Label class="flex gap-3"> Title* {field.error && <div class="text-red-400">{field.error}</div>} </TextField.Label>
                        <TextField.Input {...props} required class="outline-none border border-black/50 py-3 px-6 rounded-full"/>
                    </TextField>
                }
            </Field>
            
            <Field name="description">
                { ( field, props ) =>
                    <TextField class="flex flex-col gap-1.5 w-full">
                        <TextField.Label class="flex gap-3"> Description* {field.error && <div class="text-red-400">{field.error}</div>} </TextField.Label>
                        <TextField.Input {...props} required class="outline-none border border-black/50 py-3 px-6 rounded-full"/>
                    </TextField>
                }
            </Field>

            <Field name="category">
                { ( field, props ) =>
                    <TextField defaultValue="uncategorized" class="flex flex-col gap-1.5 w-full">
                        <TextField.Label class="flex gap-3"> Category {field.error && <div class="text-red-400">{field.error}</div>} </TextField.Label>
                        <TextField.Input {...props} required class="outline-none border border-black/50 py-3 px-6 rounded-full"/>
                    </TextField>
                }
            </Field>

            <Field name="cover_photo" type="File">
                { ( field, props ) =>
                    <FileField class="flex flex-col gap-1.5"
                        accept="image/*"
                        onFileAccept={data => {
                            setCoverPhoto(data[0])
                            props.onChange?.(data[0] as any)
                        } }
                    >
                        <FileField.Label>Cover Photo</FileField.Label>
                        <FileField.Dropzone class="w-full hover:bg-gray-100/50 flex flex-col justify-center items-center border-dashed border min-h-30 relative">
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 flex flex-col gap-1.5">
                                Drop your files here...
                            </div>
                            <FileField.ItemList class="w-full">
                                {file => (
                                    <FileField.Item  class="w-full">
                                        <FileField.ItemPreviewImage class="w-full object-cover"/>
                                        <div class="absolute flex justify-center items-end top-1/2 -translate-y-1/2 text-6xl font-bold max-w-full min-w-4/5 py-3 rounded left-1/2 -translate-x-1/2 gap-6 bg-white">
                                            <FileField.ItemName />
                                            <FileField.ItemSize class="text-4xl font-medium"/>
                                            <FileField.ItemDeleteTrigger class="text-3xl h-full py-1.6 rounded px-6 bg-red-200">Delete</FileField.ItemDeleteTrigger>
                                        </div>
                                    </FileField.Item>
                                )}
                            </FileField.ItemList>
                        </FileField.Dropzone>
                        <FileField.HiddenInput {...props} name="uploaded-files" />

                    </FileField>
                }
            </Field>

            <RichTextEditor ref={setEditor} classes="mt-3 mb-6"/>

            <Button type="submit" class="w-full bg-black text-white text-3xl py-3 rounded hover:bg-black/75"> Post </Button>

        </Form>

    )

}

export default NewPostForm