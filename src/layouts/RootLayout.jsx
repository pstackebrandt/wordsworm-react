// file: RootLayout.jsx

//ReactRouter Imports
import { Outlet } from 'react-router-dom'

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

import TopNav from '../pages/TopNav';
import BottomNav from '../pages/BottomNav';

/**
 * Repräsentiert das Hauptlayout,
 * welches alle anderen Layouts
 * passend importiert und mithilfe von react-router
 * sicherstellt, dass die Inhalte anstelle
 * des Outlet Tags angezeigt werden.
 */
import { Container, Row, Col } from 'react-bootstrap';

export default function RootLayout() {

    function Header() {
        return (
            <Row as="header" className="text-center mb-3">
                <Col>
                    <TopNav />
                </Col>
            </Row>
        );
    }

    function MainContent() {
        return (
            <Row as="main" className="flex-grow-1 text-center mt-3">
                <Col>
                    <Outlet />
                </Col>
            </Row>
        );
    }

    function Footer() {
        return (
            <Row as="footer" className="text-center">
                <Col>
                    <BottomNav />
                </Col>
            </Row>
        );
    }

    return (
        <Container fluid className="d-flex flex-column min-vh-100">
            <Header />
            <MainContent />
            <Footer />
        </Container>
    );
}
