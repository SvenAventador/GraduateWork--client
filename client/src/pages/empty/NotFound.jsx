import React from 'react';

import {ReactComponent as NotFoundImage} from "../../assets/svg/not-found/notfound.svg";

const NotFound = () => {
    return (
        <div className="site-container"
             style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <NotFoundImage />
        </div>
    );
};

export default NotFound;