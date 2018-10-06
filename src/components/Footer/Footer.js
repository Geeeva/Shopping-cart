import React from 'react';
import './Footer.css';

const footer = (props) => {
    return (
        <div className="footer-wrapper">
            <div className="bg-wrapper">
                <svg id="footer-bg"  viewBox="0 0 1918 273">
                    <path fill="#E4F5F9" d="M0,3.3c0,0,737.9,53,983.3,53S1918,2.9,1918,2.9V273H0L0,3.3z"/>
                </svg>
                <svg id="footer-bg-xl"  viewBox="0 0 1229 385">
                    <path fill="#E4F5F9" d="M0,115.3c0,0,472.8,53,630.1,53s598.9-53.4,598.9-53.4V385H0L0,115.3z"/>
                </svg>

                <svg id="footer-bg-md" viewBox="0 0 1075 375">
                    <path fill="#E4F5F9" d="M0,115.3c0,0,413.6,53,551.1,53s523.8-53.4,523.8-53.4V385H0L0,115.3z"/>
                </svg>

                <svg id="footer-bg-sm" viewBox="0 129 676 302">
                    <path fill="#E4F5F9" d="M0,161c0,0,260.1,53.5,346.6,53.5S676,160.5,676,160.5v273H0V161z"/>
                </svg>

                <svg id="footer-bg-xs" viewBox="0 234 600 261.5">
                    <path fill="#E4F5F9" d="M0,260.7c0,0,230,36,306.6,36s291.4-36,291.4-36v234.9H0V260.7z"/>
                </svg>
                <div className="social-footer">
                    <div className="social">
                        <div className="intro">You can follow me on my Social networks accounts:</div>
                        <figure>
                            <a href="https://github.com/Geeeva" target="_blank" rel="noopener noreferrer">
                                <div className="frame">
                                   <svg id="github" viewBox="128 -13.5 340.5 339.5">
                                        <circle className="circle" fill="#CFD8DC" cx="300" cy="155" r="168.5"/>
                                        <circle className="circle-bg" fill="#CFD8DC" cx="300" cy="155" r="168.5"/>
                                        <path className="octocat" fill="#070000" d="M244.3,313.9c8.9,1,12.1-3.2,12.1-8.9c0-4.4,0-15.5,0-29.8C209.1,285.1,199,252,199,252
                                            c-7.7-19.9-18.8-25.4-18.8-25.4c-15.5-11.1,1-9.9,1-9.9c17.7,1,26.4,17.7,26.4,17.7c15.5,26.4,39.7,18.8,49.6,14.3
                                            c1-11.1,5.5-18.8,11.1-23.2c-37.5-4.4-77.2-18.8-77.2-84.9c0-18.8,6.6-34.3,17.7-46.4c-2.2-4.4-7.7-22,2.2-45.2
                                            c0,0,14.3-4.4,47.4,17.7c13.3-3.2,28.6-5.5,43-5.5c14.3,0,28.6,2.2,43,5.5C378,44.6,391.1,49,391.1,49c8.9,24.2,3.2,40.7,2.2,45.2
                                            c11.1,12.1,17.7,27.6,17.7,46.4c0,66.1-39.7,80.5-78.4,84.9c6.6,5.5,11.1,15.5,11.1,32c0,23.2,0,41.9,0,47.4c0,4.4,3.2,9.9,12.1,8.9
                                            C327.5,326,285.4,327.7,244.3,313.9z"/>
                                    </svg>
                                </div>
                            </a>
                
                            <a href="https://www.linkedin.com/in/ivana-gili%C4%87-04620850" target="_blank" rel="noopener noreferrer" >
                                <div className="frame">
                                    <svg id="linkedin" viewBox="130.3 -19.7 339 339">
                                        <circle className="circle" fill="#CFD8DC" cx="300" cy="150" r="168.5"/>
                                        <circle className="circle-bg" fill="#CFD8DC"  cx="300" cy="150" r="168.5"/>
                                        <g>
                                            <path className="linkedin-sign" d="M241.2,244.5h-44.4V100.8h44.4C241.2,100.8,241.2,244.5,241.2,244.5z M218.6,82.5c-16.2,0-24-7.1-24-21.9
                                                c0-6.3,2.1-11.3,7-15.4c5-5,10.5-7.1,17-7.1c16.2,0,24,7.8,24,21.9C242.6,74.7,234.8,82.5,218.6,82.5L218.6,82.5z M405.3,244.5
                                                h-45.1v-80.4c0-21.1-7.1-31.6-21.9-31.6c-11.3,0-19,5.7-23.3,17.5c-1.3,2.1-2.1,5.7-2.1,11.3v83.3h-45v-97.9
                                                c0-21.9,0-37.4-0.8-45.8h38.1l2.9,19c9.9-15.5,24.6-23.3,45.1-23.3c15.5,0,27.5,5.7,37.3,16.2c9.9,10.5,14.1,26.1,14.1,46.5v85.2
                                                H405.3z"/>
                                        </g>
                                        </svg>
                                </div>  
                            </a> 
                        </figure>
                        <div className="email">
                            <a href="mailto:ivana.gilich@gmail.com">or email me here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default footer;