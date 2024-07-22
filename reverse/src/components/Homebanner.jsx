//홈 배너 이미지 슬라이더 컴포넌트//
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import homeImg1 from "../img/homeImg1.jpg";
import homeImg2 from "../img/homeImg2.jpg";
import homeImg3 from "../img/homeImg3.jpg";

//이미지 슬라이더 우클릭 화살표 컴포넌트
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", width: "50px", height: "40px", lineHeight: "40px", textAlign: "center", right: "10px", zIndex: 3 }}
            onClick={onClick}
        ></div>
    );
}

export default class Homebanner extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            arrows: true
        };
        return (
           
            <div style={{ overflow: 'hidden' }}>
                <style jsx>{`
                    .container {
                        position: relative;
                        height: 3rem;
                    }

                    .slick-slide {
                        position: relative;
                    }

                    .slick-slide img {
                        object-fit: cover;
                        width: 100vw; 
                        height: 46rem;
                        filter: brightness(50%);
                    }

                    .slick-dots {
                        position: absolute;
                        top: 16.3rem;
                        left: 2.5rem;
                        display: flex !important;
                        z-index: 2;
                    }

                    .slick-dots li button:before {
                        font-size: 1rem;
                        color: white;
                    }

                    .slick-dots li.slick-active button:before {
                        color: white;
                    }

                    .overlay-text {
                        position: absolute;
                        top: 9rem;
                        left: 2rem;
                        z-index: 1;
                        color: white;
                        text-align: center;
                        font-size: 2.5rem;
                        font-style: bold;
                        font-family: inherit;
                    }

                    .overlay-text2 {
                        position: absolute;
                        top: 13rem;
                        left: 2.8rem;
                        z-index: 1;
                        color: white;
                        text-align: center;
                        font-size: 1.5rem;
                        font-style: bold;
                        font-family: inherit;
                    }
                    .line {
                        position: absolute;
                        top: 15.5rem;
                        left: 2.1rem;
                        width: 60%;
                        height: 1.5px;
                        background: white;
                        z-index: 1;
                    }

                    .scroll-indicator {
                        position: absolute;
                        bottom: 2rem;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 1;
                        color: white;
                        text-align: center;
                        font-size: 1rem;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding-top: 60px;
                    }

                    .scroll-indicator span {
                        position: absolute;
                        top: 0;
                        left: 50%;
                        width: 30px;
                        height: 50px;
                        margin-left: -15px;
                        border: 2px solid #fff;
                        border-radius: 50px;
                        box-sizing: border-box;
                    }

                    .scroll-indicator span::before {
                        position: absolute;
                        top: 10px;
                        left: 50%;
                        content: '';
                        width: 6px;
                        height: 6px;
                        margin-left: -3px;
                        background-color: #fff;
                        border-radius: 100%;
                        -webkit-animation: sdb 2s infinite;
                        animation: sdb 2s infinite;
                        box-sizing: border-box;
                    }

                    @-webkit-keyframes sdb {
                        0% {
                            -webkit-transform: translate(0, 0);
                            opacity: 0;
                        }
                        40% {
                            opacity: 1;
                        }
                        80% {
                            -webkit-transform: translate(0, 20px);
                            opacity: 0;
                        }
                        100% {
                            opacity: 0;
                        }
                    }
                    @keyframes sdb {
                        0% {
                            transform: translate(0, 0);
                            opacity: 0;
                        }
                        40% {
                            opacity: 1;
                        }
                        80% {
                            transform: translate(0, 20px);
                            opacity: 0;
                        }
                        100% {
                            opacity: 0;
                        }
                    }
                    
                `}</style>
                <Slider {...settings}>
                    <div>
                        <img src={homeImg1} alt="homeImg1" />
                        <div className="overlay-text">전문가와 상담</div>
                        <div className="overlay-text2">해당 서비스는 프리미엄 서비스입니다</div>
                        <div className="line"></div>
                        <div className="scroll-indicator">
                            <span></span>
                            scroll
                        </div>
                    </div>
                    <div>
                        <img src={homeImg2} alt="homeImg2" />
                        <div className="overlay-text">하루 10분 명상하기</div>
                        <div className="overlay-text2">명상을 통한 새로운 시작을 함께해요</div>
                        <div className="line"></div>
                        <div className="scroll-indicator">
                            <span></span>
                            scroll
                        </div>
                    </div>
                    <div>
                        <img src={homeImg3} alt="homeImg3" />
                        <div className="overlay-text">자립지원 프로그램</div>
                        <div className="overlay-text2">성공적인 자립을 준비해보세요</div>
                        <div className="line"></div>
                        <div className="scroll-indicator">
                            <span></span>
                            scroll
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}
