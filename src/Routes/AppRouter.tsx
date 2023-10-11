import React from 'react';
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import Auth from "../Components/Authentication/Auth";
import Register from "../Components/Authentication/Register";
import Lobby from "../Components/Lobby/Lobby";
import WelcomePage from "../Components/WelcomePage/WelcomePage";
import {RouteType} from "../Types/RouteType";
import gameStore from "../Store/GameStore";

const AppRouter: React.FC = () => {
    const publicRoutes: RouteType[] = [
        {
            path: "/",
            element: <WelcomePage/>
        },
        {
            path: "/login",
            element: <Auth/>
        },
        {
            path: "/register",
            element: <Register/>,
        }
    ]

    const privateRoutes: RouteType[] = [
        {
            path: "/",
            element: <WelcomePage/>
        },
        {
            path: "/lobby",
            element: <Lobby/>
        }
    ]

    const location = useLocation()

    return (
        gameStore.userIsAuth ?
            (
                privateRoutes.findIndex(comp => comp.path === location.pathname) !== -1
                    ?
                    <Routes>
                        {
                            privateRoutes.map(({path, element}, index) =>
                                <Route path={path} element={element} key={index}/>
                            )
                        }
                    </Routes>
                    :
                    <Navigate to="/"/>

            ) :
            (
                publicRoutes.findIndex(comp => comp.path === location.pathname) !== -1
                    ?
                    <Routes>
                        {
                            publicRoutes.map(({path, element}, index) =>
                                <Route path={path} element={element} key={index}/>
                            )
                        }
                    </Routes>
                    :
                    <Navigate to="/login"/>
            )
    );
};

export default AppRouter;
