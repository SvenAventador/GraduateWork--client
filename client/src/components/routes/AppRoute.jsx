import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {authRoutes, adminRoute, publicRoutes} from "../../routes";
import {NOTFOUND_ROUTE} from "../../utils/consts";
import {Context} from "../../index";

const AppRoute = () => {
    const {user} = React.useContext(Context)
    return (
        <Routes>

            {
                user.isAuth &&
                authRoutes.map( ({path, Component}) =>
                    <Route key={path}
                           path={path}
                           element={<Component />} />
                )
            }

            {
                user.isAuth &&
                user.user.role === 'ADMIN' &&
                    <Route key={adminRoute.path}
                           path={adminRoute.path}
                           element={<adminRoute.Component />} />
            }

            {
                publicRoutes.map( ({path, Component}) =>
                    <Route key={path}
                           path={path}
                           element={<Component />} />
                )
            }

            <Route path="*"
                   element={<Navigate to={NOTFOUND_ROUTE} replace/>}/>

        </Routes>
    );
};

export default AppRoute;