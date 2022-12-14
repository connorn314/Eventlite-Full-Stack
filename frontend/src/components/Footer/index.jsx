import React from "react";
import github from '../../icons8-github-90.png'
import linkedin from '../../icons8-linkedin-circled-100.png'
import './Footer.css'

const Footer = () => {
    return (
            <div id="footer-container">
                <div id="top-level-footer-container">
                    <div id="technologies-list">
                        <div className="tech-title">Technologies Used</div>
                        <div className="tech-bullet">HTML5/CSS</div>
                        <div className="tech-bullet">React.js</div>
                        <div className="tech-bullet">Ruby On Rails</div>
                        <div className="tech-bullet">Postgresql DB</div>
                    </div>
                    <div id="other-projects">
                        <div className="tech-title">Other Projects</div>
                        <div className="tech-bullet" id="keywi"><a href="https://keywi.onrender.com" target="_blank" id="keywi">Keywi</a></div>
                        <div className="tech-bullet" id="blockwheels"><a href="https://connorn314.github.io/BlockWheels/" target="_blank" id="blockwheels">BlockWheels</a></div>
                    </div>
                </div>
                <div id="bottom-level-footer-container">
                    <div id="github-link"><a href="https://github.com/connorn314" target="_blank"><img src={github} alt="needed" id="actual-github-link"/></a></div>
                    <div id="linked-in-link"><a href="https://www.linkedin.com/in/connor-norton-318b0a19a/" target="_blank"><img src={linkedin} alt="needed" id="actual-linked-in-link"/></a></div>
                    {/* <div id="personal-website-link">Personal Website</div> */}
                </div>

            </div>
    )
}

export default Footer