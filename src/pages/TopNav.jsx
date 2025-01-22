// file: top-nav.js

import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function TopNav() {
  return (
    <Nav className="nav-centered nav-item-fill nav-link-dark mt-3">
      <Nav.Item>
        <Link to="/welcome" className="nav-link">Willkommen</Link>
      </Nav.Item>

      <Nav.Item>
        <Link to="/player-choice" className="nav-link">Spielerwahl</Link>
      </Nav.Item>

      <Nav.Item>
        <Link to="/game" className="nav-link">Spielen</Link>
      </Nav.Item>

      <Nav.Item>
        <Link to="/impress" className="nav-link">Impressum</Link>
      </Nav.Item>
    </Nav>
  );
}

export default TopNav;