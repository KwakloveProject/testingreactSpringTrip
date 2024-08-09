import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewCreateForm.css';

const ReviewCreateForm = () => {
    
    const navigate = useNavigate();
    const title = useRef();

    
    const titleImg = useRef();
    const topic = useRef();
    const content = useRef();
    const sub1Img = useRef();
    const sub1Topic = useRef();
    const sub1Content = useRef();
    const sub2TitleImg = useRef();
    const sub2Topic = useRef();
    const sub2Content = useRef();
   

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create FormData object
        const form = new FormData();
        form.append('title', title.current.value);
    
        form.append('topic', topic.current.value);
        form.append('content', content.current.value);
        form.append('sub1Topic', sub1Topic.current.value);
        form.append('sub1Content', sub1Content.current.value);
        form.append('sub2Topic', sub2Topic.current.value);
        form.append('sub2Content', sub2Content.current.value);

        // Log file data
        if (titleImg.current.files.length > 0) {
            console.log('titleImg:', titleImg.current.files[0].name);
            form.append('titleImg', titleImg.current.files[0]);
        }
        if (sub1Img.current.files.length > 0) {
            console.log('sub1Img:',sub1Img.current.files[0].name);
            form.append('sub1Img', sub1Img.current.files[0]);
        }
        if (sub2TitleImg.current.files.length > 0) {
            console.log('sub2TitleImg:', sub2TitleImg.current.files[0].name);
            form.append('sub2TitleImg', sub2TitleImg.current.files[0]);
        }
       

        // Send request
        fetch('http://localhost:8080/tripreview/insert', {
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
        <div className='E_ReviewCreateForm'>
        <div className="form-container">
            <h2>게시글 등록</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목:</label>
                    <input type='text' ref={title} />
                </div>

           

              

                <div className="form-group">
                    <label>대표사진:</label>
                    <input type='file' ref={titleImg} />
                </div>

                <div className="form-group">
                    <label>내용 제목:</label>
                    <input type='text' ref={topic} />
                </div>

                <div className="form-group">
                    <label>내용:</label>
                    <textarea rows='5' cols='60' ref={content} />
                </div>

                <h3>주요 볼거리</h3>
                <div className="subImageGroup">
                    <div className="subshowlist">
                        <div className="form-group">
                            <label>서브사진1:</label>
                            <input type='file' ref={sub1Img} />
                        </div>
                        <div className="form-group">
                            <label>제목:</label>
                            <input type='text' ref={sub1Topic} />
                        </div>
                        <div className="form-group">
                            <label>내용:</label>
                            <textarea rows='5' cols='60' ref={sub1Content} />
                        </div>
                    </div>

                    <div className="subshowlist2">
                        <div className="form-group">
                            <label>서브사진2:</label>
                            <input type='file' ref={sub2TitleImg} />
                        </div>
                        <div className="form-group">
                            <label>제목:</label>
                            <input type='text' ref={sub2Topic} />
                        </div>
                        <div className="form-group">
                            <label>내용:</label>
                            <textarea rows='5' cols='60' ref={sub2Content} />
                        </div>
                    </div>
                </div>

               

                <button type="submit" className='button'>등록</button>
            </form>
        </div>
        </div>
    );
};

export default ReviewCreateForm;