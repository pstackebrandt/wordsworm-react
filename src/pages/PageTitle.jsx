// file page-title.js

import React from "react";
import { Container, Row, Col } from 'react-bootstrap';  // Importieren Sie die notwendigen Komponenten von react-bootstrap
import "./page-title.css";

function PageTitle({ title, subtitle }) { // Hier werden title und subtitle als Props destrukturiert.

    return (
        <Container className="mt-0 text-primary">  {/* Verwenden Sie die Container-Komponente von React-Bootstrap */}
            <Row>
                <Col>
                    <h1 className="display-2">{title}</h1>
                    <p className="lead fs-2">{subtitle}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default PageTitle;
