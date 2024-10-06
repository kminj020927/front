import React, { useState } from "react";
import Header from "../components/Header/Header";
import { BsPencilSquare } from "react-icons/bs";
import PostComForm from "../components/PostCom/PostComForm"; // Import the PostComForm
import '../App.css';

const PostCom = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [existingPosts, setExistingPosts] = useState([]); // State to hold recruitment posts

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Header />
            <div className='container'>
                <div className='title-button-container'>
                    <BsPencilSquare style={{ margin: '15px' }} />  
                    <h2>동행모집</h2>
                    <button onClick={openModal}>모집하기</button>
                </div>

                {isModalOpen && 
                    <PostComForm 
                        onClose={closeModal} 
                        existingPosts={existingPosts} 
                        setExistingPosts={setExistingPosts} 
                    />
                }
                <div className="recruit-list">
                <h2>모집 중인 동행</h2>
                {existingPosts.length > 0 ? (
                    <ul>
                        {existingPosts.map((post, index) => (
                            <li key={index}>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <p>일정: {post.startDate} ~ {post.endDate}</p>
                                <p>최대 인원: {post.maxParticipants}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>모집 중인 동행이 없습니다.</p>
                )}
            </div>
            </div>
        </>
    );
};

export default PostCom;
