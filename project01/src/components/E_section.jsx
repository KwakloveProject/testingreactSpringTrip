import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './E_section.css';
import SecondE_Section from './SecondE_Section';
import { Link } from 'react-router-dom';
const baseUrl = 'http://localhost:8080/static/images/';


const Section = () => {
    const [tripItems, setTripItems] = useState([]);
    const [restaurantItems, setRestaurantItems] = useState([]);
    const [index, setIndex] = useState(0);
    const nav = useNavigate();
    //관광지 정보
    useEffect(() => {
        fetch('http://localhost:8080/trip/list')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setTripItems(data);
            })
            .catch(error => console.error('데이터 가져오기 실패:', error));
    }, []);



    //식당정보
    useEffect(() => {
        fetch('http://localhost:8080/restaurant/list')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setRestaurantItems(data);
            })
            .catch(error => console.error('데이터 가져오기 실패:', error));
    }, []);






    
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const clickOneList = () => nav("/admin/tripRead");
    const clickTwoList = () => nav("/admin/foodRead");
    const clickThreeList = () => nav("/member/userReview");
    const clickFourList = () => nav("/admin/tripReadCreateForm");
    const clickFiveList = () => nav("/admin/foodReadCreateForm");
    const clickSixList = () => nav("/member/reviewCreateForm");

    return (
        <div className='E_section'>
            <div className="carousel-container">
                <div className="carousel-caption-overlay">
                    <h1>제주도 여행</h1>
                    <h2>다같이 떠나자!!</h2>
                </div>
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    interval={1500}
                    controls={false}
                    className="carousel"
                >
                    <Carousel.Item>
                        <ExampleCarouselImage src="https://cdn.pixabay.com/photo/2022/06/24/05/35/ocean-7281047_640.jpg" alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage src="https://cdn.pixabay.com/photo/2016/02/11/08/48/jeju-island-1193280_1280.jpg" alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage src="https://cdn.pixabay.com/photo/2022/01/11/03/38/jeju-island-6929633_1280.jpg" alt="Third slide" />
                    </Carousel.Item>
                </Carousel>
                <div className="tenList">
                <div className='do-hyeon-regular' id='infoTitle'>
                            <h4> 지금 가장 HOT한 방문지 10곳</h4>
                            <p>지난 일주일 간 평소보다 더 많이 저장된 관광지・맛집</p>
                            </div>
                            {/* 관광지 4개 */}
                    {tripItems.slice(0, 4).map(({ NO,TITLE, TOPIC, TITLEIMG }) => (

                        <div key={NO} className="item">
                        <Link to={`/trip/detail/${NO}`} className='link'>
                            <div className='list1'>
                                <div className='list1-2'>
                                    <h4>{TITLE}</h4>
                                    <span>{TOPIC}</span>
                                </div>
                                <img src={`${baseUrl}${TITLEIMG}`} className='image1' alt={TITLE} />
                            </div>
                        </Link>
                        </div>

                        
                    ))}

                    {/* 식당4개 */}
                    {restaurantItems.slice(0, 4).map(({ NO, TITLE, TOPIC, TITLEIMG }) => (
                        <div key={NO} className="item">
                            <Link to={`/restaurant/detail/${NO}`} className='link'>
                            <div className='list1'>
                                <div className='list1-2'>
                                    <h4>{TITLE}</h4>
                                    <span>{TOPIC}</span>
                                </div>
                                <img src={`${baseUrl}${TITLEIMG}`} className='image1' alt={TITLE} />
                            </div>
                            </Link>
                        </div>
                    ))}


            <SecondE_Section />
                <div className="button-container">
                    <button onClick={clickOneList}>Trip Read</button>
                    <button onClick={clickTwoList}>Food Read</button>
                    <button onClick={clickThreeList}>User Review</button>
                    <button onClick={clickFourList}>Trip Create Form</button>
                    <button onClick={clickFiveList}>Food Create Form</button>
                    <button onClick={clickSixList}>Review Create Form</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Section;
