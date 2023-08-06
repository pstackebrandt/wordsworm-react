// file page-title.js

import React from "react";
import "./page-title.css";

function PageTitle({ title, subtitle }) { // Hier werden title und subtitle als Props destrukturiert.

    return (
        <div className="container mt-0 text-primary">
            <h1 className="display-3">{title}</h1>
            <p className="lead">{subtitle}</p>
        </div>
    );
}

export default PageTitle;
