import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import './FoodReadCreateForm.css';

const FoodReadCreateForm = () => {
    const navigate = useNavigate();
    const title = useRef();
    const englishTitle = useRef();
    const titleImg = useRef();
    const topic = useRef();
    const sub1Img = useRef();
    const sub1Topic = useRef();
    const sub1Content = useRef();
    const sub2TitleImg = useRef();
    const sub2Topic = useRef();
    const sub2Content = useRef();
    const sub3TitleImg = useRef();
    const sub3Topic = useRef();
    const sub3Content = useRef();
    const mapImg = useRef();
    const address = useRef();
    const phoneNumber = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create FormData object
        const form = new FormData();
        form.append('title', title.current.value);
        form.append('englishTitle', englishTitle.current.value);
        form.append('topic', topic.current.value);
        form.append('sub1Topic', sub1Topic.current.value);
        form.append('sub1Content', sub1Content.current.value);
        form.append('sub2Topic', sub2Topic.current.value);
        form.append('sub2Content', sub2Content.current.value);
        form.append('sub3Topic', sub3Topic.current.value);
        form.append('sub3Content', sub3Content.current.value);
        form.append('mapImg', mapImg.current.value);
        form.append('address', address.current.value);
        form.append('phoneNumber', phoneNumber.current.value);
        
        
        // Log file data
        if (titleImg.current.files.length > 0) {
            console.log('titleImg:', titleImg.current.files[0].name);
            form.append('titleImg', titleImg.current.files[0]);
        }
        if (sub1Img.current.files.length > 0) {
            console.log('sub1Img:', sub1Img.current.files[0].name);
            form.append('sub1Img', sub1Img.current.files[0]);
        }
        if (sub2TitleImg.current.files.length > 0) {
            console.log('sub2TitleImg:', sub2TitleImg.current.files[0].name);
            form.append('sub2TitleImg', sub2TitleImg.current.files[0]);
        }
        if (sub3TitleImg.current.files.length > 0) {
            console.log('sub3TitleImg:', sub3TitleImg.current.files[0].name);
            form.append('sub3TitleImg', sub3TitleImg.current.files[0]);
        }
        if (mapImg.current.files.length > 0) {
            console.log('mapImg:', mapImg.current.files[0].name);
            form.append('mapImg', mapImg.current.files[0]);
        }
        
        // Send request
        fetch('http://localhost:8080/restaurant/insert', {
            method: 'post',
            body: form
        })
        .then(response => {
            console.log('Response Status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            navigate('/E_Section');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };



    return (
        <div className='foodReadCreateForm'>
        <div className="form-container">
            <h2>게시글 등록</h2>  
     
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목:</label>
                    <input type='text' ref={title} />
                </div>
                <div className="form-group">
                    <label>제목(영어로):</label>
                    <input type='text' ref={englishTitle} placeholder='English title'/>
                </div>
                <div className="form-group">
                    <label>대표사진:</label>
                    <input type='file' ref={titleImg} accept="image/*"/>
                </div>
                <div className="form-group">
                    <label>내용 제목:</label>
                    <input type='text' ref={topic} placeholder='내용 제목'/>
                </div>
                <h3>주요 볼거리</h3>
                <div className="subImageGroup">
                    <div className="subshowlist">
                        <div className="form-group">
                            <label>서브사진1:</label>
                            <input type='file' ref={sub1Img} accept="image/*"/>
                        </div>
                        <div className="form-group">
                            <label>제목:</label>
                            <input type='text' ref={sub1Topic} placeholder='제목'/>
                        </div>
                        <div className="form-group">
                            <label>내용:</label>
                            <textarea ref={sub1Content} rows='5' cols='60' placeholder='내용'/>
                        </div>
                    </div>
                    <div className="subshowlist">
                        <div className="form-group">
                            <label>서브사진2:</label>
                            <input type='file' ref={sub2TitleImg} accept="image/*"/>
                        </div>
                        <div className="form-group">
                            <label>제목:</label>
                            <input type='text' ref={sub2Topic} placeholder='제목'/>
                        </div>
                        <div className="form-group">
                            <label>내용:</label>
                            <textarea ref={sub2Content} rows='5' cols='60' placeholder='내용'/>
                        </div>
                    </div>
                    <div className="subshowlist">
                        <div className="form-group">
                            <label>서브사진3:</label>
                            <input type='file' ref={sub3TitleImg} accept="image/*"/>
                        </div>
                        <div className="form-group">
                            <label>제목:</label>
                            <input type='text' ref={sub3Topic} placeholder='제목'/>
                        </div>
                        <div className="form-group">
                            <label>내용:</label>
                            <textarea ref={sub3Content} rows='5' cols='60' placeholder='내용'/>
                        </div>
                    </div>
                    <div className="subshowlist">
                        <div className="form-group">
                            <label>지도사진:</label>
                            <input type='file' ref={mapImg} accept="image/*"/>
                        </div>
                        <div className="form-group">
                            <label>주소:</label>
                            <input type='text' ref={address} placeholder='제목'/>
                        </div>
                        <div className="form-group">
                            <label>전화번호:</label>
                            <textarea ref={phoneNumber} rows='5' cols='60' placeholder='내용'/>
                        </div>
                       
                    </div>
                </div>
                <button type="submit" className="submit-button">확인</button>
            </form>
        </div>
    </div>
    );
};

export default FoodReadCreateForm;
