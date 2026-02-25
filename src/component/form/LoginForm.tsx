import { createForm, zodForm } from "@modular-forms/solid";
import { Component, Setter } from "solid-js";
import { LoginMForm, LoginSchema } from "../../exports";
import { TextField } from "@kobalte/core/text-field";
import { Button } from "@kobalte/core/button";
import { login } from "../../utils/auth";

const LoginForm: Component<{ classes?: string, setForm: ( value: "login" | "register" ) => Setter<"login" | "register"> }> = ({ classes = "", setForm }) => {

    const [ loginForm, { Form, Field } ] = createForm<LoginMForm>({ validate: zodForm(LoginSchema)});

    const handleSubmit = async ( values: LoginMForm ) => {

        try {
            const succeed = await login( values )
            console.log( succeed )
        } catch( err: any ) {
            console.error( err );
        }

    }

    return (

        <Form class={`${classes} flex flex-col gap-3 box-border w-full px-3 py-6`} onSubmit={handleSubmit}>

            <section class="flex flex-col gap-3 items-center mb-3">

                <img src="/mylogo.svg" alt="" class="h-30 object-contain aspect-square w-fit" />
                
                <div class="flex flex-col gap-1.5 items-center">

                    <h2 class="text-2xl font-bold text-center"> Welcome to Oscar's Blog </h2>
                    <p class="text-center"> You need an account to comment, like, save <br/> <span class="text-blue-900 underline cursor-pointer" onClick={() => setForm("register")}>if you don't already have an account</span> </p>

                </div>

            </section>

            <Field name="email">

                { ( field, props ) =>

                    <TextField class="flex flex-col gap-1.5 w-full">
                        <TextField.Label class="flex gap-3"> Email* {field.error && <div class="text-red-400">{field.error}</div>} </TextField.Label>
                        <TextField.Input placeholder="Enter a email" {...props} required class="outline-none border border-black/50 py-3 px-6 rounded-full"/>
                    </TextField>

                }

            </Field>

            <Field name="password">

                { ( field, props ) =>

                    <TextField class="flex flex-col gap-1.5 w-full">
                        <TextField.Label class="flex gap-3"> Password* {field.error && <div class="text-red-400">{field.error}</div>} </TextField.Label>
                        <TextField.Input type="password" placeholder="Enter a password" {...props} required class="outline-none border border-black/50 py-3 px-6 rounded-full"/>
                    </TextField>

                }

            </Field>

            <Button type="submit" class="w-full bg-black text-white text-xl rounded-full hover:bg-black/75 py-3 mt-3"> Login </Button>

        </Form>

    )

}

export default LoginForm