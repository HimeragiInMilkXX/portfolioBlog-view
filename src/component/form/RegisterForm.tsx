import { createForm, reset, setValues, zodForm } from "@modular-forms/solid";
import { Component, createSignal, For, Setter } from "solid-js";
import { RegisterMForm, RegisterSchema, publicAsset } from "../../exports";
import { TextField } from "@kobalte/core/text-field";
import { Button } from "@kobalte/core/button";
import { register } from "../../utils/auth";

const RegisterForm: Component<{ classes?: string, setForm: ( value: "login" | "register" ) => Setter<"login" | "register"> }> = ({ classes = "", setForm }) => {

    const [ registerForm, { Form, Field } ] = createForm<RegisterMForm>({ validate: zodForm(RegisterSchema)});

    const [ error, setError ] = createSignal<{ email?: string[], username?: string[]}>({})

    const handleSubmit = async ( values: RegisterMForm ) => {

        try {
            const succeed = await register( values )
            console.log( succeed )

            if( succeed ) {
                reset( registerForm, { keepErrors: false, initialValues: { email: "", username: "", password: ""} } )
                setError({})
            }
        } catch( err: any ) {
            setError( err );
            console.log( err );
        }

    }

    return (

        <Form class={`${classes} flex flex-col gap-3 box-border w-full px-3 py-6`} onSubmit={handleSubmit}>

            <section class="flex flex-col gap-3 items-center mb-3">

                <img src={publicAsset("mylogo.svg")} alt="" class="h-30 object-contain aspect-square w-fit" />
                
                <div class="flex flex-col gap-1.5 items-center">

                    <h2 class="text-2xl font-bold text-center"> Welcome to Oscar's Blog </h2>
                    <p class="text-center"> Login to comment, like, save <br/> <span class="text-blue-900 underline cursor-pointer" onClick={() => setForm("login")}>if you already have an account</span> </p>

                </div>

            </section>

            <Field name="email">

                { ( field, props ) =>

                    <TextField class="flex flex-col gap-1.5 w-full">
                        <TextField.Label class="flex gap-3"> Email* {field.error && <div class="text-red-400">{field.error}</div>} </TextField.Label>
                        <TextField.Input value={field.value} placeholder="Enter a email" {...props} required class="outline-none border border-black/50 py-3 px-6 rounded-full"/>
                    </TextField>

                }

            </Field>

            <Field name="username">

                { ( field, props ) =>

                    <TextField class="flex flex-col gap-1.5 w-full">
                        <TextField.Label class="flex gap-3"> Username* {field.error && <div class="text-red-400">{field.error}</div>} </TextField.Label>
                        <TextField.Input value={field.value} placeholder="Give a cool name..." {...props} required class="outline-none border border-black/50 py-3 px-6 rounded-full"/>
                    </TextField>

                }

            </Field>

            <Field name="password">

                { ( field, props ) =>

                    <TextField class="flex flex-col gap-1.5 w-full">
                        <TextField.Label class="flex gap-3"> Password* {field.error && <div class="text-red-400">{field.error}</div>} </TextField.Label>
                        <TextField.Input value={field.value} type="password" placeholder="Enter a password" {...props} required class="outline-none border border-black/50 py-3 px-6 rounded-full"/>
                    </TextField>

                }

            </Field>

            <Button type="submit" class="w-full bg-black text-white text-xl rounded-full hover:bg-black/75 py-3 mt-3"> Register </Button>

            <div class="text-center w-full text-red-400">

                <For each={Object.values(error())}>
                    { (item) => <p> {item[0]} </p> }
                </For>

            </div>

        </Form>

    )

}

export default RegisterForm
