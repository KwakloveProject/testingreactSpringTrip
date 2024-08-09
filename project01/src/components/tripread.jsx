import {  useEffect, useState } from "react"; 
import { useParams } from "react-router"; 
import './tripread.css';
import { useNavigate } from "react-router-dom";


function useFetch(url) { 
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => { 
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setData(data);
        setLoading(false);
      });
  }, [url]);  // url이 변경될 때마다 useEffect가 실행되도록 수정
  
  return [data, loading]; 
}

const TripRead = () => {
  const { NO } = useParams(); 
  const [data, loading] = useFetch('http://localhost:8080/trip/detail/' + NO); 
  
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/member/TripReadMDForm/${NO}`); // 수정 페이지로 이동
  };
  if (loading) { 
    return (<div>Loading...</div>); 
  } else if (data) {  // data가 null이 아닌 경우에만 렌더링
    // 이미지 URL을 설정합니다.
    const titleImg = data.TITLEIMG ? `http://localhost:8080/static/images/${data.TITLEIMG}` : '';
    const sub1Img = data.SUB1IMG ? `http://localhost:8080/static/images/${data.SUB1IMG}` : '';
    const sub2TitleImg = data.SUB2TITLEIMG ? `http://localhost:8080/static/images/${data.SUB2TITLEIMG}` : '';
    const mapImg = data.MAPIMG ? `http://localhost:8080/static/images/${data.MAPIMG}` : '';

    return (
      <div className='tripread'>
        <div className='read'>
          <h1>{data.TITLE}</h1>
          <p>{data.ENGLISHTITLE}</p>
          {titleImg && <img src={titleImg} alt="Main" className='readImage' />}  

          <div className='tripInfo'>
            <br/>
            <h4>{data.TOPIC} </h4>
            <h5>{data.CONTENT}</h5>
          </div>

          <h3>주요 볼거리</h3>
          <div className='subImageGroup'>
            <div className='subshowlist'>
              {sub1Img && <img src={sub1Img} alt="Main" className='subImage'/>}       
              <div className='tripInfo2'>
                <h4>{data.SUB1TOPIC}</h4>
                <p>{data.SUB1CONTENT}</p>
              </div>
            </div>
            <div className='subshowlist2'>
              {sub2TitleImg && <img src={sub2TitleImg} alt="Main" className='subImage2' />}              
              <div className='tripInfo2'>
                <h4>{data.SUB2TOPIC}</h4>
                <span>{data.SUB2CONTENT}</span>
              </div>
            </div>
          </div>

          <h3>기본정보</h3>
          {mapImg && <img src={mapImg} alt="Main" className='mapImage' />}  
          <div className='mapInfo'>
            <div className='tripInfo'> 
              <span>{data.ADDRESS}</span>
              <br/>
              <span>{data.PHONENUMBER}</span>
            </div>
          </div>
        </div>
        <div className='button-group'>
          <button onClick={handleEdit} className='btn btn-primary'>수정</button>
        </div>
      </div>
      
    );
  } else {
    return <div>Error loading data</div>;
  }
}

export default TripRead;
