import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

const baseUrl = 'http://localhost:8080/static/images/';

const formatDate = (dateString) => {
    return format(new Date(dateString), 'yyyy-MM-dd');
};

const SecondE_Section = () => {
    const [tripReviewItems, setTripReviewItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/tripreview/list')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setTripReviewItems(data);
            })
            .catch(error => {
                console.error('데이터 가져오기 실패:', error);
                setTripReviewItems([]);
            });
    }, []);

    return (
        <>
            <h3>해외 실시간 여행기 🧭</h3>
            <p>직접 다녀온 추천 일정과 여행 꿀팁 확인하기</p>

            <div className="E_SecondSection">
                <div className='TravelingReviewMain'>
                    {/* 리뷰 항목 8개 표시 */}
                    {tripReviewItems.slice(0, 8).map(({ NO, TITLE, TITLEIMG, REG_DATE }) => (
                        <div key={NO} className="item">
                            <Link to={`/tripreview/detail/${NO}`} className='link'>
                                <div className='list1'>
                                    <div className='list1-2'>
                                        <h4>{TITLE}</h4>
                                        <span>{formatDate(REG_DATE)}</span>
                                    </div>
                                    <img src={`${baseUrl}${TITLEIMG}`} className='image1' alt={TITLE} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SecondE_Section;
