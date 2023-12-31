// file: top-nav.js

import Nav from 'react-bootstrap/Nav';

function TopNav() {
  return (
    <Nav className="nav-centered nav-item-fill nav-link-dark mt-3">
      <Nav.Item>
        <Nav.Link href="welcome">Willkommen</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="player-choice">Spielerwahl</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="game">Spielen</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="impress">Impressum</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default TopNav;