
import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

import Header from '../components/Header/Header';
import WeatherInfo from '../components/weather/weather';
import "./Home.scss";

const Home = () => {
    const navigate = useNavigate(); 
    
    const goToWeatherPage = () => {
        navigate('/weather');  // Navigate to the weather page
    };

    const goToPostForm = () => {
        navigate('/post');
    };
    
    const [posts, setPosts] = useState([]);  // 게시글 목록
    const [regionWeather, setRegionWeather] = useState([]);  // Important regions' weather

    const getPosts = async () => {
        try {
            const response = await axios.get('/post/postList');
            const data = response.data;
            setPosts(data.slice(0, 7));  // 최대 7개만 저장
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const getRegionWeather = async () => {
        try {
            const response1 = await axios.get('/api/weather?regionId=1');  // Region 1
            const response2 = await axios.get('/api/weather?regionId=2');  // Region 2
            setRegionWeather([response1.data.weather, response2.data.weather]);
        } catch (error) {
            console.error('Failed to fetch region weather:', error);
        }
    };

    useEffect(() => {
        getPosts();
        getRegionWeather();
    }, []);

    return (
        <>
            <Header />
            <div className='container'>
                <div className="home-wrapper">
                    <div className="home-title">
                        <span>가보자Go</span>에 오신걸 환영합니다
                    </div>
                    <div className="home-contents">
                    저희 가보자Go는 여행자들을 위한  커뮤니티 사이트입니다<br/><br/>
                    국내, 해외 모든 여행자들에게  필요하고,<br/> 
                    부족한 여행 정보들을 제공하고 있습니다.<br/>
                    새롭고 다양한 사람들과 소통하고 <br/>
                    동행할 수 있습니다<br/>
                    <br/>
                    여러분의 재미있는 여행 이야기를 들려주세요<br/>

                    </div>
                    <button className="write-post-btn" onClick={goToPostForm}>
                        가보자Go
                    </button>
                </div>
                
                <div className='layout-container'>
                    <WeatherInfo className="weather-info" />
                    <div className='home-container'>
                        <h2>최근 게시글</h2><br/>
                        <hr/>
                        {posts.length === 0 ? (
                            <div>게시글이 없습니다.</div>
                        ) : (
                            posts.map((post,index) => (
                                <div key={post.id}>
                                    <Link to={`/postInfo/${post.id}`}>
                                        <span className="post-index">{index + 1}. {post.title}</span>
                                        <div className="post-details">
                                            <span>작성자 : {post.writer}</span>
                                            <span>{new Date(post.createdDate).toLocaleDateString()}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
