import {FC, ReactNode} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type layoutprops = {
    children:ReactNode
}

 const Layout:FC<layoutprops> = ({children}) => (
    <>
        <div className="min-h-screen m-0 flex flex-col bg-gradient-to-bl from-green-300 to-fuchsia-600">
            <Navbar/>
                <main className="flex-auto ">{children}</main>
            <Footer/>
        </div>
    </>

);

export default Layout;
