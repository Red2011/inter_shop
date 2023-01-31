import {FC, ReactNode} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type layoutprops = {
    children:ReactNode
}

 const Layout:FC<layoutprops> = ({children}) => (
    <>
        <div className="bg-gradient-to-bl from-green-300 to-fuchsia-600 fixed top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover z-[-1]"></div>
        <div className="min-h-screen m-0 flex flex-col ">
            <Navbar/>
                <main className="flex-auto ">{children}</main>
            <Footer/>
        </div>
    </>

);

export default Layout;
