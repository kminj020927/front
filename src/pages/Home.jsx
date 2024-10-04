import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import Slider from 'react-slick';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import "./Home.scss";
import WeatherInfo from '../components/weather/weather';

const Home = () => {
    const navigate = useNavigate(); 
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };
    
    const goToPostForm = () => {
        navigate('/post');
    };
    
    const [posts, setPosts] = useState([]);  // 게시글 목록

    const getPosts = async () => {
        try {
            const response = await axios.get('/post/postList'); // 전체 게시글 불러오기
            const data = response.data; // 전체 데이터 가져오기
            setPosts(data.slice(0, 7));  // 최대 7개만 저장
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <Header />
            <div className='container'>
                <div className="home-slider">
                    <Slider {...settings}>
                        <div className="slide">
                            <div className="home-wrapper">
                                <div className="home-title">
                                    <span>가보자Go</span>에 오신걸 환영합니다
                                </div>
                                <div className="home-contents">
                                    자유롭게 게시판에 글을 작성하고📝<br/>
                                     댓글로 여러 의견을 나눠보세요✏️
                                </div>
                                <button className="write-post-btn" onClick={goToPostForm}>
                                    게시글 작성하기
                                </button>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="home-wrapper">
                                <h2>다양한 기능을 활용해보세요</h2>
                                <p>다양한 정보를 지도에서 확인하고 공유해보세요.</p>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="home-wrapper">
                                <h2>커뮤니티에 참여하세요</h2>
                                <p>관심 있는 주제에 대해 다른 사용자들과 의견을 나눠보세요.</p>
                            </div>
                        </div>
                    </Slider>
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
