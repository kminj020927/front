import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserForm.css';

export const UserForm = ({ userInfo, updateUser, deleteUser }) => {
    
    const defaultProfileImage = 'http://localhost:8080/file/basic.png'; // 기본 프로필 이미지 경로

    const [profileImage, setProfileImage] = useState(
        userInfo?.profileImage || defaultProfileImage
    );

    const [selectedFile, setSelectedFile] = useState(null); 

    // 사용자 정보 업데이트 핸들러
    const onUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const name = form.name.value;
        const email = form.email.value;
        const role = form.role?.value;

        updateUser({ username, name, email, role });
    };

    useEffect(() => {
        if (userInfo) {
            setProfileImage(
                userInfo.profileImage ? `http://localhost:8080/${userInfo.profileImage}` : defaultProfileImage
            );
        }
    }, [userInfo]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file); 
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('username', userInfo.username);

        try {
            // Send the file to the server
            const response = await axios.post('http://localhost:8080/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Update the user's profile image
            setProfileImage(response.data); 
            updateUser({ ...userInfo, profileImage: response.data }); 
            alert('프로필 이미지가 변경되었습니다.');
        } catch (error) {
            console.error('Failed to upload image:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    // 날짜 형식 변환 함수
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="userInfoContainer">
            <div className="userProfile">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="profileImage"
                />
                <div className="buttonContainer">
                    <label htmlFor="profileUpload" className="uploadLabel">프로필 변경</label>
                    <input
                        type="file"
                        id="profileUpload"
                        name="profileUpload"
                        className="uploadInput"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <button className="uploadButton" onClick={handleFileUpload}>
                        이미지 저장
                    </button>

                </div>
            </div>

            <div className="userInfoForm">
                <h2 className="userInfo-title" style={{ marginBottom: "30px" }}> {userInfo?.name} 님의 정보</h2>

                <form className='userInfo-form' onSubmit={onUpdate}>
                    {/* 사용자 정보 폼 */}
                    <div>
                        <label htmlFor='username'>username</label>
                        <input
                            type="text"
                            id='username'
                            placeholder='username'
                            name='username'
                            autoComplete='username'
                            required
                            readOnly
                            defaultValue={userInfo?.username}
                        />
                    </div>

                    <div>
                        <label htmlFor='name'>name</label>
                        <input
                            type="text"
                            id='name'
                            placeholder='name'
                            name='name'
                            autoComplete='name'
                            required
                            defaultValue={userInfo?.name}
                        />
                    </div>

                    <div>
                        <label htmlFor='email'>email</label>
                        <input
                            type="email"
                            id='email'
                            placeholder='email'
                            name='email'
                            autoComplete='email'
                            required
                            defaultValue={userInfo?.email}
                        />
                    </div>

                    <div>
                        <label htmlFor='role'>
                            등급 : {userInfo?.role === 'ROLE_USER' ? '일반 사용자' : '관리자'}
                        </label>
                    </div>

                    <div>
                        <label htmlFor='createdDate'>
                            가입 날짜 : {formatDate(userInfo?.createdDate)}
                        </label>
                    </div>

                    <button type='submit' className='userInfoBtn userInfoBtn--form'>정보 수정</button>
                    <button
                        type='button'
                        className='userInfoBtn userInfoBtn--form'
                        onClick={() => deleteUser(userInfo.username)}
                    >
                        회원 탈퇴
                   

                    </button>
                </form>
            </div>
        </div>
    );
};
