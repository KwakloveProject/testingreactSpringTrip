import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from "react-router";
import './ReviewMDForm.css';

// Custom hook for fetching data

    
    
    const ReviewMDForm = () => {
        const { NO } = useParams(); // URL에서 NO 값 가져오기
        const navigate = useNavigate();

        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(true);

        
        
  
        useEffect(() => {
            if (NO) {
                fetch(`http://localhost:8080/tripreview/detail/${NO}`)
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
 
        
    const topicRef = useRef(null);
    const contentRef = useRef(null);
    const sub1TopicRef = useRef(null);
    const sub2TopicRef = useRef(null);
     const sub1ContentRef = useRef(null);
    const sub2ContentRef = useRef(null);
    const titleImgRef = useRef(null);
    const sub1ImgRef = useRef(null);
    const sub2TitleImgRef = useRef(null);
    

    // Handle form submission
    const update = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
         
        formData.append('title', titleRef.current.value);
      
        formData.append('topic', topicRef.current.value);
        formData.append('content', contentRef.current.value);

        formData.append('sub1Topic', sub1TopicRef.current.value);
        formData.append('sub2Topic', sub2TopicRef.current.value);
        formData.append('sub1Content', sub1ContentRef.current.value);
        formData.append('sub2Content', sub2ContentRef.current.value);
     
        if (titleImgRef.current.files.length > 0) {
            formData.append('titleImg', titleImgRef.current.files[0]);
        }
        if (sub1ImgRef.current.files.length > 0) {
            formData.append('sub1Img', sub1ImgRef.current.files[0]);
        }
        if (sub2TitleImgRef.current.files.length > 0) {
            formData.append('sub2TitleImg', sub2TitleImgRef.current.files[0]);
        }
    
        try {
            const response = await fetch(`http://localhost:8080/tripreview/update/${NO}`, {
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
            const response = await fetch(`http://localhost:8080/tripreview/delete/${NO}`, {
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
       
       

        else{ 
            image_url1=''; 
            image_url2=''; 
            image_url3=''; 
         
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
                    <div className="form-group">
                                <label>내용:</label>
                                <textarea rows='5' cols='60'
                                    ref={contentRef}
                                    defaultValue={data.CONTENT}
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

                    </div>

                 

                    <div className="button-group">
                        <button type='submit' className='btn btn-info'>수정</button>
                        <button type='button' className='btn btn-info' onClick={handleDelete}>삭제</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
    };

export default ReviewMDForm;
