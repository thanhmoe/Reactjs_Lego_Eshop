import { Suspense, lazy, useState, useEffect } from "react";
import Aside from "./Aside";
import Footer from "./Footer";
import Header from "./Header";
import './index.css';
import LoadingModal from "../modal/loadingModal";



export default function MainLayout({ children }) {

    const [isOffset, setIsOffset] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    const handleScroll = () => {
        const scrollY = window.scrollY
        if (scrollY > 120) {
            setIsOffset(true)
        } else {
            setIsOffset(false)
        }

    }




    const [isOpen, setOpen] = useState(false)

    return <div className="mainLayout">
        <Suspense fallback={< LoadingModal />}>
            <div className="header"><Header isOpen={isOpen} setOpen={setOpen} /></div>
            <div className={`body ${isOpen ? 'is-shown' : ''}`}>
                <div className={`aside ${(isOffset && isOpen) ? 'is-shown' : ''}`}>{isOpen ? <Aside /> : null} </div>
                <div className={`contentBody ${(isOffset && isOpen) ? 'is-shown' : ''}`}>
                    {children}
                </div>
            </div>
            <div className="footer"><Footer /></div>
        </Suspense>
    </div >
}