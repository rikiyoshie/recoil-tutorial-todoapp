import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homePage">
      <h1>Recoilチュートリアル</h1>
      <nav className="homeNav">
        <Link to="/todo" className="homeNavLink">
          Todoアプリ
        </Link>
        <Link to="/grid" className="homeNavLink">
          AG Gridデモ
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
