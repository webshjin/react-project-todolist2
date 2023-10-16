import React from 'react';
import './Header.css'; // css 파일을 import 할때는 반드시 경로와 확장자를 정확하게

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 🎵</h3>
      <h1>{new Date().toLocaleDateString()}</h1>
    </div>
  );
};

export default React.memo(Header);
