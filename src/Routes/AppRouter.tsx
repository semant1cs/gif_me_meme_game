import React from 'react';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import AuthenticationPage from "../Components/Authentication/AuthenticationPage.tsx";
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
            element: <AuthenticationPage/>
        },
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
