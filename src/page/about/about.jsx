import React from "react";
import './about.css'
import { useTranslation } from "react-i18next"
import homeimg from '/public/assets/home.png'


export default function about() {
    const { t } = useTranslation(['common']);
    return <>
        <div className="about-us-container">
            <h1 className="about-us-title">About Us</h1>
            <section>
                <h2 className="slide-in-left">{t('Welcome')}</h2>
                <p className="slide-in-left short-paragraph">Hi, I'm a web developer with a passion for creating interactive and visually appealing websites. This is a sample homepage to demonstrate some basic web development techniques.</p>
            </section>
            <section>
                <img src={homeimg} alt="A beautiful scenery" className="slide-in-right animated-image"></img>
            </section>
        </div>
    </>
}