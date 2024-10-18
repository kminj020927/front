import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as auth from "../api/auth";
import Header from "../components/Header/Header";
import WeatherInfo from "../components/weather/weather";
import { CiCalendar } from "react-icons/ci";
import { LuSubtitles } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LoginContext } from "../contexts/LoginContextProvider";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const [domesticDestinations, setDomesticDestinations] = useState([]);
  const [internationalDestinations, setInternationalDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLogin, userInfo, logout } = useContext(LoginContext);
  const [homeProfileImage, setHomeProfileImage] = useState(null);

  const goToPostForm = () => {
    navigate("/post");
  };

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("/post/postList");
      setPosts(response.data.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const fetchDomesticDestinations = () => {
    setLoading(true);
    setError(null);

    axios
      .get("/api/travel/top10/domestic")
      .then((response) => {
        setDomesticDestinations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching domestic travel destinations:", error);
        setError("국내 여행지 정보를 가져오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchInternationalDestinations = () => {
    setLoading(true);
    setError(null);

    axios
      .get("/api/travel/top10/international")
      .then((response) => {
        setInternationalDestinations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching international travel destinations:", error);
        setError("해외 여행지 정보를 가져오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchHomeProfileImage = async (username) => {
    try {
      const response = await auth.getImage(username);
      setHomeProfileImage(response.data.url);
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

  useEffect(() => {
    fetchDomesticDestinations();
    fetchInternationalDestinations();
  }, []);

  useEffect(() => {
    if (userInfo?.username) {
      fetchHomeProfileImage(userInfo.username);
    }
  }, [userInfo]);

  useEffect(() => {
    getPosts();
  }, []);

  // 여행지 클릭 시 자유게시판으로 이동하며 나라 이름 쿼리 전달
  const handleCountryClick = (countryName) => {
    navigate(`/post?country=${encodeURIComponent(countryName)}`);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="home-wrapper">
          <div className="home-title">
            <span>가보자Go</span>에 오신걸 환영합니다
          </div>
          <div className="home-contents">
            저희 가보자Go는 여행자들을 위한 커뮤니티 사이트입니다
          </div>

          <button className="write-post-btn" onClick={goToPostForm}>
            가보자Go
          </button>
        </div>

        <div className="layout-container">
          <div className="home-container">
            <h3>최근 동행 게시글</h3>
            <hr />
            <div className="post-card-container">
              {posts.length === 0 ? (
                <div>게시글이 없습니다.</div>
              ) : (
                posts.map((post) => (
                  <div className="post-card" key={post.id}>
                    <Link to={`/postInfo/${post.id}`}>
                      <div className="post-card-content">
                        <div className="post-card-title">
                          <LuSubtitles className="icon" /> {post.title}
                        </div>
                        <div className="post-card-period">
                          <span>
                            <CiCalendar className="icon" /> {post.startDate} ~ {post.endDate}
                          </span>
                        </div>
                        <div className="post-card-details">
                          <div>
                            {new Date(post.createdDate).toLocaleDateString()} {post.writer}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="home-login-form">
            {isLogin ? (
              <div className="login-wrapper">
                <div className="info">
                  <div className="Profile">
                    {homeProfileImage ? (
                      <img src={homeProfileImage} alt="Profile" className="HomeProfileImage" />
                    ) : (
                      <p>프로필 이미지를 불러올 수 없습니다.</p>
                    )}
                  </div>
                  <div className="userInfo">
                    <p className="username">{userInfo.username}</p>
                    <p className="email">{userInfo.email}</p>
                  </div>
                </div>
                <button className="logout-button" onClick={() => logout()}>
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="non-login-wrapper">
                <p className="info-text">가보자GO의 기능을 편리하게 이용해보세요</p>
                <Link to="/login">
                  <button className="login">가보자GO 로그인</button>
                </Link>
                <p className="signup-text">
                  아직 회원이 아니신가요? <a href="/join">회원가입</a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="home-container2">
          <div className="place-container">
            {/* 국내 여행지 */}
            <div className="top10">
              <h3>국내 인기 여행지 TOP 10</h3>
              <hr />
              <ul>
                {domesticDestinations.map((destination, index) => (
                  <li key={index} onClick={() => handleCountryClick(destination.searchWord)}>
                    <p>
                      <HiOutlineLocationMarker /> {destination.searchWord} - {destination.areaOrCountryName}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* 해외 여행지 */}
            <div className="top10">
              <h3>해외 인기 여행지 TOP 10</h3>
              <hr />
              <ul>
                {internationalDestinations.map((destination, index) => (
                  <li key={index} onClick={() => handleCountryClick(destination.searchWord)}>
                    <p>
                      <HiOutlineLocationMarker /> {destination.searchWord} - {destination.areaOrCountryName}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="weather">
            <WeatherInfo className="weather-info" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
