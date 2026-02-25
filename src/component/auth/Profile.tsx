import { Component, createEffect, createSignal, on } from "solid-js";
import { logout, updateProfile } from "../../utils/auth";
import { Button } from "@kobalte/core/button";
import { constructUrlToImage, ProfileMForm, ProfileSchema } from "../../exports";
import { authState } from "../../states";
import { Plus, LogOut } from "lucide-solid";
import { FileField } from "@kobalte/core/file-field";
import { createForm, setValue, setValues, zodForm } from "@modular-forms/solid";
import { TextField } from "@kobalte/core/text-field";
import { trackStore } from "@solid-primitives/deep"

const Profile: Component<{ classes?: string }> = ({ classes }) => {

    const handleLogout = async () => {

        try {
            const succeed = await logout()
            console.log( succeed )
        } catch( err: any ) {
            console.error( err );
        }

    }

    const [ profileForm, { Form, Field } ] = createForm<ProfileMForm>({ validate: zodForm(ProfileSchema)});

    const handleSubmit = async ( values: ProfileMForm ) => {

        console.log(file())

        try {
            const succeed = await updateProfile( values, file() )
            console.log( succeed )
        } catch( err: any ) {
            console.error( err );
        }

        setEditing(false)

    }

    const [ file, setFile ] = createSignal<File>();
    const [ editing, setEditing ] = createSignal<boolean>(false);

    createEffect(

        on( editing, () => {

            setValue( profileForm, "email", authState.user.email)
            setValue( profileForm, "username", authState.user.username )

        })

    )

    createEffect( () => {

        trackStore(authState);

        setValue( profileForm, "email", authState.user.email)
        setValue( profileForm, "username", authState.user.username )

    })

    return (

        <section class={`${classes} max-sm:flex-col flex gap-6 box-border w-full px-3 py-3 items-stretch`}>

            <FileField
                accept="image/png, image/jpeg, image/jpg"
                onFileAccept={(data) => setFile(data[0])}
                class="rounded-full overflow-hidden select-none"
                classList={{ "pointer-events-none": !editing() }}
            >
                <FileField.Dropzone class="relative hover:[&>.hover]:opacity-100">
                    <img src={constructUrlToImage(`/media/${authState.user?.avatar}`)} alt="" class={`${file() && 'opacity-0'} aspect-square object-cover sm:h-52`}/>
                    <FileField.ItemList class="absolute inset-0 h-full">
                        {(file) => (
                            <FileField.ItemPreviewImage class="h-full object-cover aspect-square"/>
                        )}
                    </FileField.ItemList>
                    <div class="hover opacity-0 transition-all bg-black/60 text-white/70 text-2xl font-medium flex absolute inset-0 justify-center items-center z-2"> <Plus/> Upload </div>
                </FileField.Dropzone>
                <FileField.HiddenInput />
            </FileField>

            <div class="flex flex-col gap-3 grow justify-between">

                <h2 class="text-3xl font-medium w-full flex justify-between items-center"> Profile <LogOut class="stroke-red-500 hover:stroke-red-800" onClick={handleLogout}/></h2>

                <Form class="flex flex-col gap-3 box-border w-full ml-0.5"  onSubmit={(e) => {
                        console.log("submitted");
                        handleSubmit(e);
                    }}>

                    <Field name="email">

                        { ( field, props ) =>

                            <TextField class="flex flex-col w-full" disabled={!editing()}>
                                <TextField.Label class="flex leading-none gap-3"> Email {field.error && <div class="text-red-400 text-xs">{field.error}</div>} </TextField.Label>
                                <TextField.Input value={field.value} placeholder="Enter a email" {...props} required class="outline-none py-1.5 border-b border-black/50 w-full"/>
                            </TextField>

                        }

                    </Field>

                    <Field name="username">

                        { ( field, props ) =>

                            <TextField class="flex flex-col w-full" disabled={!editing()}>
                                <TextField.Label class="flex leading-none gap-3"> Username {field.error && <div class="text-red-400 text-xs">{field.error}</div>} </TextField.Label>
                                <TextField.Input value={field.value} type="text" placeholder="Enter a username" {...props} required class="outline-none py-1.5 border-b border-black/50 w-full"/>
                            </TextField>

                        }

                    </Field>

                    <div class="flex gap-3 items-center grow">

                        <Button type="button" class="w-full bg-black rounded text-white h-full hover:bg-black/75 py-0.5 transition-all" classList={{ hidden: editing() }} onClick={() => setEditing(true)}> Edit </Button>
                        <Button type="button" class="w-full bg-red-300 rounded text-white h-full hover:bg-red-400 border border-red-400 py-0.5 transition-all " classList={{ hidden: !editing() }} onClick={() => setEditing(false)}> Cancel </Button>

                        <button type="submit" class="w-full bg-green-300 rounded h-full hover:bg-green-400 border border-green-400 py-0.5 transition-all disabled:pointer-events-none disabled:opacity-30" disabled={!editing()}> Save </button>

                    </div>

                </Form>
            </div>

        </section>

    )

}

export default Profile