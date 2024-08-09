import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from "react-router";
import './FoodReadMDForm.css';

// Custom hook for fetching data

    
    
    const FoodReadMDForm = () => {
        const { NO } = useParams(); // URL에서 NO 값 가져오기
        const navigate = useNavigate();

        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);

        
        
  
        useEffect(() => {
            if (NO) {
                fetch(`http://localhost:8080/restaurant/detail/${NO}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Fetched data:', data);
                        setData(data);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        setLoading(false);
                    });
            } else {
                console.error('NO 값이 없습니다.');
                setLoading(false);
            }
        }, [NO]);
        

    // Refs for form fields
    const titleRef = useRef(null);
    const englishTitleRef = useRef(null);
    const topicRef = useRef(null);
    const sub1TopicRef = useRef(null);
    const sub2TopicRef = useRef(null);
    const sub3TopicRef = useRef(null);   
     const sub1ContentRef = useRef(null);
    const sub2ContentRef = useRef(null);
    const sub3ContentRef = useRef(null);
    const titleImgRef = useRef(null);
    const sub1ImgRef = useRef(null);
    const sub2TitleImgRef = useRef(null);
    const sub3TitleImgRef = useRef(null);
    const mapImgRef = useRef(null);
    const addressRef = useRef(null);
    const phoneNumberRef = useRef(null);

    // Handle form submission
    const update = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
         
        formData.append('title', titleRef.current.value);
        formData.append('englishTitle', englishTitleRef.current.value);
        formData.append('topic', topicRef.current.value);
        formData.append('sub1Topic', sub1TopicRef.current.value);
        formData.append('sub2Topic', sub2TopicRef.current.value);
        formData.append('sub3Topic', sub3TopicRef.current.value);
        formData.append('sub1Content', sub1ContentRef.current.value);
        formData.append('sub2Content', sub2ContentRef.current.value);
        formData.append('sub3Content', sub3ContentRef.current.value);
        formData.append('address', addressRef.current.value);
        formData.append('phoneNumber', phoneNumberRef.current.value);
    
        if (titleImgRef.current.files.length > 0) {
            formData.append('titleImg', titleImgRef.current.files[0]);
        }
        if (sub1ImgRef.current.files.length > 0) {
            formData.append('sub1Img', sub1ImgRef.current.files[0]);
        }
        if (sub2TitleImgRef.current.files.length > 0) {
            formData.append('sub2TitleImg', sub2TitleImgRef.current.files[0]);
        }
        if (sub3TitleImgRef.current.files.length > 0) {
            formData.append('sub3TitleImg', sub3TitleImgRef.current.files[0]);
        }
        if (mapImgRef.current.files.length > 0) {
            formData.append('mapImg', mapImgRef.current.files[0]);
        }
    
        try {
            const response = await fetch(`http://localhost:8080/restaurant/update/${NO}`, {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                navigate('/E_Section');
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Handle delete action
    const handleDelete = async () => {
        if (window.confirm("삭제할까요?")) {
            try {
                const response = await fetch(`http://localhost:8080/restaurant/delete/${NO}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    navigate('/E_Section');
                } else {
                    console.error('Failed to delete data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    if(loading){ 
        return (<div>loading</div>) 
    }else{ 
        let src1=''; 
        let image_url1=''; 
        let src2=''; 
        let image_url2=''; 
        let src3=''; 
        let image_url3=''; 
        let src4=''; 
        let image_url4=''; 
        let src5=''; 
        let image_url5=''; 
        if(data.TILEIMG !== '-'){ 
            src1=`http://localhost:8080/static/images/${data.TITLEIMG}`; 
            image_url1=`<img src=${src1} width='300px' height='300px'/>`; 
            
        }
        if(data.SUB1IMG !== '-'){ 
            src2=`http://localhost:8080/static/images/${data.SUB1IMG}`; 
            image_url2=`<img src=${src2} width='300px' height='300px'/>`; 
            
        }
        if(data.SUB2TITLEIMG !== '-'){ 
            src3=`http://localhost:8080/static/images/${data.SUB2TITLEIMG}`; 
            image_url3=`<img src=${src3} width='300px' height='300px'/>`; 
            
        }
        if(data.SUB3TITLEIMG !== '-'){ 
            src4=`http://localhost:8080/static/images/${data.SUB3TITLEIMG}`; 
            image_url4=`<img src=${src4} width='300px' height='300px'/>`; 
            
        }
        if(data.MAPIMG !== '-'){ 
            src5=`http://localhost:8080/static/images/${data.MAPIMG}`; 
            image_url5=`<img src=${src5} width='300px' height='300px'/>`; 
            
        }

        else{ 
            image_url1=''; 
            image_url2=''; 
            image_url3=''; 
            image_url4=''; 
            image_url5=''; 
        } 

    return (
        <div className='FoodReadMDForm'>
            <div className="form-container">
                <h2>게시글 수정</h2>
                <form onSubmit={update}>
                    <div className="form-group">
                        <label>제목:</label>
                        <input
                            ref={titleRef}
                            defaultValue={data.TITLE}
                        />
                    </div>

                    <div className="form-group">
                        <label>제목(영어로):</label>
                        <input
                            ref={englishTitleRef}
                            defaultValue={data.ENGLISHTITLE}
                        />
                    </div>

                    <div className="form-group">
                        <label>대표사진:</label>
                          <span dangerouslySetInnerHTML={{ __html: image_url1}}></span> 
                        <input type='file' ref={titleImgRef} />
                    </div>

                    <div className="form-group">
                        <label>내용 제목:</label>
                        <input
                            ref={topicRef}
                            defaultValue={data.TOPIC}
                        />
                    </div>

                    <h3>주요 볼거리</h3>
                    <div className="subImageGroup">
                        <div className="subshowlist">
                            <div className="form-group">
                                <label>서브사진1:</label>
                                <span dangerouslySetInnerHTML={{ __html: image_url2}}></span> 
                                <input type='file' ref={sub1ImgRef} />
                            </div>
                            <div className="form-group">
                                <label>제목:</label>
                                <input
                                    ref={sub1TopicRef}
                                    defaultValue={data.SUB1TOPIC}
                                />
                            </div>
                            <div className="form-group">
                                <label>내용:</label>
                                <textarea rows='5' cols='60'
                                    ref={sub1ContentRef}
                                    defaultValue={data.SUB1CONTENT}
                                />
                            </div>
                        </div>

                        <div className="subshowlist">
                            <div className="form-group">
                                <label>서브사진2:</label>
                                <span dangerouslySetInnerHTML={{ __html: image_url3}}></span> 
                                <input type='file' ref={sub2TitleImgRef} />
                            </div>
                            <div className="form-group">
                                <label>제목:</label>
                                <input
                                    ref={sub2TopicRef}
                                    defaultValue={data.SUB2TOPIC}
                                />
                            </div>
                            <div className="form-group">
                                <label>내용:</label>
                                <textarea rows='5' cols='60'
                                    ref={sub2ContentRef}
                                    defaultValue={data.SUB2CONTENT}
                                />
                            </div>
                        </div>

                        <div className="subshowlist">
                            <div className="form-group">
                                <label>서브사진3:</label>
                                <span dangerouslySetInnerHTML={{ __html: image_url4}}></span> 

                                <input type='file' ref={sub3TitleImgRef} />
                            </div>
                            <div className="form-group">
                                <label>제목:</label>
                                <input
                                    ref={sub3TopicRef}
                                    defaultValue={data.SUB3TOPIC}
                                />
                            </div>
                            <div className="form-group">
                                <label>내용:</label>
                                <textarea rows='5' cols='60'
                                    ref={sub3ContentRef}
                                    defaultValue={data.SUB3CONTENT}
                                />
                            </div>
                        </div>
                    </div>

                    <h3>지도</h3>
                    <div className="form-group">
                        <label>사진:</label>
                        <span dangerouslySetInnerHTML={{ __html: image_url5}}></span> 

                        <input type='file' ref={mapImgRef} />
                    </div>
                    <div className="form-group">
                        <label>주소:</label>
                        <input
                            ref={addressRef}
                            defaultValue={data.ADDRESS}
                        />
                    </div>

                    <div className="form-group">
                        <label>전화번호:</label>
                        <input
                            ref={phoneNumberRef}
                            defaultValue={data.PHONENUMBER}
                        />
                    </div>

                    <div className="button-group">
                        <button type='submit' className='btn btn-info'>수정</button>
                        <button type='button' onClick={handleDelete} className='btn btn-danger'>삭제</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
    };

export default FoodReadMDForm;
