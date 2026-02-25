import { ParentComponent } from "solid-js"
import Header from "../component/nav/Header"
import Footer from "../component/nav/Footer"

const DefaultLayout: ParentComponent = ( { children } ) => {

    return (

        <>
        
            <Header/>
            <main class="w-full relative">{children}</main>
            <Footer/>

        </>

    )

}

export default DefaultLayout