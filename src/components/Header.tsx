import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <AppBar component="nav" sx={{ bgcolor: '#FFC300' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
              src="/logo.svg"
              alt="Logo"
              style={{ width: '6em', height: 'auto' }} 
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
