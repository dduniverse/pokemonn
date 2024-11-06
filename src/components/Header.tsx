import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <div className="bg-yellow-400">
      <div className="flex items-center p-4">
        <Link to="/" className="no-underline">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-24 h-auto"  // Tailwind로 로고 크기 설정
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
