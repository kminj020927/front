import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from "react-icons/bs";
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../api/auth';
import './Post.css';
import Header from '../components/Header/Header';

const Post = () => {
    const navigate = useNavigate(); 
    const [postList, setPostList] = useState([]); 
    const [userInfo, setUserInfo] = useState();
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 8;

    const getPostList = async () => {
        try {
            const response = await auth.postList();  
            const data = response.data;
            setPostList(data);  
            setFilteredPosts(data); 
        } catch (error) {
            console.error('Failed to fetch post list:', error);
        }
    };

    const getUserInfo = async () => {
        try {
            const response = await auth.info();
            const data = response.data;
            setUserInfo(data);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        getPostList();  
        getUserInfo();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = postList.filter(post => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
        setCurrentPage(0); 
    };

    const handleClick = () => {
        navigate("/post-write");
    };

    const offset = currentPage * postsPerPage;
    const currentPagePosts = filteredPosts.slice(offset, offset + postsPerPage);
    const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <Header />
            <div className='container'>
                <div className='title-button-container'>
                    <BsPencilSquare style={{ margin: '15px' }} />
                    <h2>게시판</h2>
                    <div className="search-and-button-container">
                        <form onSubmit={handleSearch} className="search-form">
                            <input 
                                type="text" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                placeholder="검색할 제목을 입력하세요" 
                                className="search-input" 
                            />
                        </form>
                        <button onClick={handleClick} className="create-post-button">새 글 작성</button>
                    </div>
                </div>
                <hr/>
                
                {/* 카드 리스트 */}
                <div className="card-container">
                    {currentPagePosts.map((post, index) => (
                        <div key={index} className="card">
                            <h3><Link to={`/postInfo/${post.id}`}>{post.title}</Link></h3>
                            <div className="separator"></div>
                            <p>{post.content}</p>
                            <div className="bottom-details">
                            <div className="post-details">
                                <span>작성자: {post.writer}</span>
                                <span>생성일: {formatDate(post.createdDate)}</span>
                                <span>조회수: {post.count}</span>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 페이징 */}
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    previousClassName={"pagination-prev"}
                    nextClassName={"pagination-next"}
                />
            </div>
        </>
    );
};

export default Post;
