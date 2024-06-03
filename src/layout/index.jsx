import { Suspense, lazy, useState } from "react";
import Aside from "./Aside";
import Footer from "./Footer";
import Header from "./Header";
import './index.css';




export default function MainLayout({ children }) {
    const [isOpen, setOpen] = useState(true)
    return <div className="mainLayout">
        <Suspense fallback={<h2>loading</h2>}>
            <div className="header"><Header isOpen={isOpen} setOpen={setOpen} /></div>
            <div className="body">
                {isOpen ? <Aside /> : null}
                <div className="contentBody">
                    {children}
                </div>
            </div>
            <div className="footer"><Footer /></div>
        </Suspense>
    </div>
}