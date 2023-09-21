import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faClapperboard, faGamepad, faHouse, faLightbulb, faMedal, faMusic } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getCategories, getVideos } from "../api/video";

const StyledAside = styled.aside`

    display: none;
    position: fixed;
    background-color: white;
    width: 70px;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
        background-color: #999;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: white;
    }

    &::-webkit-scrollbar {
        width: 8px;
    }

    a {
        display: block;
        text-align: center;
        padding: 10px;
        border-radius: 5px;
        margin: 10px;

        &:hover {
        background-color: #eee;
        }

        p {
            margin-top: 5px;
            font-size: 0.8rem;
        }
    }

    .aside-category, footer {
        display: none;
    }

`;

const MainContent = styled.div`

    &.main-content {
        padding-left: 70px;
    }

    nav  {
        position: fixed;
        background-color: white;
        width: 100%;
        height: 56px;
        z-index: 1;
        padding-left: 15px;

        a {
            background-color: #eee;
            padding: 5px 10px;
            border-radius: 5px;
            line-height: 56px;
            margin: 5px;

            &.active {
                background-color: #000;
                color: white;
            }
        }
    }

    section {
        padding-top: 56px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .video-content {
        display: block;
        width: 100%;
        max-width: 400px;
        margin: 10px;
        margin-top: 20px;

            video {
                border-radius: 15px;
                height: 220px;
                object-fit: cover;
            }

            .video-summary {
                display: flex;
                margin-top: 10px;

                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }

                .video-desc {
                    margin-left: 10px;

                    /* 글자가 너무 많으면 그 뒤로는 줄여 주는 속성 */
                    h3 {
                        line-height: 1.4;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 100%;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }

                    p {
                        font-size: 0.9rem;
                        color: #333;
                        line-height: 1.2;
                    }
                }
            }
        }
    }


`;

const StyledMain = styled.main`
    padding-top: 56px;
    display: flex;

    &.aside-change {
    
        aside {
            width: 70px;

            a {
                flex-direction: column;

                p {
                    font-size: 0.8rem;
                    margin-top: 5px;
                }
            }

            .aside-category {
            display: none;
            }

            footer {
            display: none;
            }
        }

        .main-content {
            padding-left: 70px;
        }

    }
    
    @media screen and (min-width: 927px) {
        aside {
            display: block;
        }
        section {
            justify-content: flex-start;
        }
    }

    @media screen and (min-width: 1350px) {
        aside {
            width: 200px;
        }

        aside a {
            display: flex;
        }

        aside a svg {
            width: 30px;
            margin-right: 20px;
        }

        aside a p {
            margin-top: 0;
            font-size: 1rem;
        }

        .main-content {
            padding-left: 200px;
        }

        .aside-category {
            display: block;
        }

        .aside-category h2 {
            margin: 22px 22px 0;
        }

        footer {
            display: block;
            margin: 22px;
        }

        .video-content {
            max-width: 390px;
        }
    
    }
    
`;

const Home = () => {

    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([]);

    const categoryAPI = async () => {
        const result = await getCategories();
        setCategories(result.data);
    }

    const videoAPI = async () => {
        const videoResult = await getVideos();
        setVideos(videoResult.data);
    }

    useEffect(() => {
        categoryAPI();
        videoAPI();
        /*
        fetch("http://localhost:8080/api/category").then((response) => response.json()).then((json) => {
            setCategories(json);
        })
        */
    }, []);

    return (
    <StyledMain>
        <StyledAside>
            <div className="aside-top">
                <a href="#">
                    <FontAwesomeIcon icon={faHouse} />
                    <p>홈</p>
                </a>
                <a href="#">
                    <FontAwesomeIcon icon={faFolder} />
                    <p>구독</p>
                </a>
            </div>
            <div className="aside-category">
                <h2>탐색</h2>
                {categories.map((category) => (
                    <a href="#" key={category.categoryCode}>
                    {category.categoryCode === 1 ? (<FontAwesomeIcon icon={faBagShopping} />) : category.categoryCode === 2 ? (<FontAwesomeIcon icon={faMusic} />) : category.categoryCode === 3 ? (<FontAwesomeIcon icon={faClapperboard} />) : category.categoryCode === 4 ? (<FontAwesomeIcon icon={faGamepad} />) : category.categoryCode === 5 ? (<FontAwesomeIcon icon={faMedal} />) : category.categoryCode === 6 ? (<FontAwesomeIcon icon={faLightbulb} />) : null}
                    <p>{category.categoryName}</p>
                </a>
                ))}
            </div>
            <footer>
                개인정보처리방침
            </footer>
        </StyledAside>
        <MainContent className="main-content">
            <nav>
                <a href="#" className="active">전체</a>
                {categories.map((item) => (
                    <a key={item.categoryCode} href="#">{item.categoryName}</a>
                ))}
            </nav>
            <section>
                {videos.map((video) => (
                    <a href="#" className="video-content" key={video.videoCode}>
                        <video width="100%" poster={"/upload/" + video.videoPhoto} autoPlay loop controls>
                            <source src={"/upload/" + video.videoUrl} type="video/mp4"/>
                        </video>
                        <div className="video-summary">
                        <img src={"/upload/" + video.channel.channelPhoto} alt="채널이미지" />
                        <div className="video-desc">
                            <h3>{video.videoTitle}</h3>
                            <p>{video.channel.channelName}</p>
                            <p>
                                조회수 <span>{video.videoViews}</span>회ㆍ
                                <span>1일</span> 전
                            </p>
                        </div>
                    </div>
                    </a>
                ))}
                {/*
                <a href="#" className="video-content">
                    <video width="100%" poster="./resources/thumbnail.jpg" autoplay loop controls>
                        <source src="./resources/video (1).mp4" type="video/mp4" />
                    </video>
                    <div className="video-summary">
                        <img src="./resources/thumbnail.jpg" alt="채널이미지" />
                        <div className="video-desc">
                            <h3>"한국 사람들은 소풍가서 이렇게 먹어?! 캐나다에서 김밥 팔자는 엄마.." 김밥에 라면 처음 먹어본 캐나다 가족 반응! 라면 국물에 김밥 찍어먹더니.. 외국인 김밥먹방 [국제커플]</h3>
                            <p>tvN</p>
                            <p>
                                조회수 <span>9.1만</span>회ㆍ
                                <span>1일</span> 전
                            </p>
                        </div>
                    </div>
                </a>
                <a href="#" className="video-content">
                    <video width="100%" poster="./resources/thumbnail.jpg" autoplay loop controls>
                        <source src="./resources/video (1).mp4" type="video/mp4" />
                    </video>
                    <div className="video-summary">
                        <img src="./resources/thumbnail.jpg" alt="채널이미지" />
                        <div className="video-desc">
                            <h3>부산 촌놈 마지막화...!</h3>
                            <p>tvN</p>
                            <p>
                                조회수 <span>9.1만</span>회ㆍ
                                <span>1일</span> 전
                            </p>
                        </div>
                    </div>
                </a>
                <a href="#" className="video-content">
                    <video width="100%" poster="./resources/thumbnail.jpg" autoplay loop controls>
                        <source src="./resources/video (1).mp4" type="video/mp4" />
                    </video>
                    <div className="video-summary">
                        <img src="./resources/thumbnail.jpg" alt="채널이미지" />
                        <div className="video-desc">
                            <h3>부산 촌놈 마지막화...!</h3>
                            <p>tvN</p>
                            <p>
                                조회수 <span>9.1만</span>회ㆍ
                                <span>1일</span> 전
                            </p>
                        </div>
                    </div>
                </a>
                <a href="#" className="video-content">
                    <video width="100%" poster="./resources/thumbnail.jpg" autoplay loop controls>
                        <source src="./resources/video (1).mp4" type="video/mp4" />
                    </video>
                    <div className="video-summary">
                        <img src="./resources/thumbnail.jpg" alt="채널이미지" />
                        <div className="video-desc">
                            <h3>부산 촌놈 마지막화...!</h3>
                            <p>tvN</p>
                            <p>
                                조회수 <span>9.1만</span>회ㆍ
                                <span>1일</span> 전
                            </p>
                        </div>
                    </div>
                </a>
                <a href="#" className="video-content">
                    <video width="100%" poster="./resources/thumbnail.jpg" autoplay loop controls>
                        <source src="./resources/video (1).mp4" type="video/mp4" />
                    </video>
                    <div className="video-summary">
                        <img src="./resources/thumbnail.jpg" alt="채널이미지" />
                        <div className="video-desc">
                            <h3>부산 촌놈 마지막화...!</h3>
                            <p>tvN</p>
                            <p>
                                조회수 <span>9.1만</span>회ㆍ
                                <span>1일</span> 전
                            </p>
                        </div>
                    </div>
                </a>
                */}
            </section>
        </MainContent>
    </StyledMain>
    );
};

export default Home;