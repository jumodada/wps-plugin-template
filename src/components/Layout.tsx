import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="app-container">
      <nav className="app-nav">
        <Link to="/" className="nav-link">首页</Link>
        <Link to="/dialog" className="nav-link">对话页面</Link>
      </nav>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout; 