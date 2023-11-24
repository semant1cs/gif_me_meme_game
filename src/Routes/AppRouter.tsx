import React from 'react';
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import Auth from "../Components/Authentication/Auth";
import Register from "../Components/Authentication/Register";
import WelcomePage from "../Components/WelcomePage/WelcomePage";
import {IRouteType} from "../Types/RouteType.ts";
import {getAuth} from "firebase/auth";
import Loader from "../Components/Loader/Loader";
import Lobby from "../Components/Lobby/Lobby";
import Game from "../Components/Game/Game";

const AppRouter: React.FC = () => {
    const publicRoutes: IRouteType[] = [
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

    const privateRoutes: IRouteType[] = [
        {
            path: "/",
            element: <WelcomePage/>
        },
        {
            path: "/lobby",
            element: <Lobby/>
        },
        {
            path: "/gameLobby",
            element: <Game/>
        },
        {
            path: "/loader",
            element: <Loader/>,
        }
    ]

    const location = useLocation()
    const auth = getAuth()

    return (
        auth.currentUser ?
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
