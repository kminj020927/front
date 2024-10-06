import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { LoginContext } from '../../contexts/LoginContextProvider';
import './PostForm.css';
import { usePostSave } from './PostSaveProvider';

const PostForm = () => {
    const { isLogin, userInfo } = useContext(LoginContext);
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(); // 여행 시작 일
    const [endDate, setEndDate] = useState(); // 여행 마치는 일

    const [tags, setTags] = useState([]); // 태그들을 관리할 state
    const [inputValue, setInputValue] = useState(''); // 입력 필드의 값을 관리할 state
    const postSave = usePostSave();

    const onPost = (e) => {
        e.preventDefault(); // submit 기본 동작 방지
        const form = e.target;
        const title = form.title.value;
        const content = form.content.value;
        const writer = userInfo?.name;
        const mbti = form.mbti.value;
        const place = form.place.value;
        
        // 날짜를 가져오고 포맷
        const startDate = form.startDate.value;
        const endDate = form.endDate.value;

        // JSON 형태로 변환
        const postData = {
            title,
            content,
            writer,
            mbti,
            place,
            startDate,
            endDate,
            tags
        };

        console.log(postData);
        
        postSave(postData);
    };

    // 날짜 선택 핸들러
    const changeDate = (e) => {
        const startDateFormat = moment(e[0]).format('YYYY/MM/DD');
        const endDateFormat = moment(e[1]).format('YYYY/MM/DD');
        setStartDate(startDateFormat);
        setEndDate(endDateFormat);
    };

    // 태그 입력 필드의 값이 변경될 때 호출
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // Enter 키가 눌릴 때 태그 추가
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    // 태그 삭제 핸들러
    const handleDeleteTag = (indexToDelete) => {
        setTags(tags.filter((_, index) => index !== indexToDelete));
    };

    useEffect(() => {
        if (!isLogin) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
    }, [isLogin, navigate]);

    return (
        <div>
            <Header />
            <div className='post-insert-form'>
                <h1>게시글 등록</h1>
                <hr />
                <form onSubmit={onPost}>
                    <table>
                        <tbody>
                            <tr>
                                <td>여행일정</td>
                                <td>
                                    <Calendar
                                        onChange={changeDate}
                                        selectRange={true}
                                        formatDay={(locale, date) => moment(date).format('DD')}
                                    />
                                    <div className='date-input-container'>
                                        <input
                                            type='text'
                                            className='start-date'
                                            name='startDate'
                                            placeholder='출발하는 날짜'
                                            value={startDate || ''}
                                            disabled
                                        />
                                        <input
                                            type='text'
                                            className='end-date'
                                            name='endDate'
                                            placeholder='돌아오는 날짜'
                                            value={endDate || ''}
                                            disabled
                                        />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>제목</td>
                                <td>
                                    <input
                                        type='text'
                                        id='title'
                                        name='title'
                                        className='input-field'
                                        placeholder='제목을 입력하세요'
                                        required
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>작성자</td>
                                <td>
                                    <input
                                        id='writer'
                                        name='writer'
                                        className='input-field'
                                        defaultValue={userInfo?.name}
                                        required
                                        readOnly
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>내용</td>
                                <td>
                                    <textarea
                                        id='content'
                                        name='content'
                                        className='textarea-field'
                                        cols='40'
                                        rows='5'
                                        placeholder='내용을 입력하세요'
                                        required
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>관심사</td>
                                <td>
                                    <input
                                        type='text'
                                        value={inputValue}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder='관심사를 입력하고 Enter를 누르세요'
                                        className='tag-input-field'
                                    />

                                    {/* 태그 리스트 */}
                                    <div className='tag-list'>
                                        {tags.map((tag, index) => (
                                            <span key={index} className='tag'>
                                                #{tag}
                                                <button className='delete-button' onClick={() => handleDeleteTag(index)}>
                                                    x
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>MBTI</td>
                                <td>
                                    <input
                                        type='text'
                                        id='mbti'
                                        name='mbti'
                                        className='input-field'
                                        placeholder='MBTI를 입력하세요'
                                        required
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>여행지</td>
                                <td>
                                    <input
                                        type='text'
                                        id='place'
                                        name='place'
                                        className='input-field'
                                        placeholder='여행지를 입력하세요'
                                        required
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <div className='button-container'>
                        <button className='submit-button'>등록</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
