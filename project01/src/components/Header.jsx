import  { useState } from 'react';
import './Header.css';

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='Header'>

      <div className="Header-container">
        <header className="header">
          <div className="header-content">
            <div className="logo">HELLO JEJU</div>
            <div className="menu-icon" onClick={toggleSidebar}>☰</div>
          </div>
        </header>

        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="close-btn" onClick={toggleSidebar}>✖</div>
          <ul>
            <li><a href="#">예약</a></li>
            <li><a href="#">도시별 여행정보</a></li>
            <li><a href="#">일정추가</a></li>
            <li><a href="#">로그인</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;