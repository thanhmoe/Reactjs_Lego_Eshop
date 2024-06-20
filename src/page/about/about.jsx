import React from "react";
import './about.css'
import thanh from '/public/assets/thanh.png';
import minh from '/public/assets/minh.jpeg';
import kienimg from '/public/assets/kien.png';

export default function about() {
    return <>
        <div className="about-us-container">
            <h1 className="about-us-title">About Us</h1>
            <p className="about-us-description">
                Welcome to our company. We are committed to delivering top-notch services and products to our customers. Our team is dedicated to innovation and excellence.
            </p>
            <div className="about-us-team">
                <div className="team-member">
                    <img src={thanh} alt="Team Member 1" />
                    <h3>Thanh.NC</h3>
                    <p>CEO</p>
                    <p>John has over 20 years of experience in the industry and is the driving force behind our company's vision and strategy.</p>
                </div>
                <div className="team-member">
                    <img src={kienimg} alt="Team Member 2" />
                    <h3>KienPT</h3>
                    <p>CTO</p>
                    <p>Jane is a tech enthusiast with a passion for innovation and cutting-edge technologies, leading our technical team to success.</p>
                </div>
            </div>
            <h1>Mentor</h1>
            <div className="about-us-mentors">
                <div>
                </div>
                <div className="mentor-member">
                    <img src={minh} alt="Mentor 1" />
                    <h3>Mentor 1</h3>
                    <p>MinhLH</p>
                    <p>John has been mentoring startups for over a decade, helping them to scale and achieve their full potential.</p>
                </div>
                <div className="mentor-member">
                    <img src="/path/to/mentor2.jpg" alt="Mentor 2" />
                    <h3>Mentor 2</h3>
                    <p>GiangLN</p>
                    <p>Jane is an expert in business development and has a track record of guiding companies to market leadership.</p>
                </div>
            </div>
        </div>
    </>
}