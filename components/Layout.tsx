import {FC, ReactNode} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type layoutprops = {
    children:ReactNode
}

 const Layout:FC<layoutprops> = ({children}) => (
    <>
        <div className="min-h-screen flex flex-col">
            <Navbar/>
                <main className="flex-auto">{children}</main>
            <Footer/>
        </div>
    </>

);

export default Layout;
