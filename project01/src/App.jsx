import { Routes,Route } from "react-router-dom";
import E_Section from "./components/E_section";
import TripRead from "./components/tripread";
import FoodRead from "./components/foodread";
import UserReview from "./components/userReview";
import TripReadCreateForm from "./components/TripReadCreateForm";
import FoodReadCreateForm from "./components/FoodReadCreateForm";
import ReviewCreateForm from "./components/ReviewCreateForm";
import Header from "./components/Header";
import ReviewMDForm from "./components/ReviewMDForm";
import FoodReadMDForm from "./components/FoodReadMDForm";
import TripReadMDForm from "./components/TripReadMDForm";
// import './App.css'

const App = () => {

    return (
        <>
<Header/>
<div className="app">
    <section>
<Routes>
<Route path="/E_Section" element={<E_Section />}/>
<Route path="/trip/detail/:NO" element={<TripRead />} />
<Route path="/restaurant/detail/:NO" element={<FoodRead />}/>
<Route path="/tripReview/detail/:NO" element={<UserReview />}/>
<Route path="/admin/tripReadCreateForm" element={<TripReadCreateForm />}/>
<Route path="/member/tripReadMDForm/:NO" element={<TripReadMDForm />}/>
<Route path="/admin/foodReadCreateForm" element={<FoodReadCreateForm />}/>
<Route path="/admin/foodReadMDForm/:NO" element={<FoodReadMDForm />}/>
<Route path="/member/reviewCreateForm" element={<ReviewCreateForm />}/>
<Route path="/member/reviewMDForm/:NO" element={<ReviewMDForm />}/>
 
</Routes>
    </section>
</div>
        </>
    );
};

export default App;

