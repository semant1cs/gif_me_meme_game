import React, {lazy, Suspense} from 'react';
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import Auth from "../Components/Authentication/Auth";
import Register from "../Components/Authentication/Register";
import WelcomePage from "../Components/WelcomePage/WelcomePage";
import {IRouteType} from "../Types/RouteType.ts";
import {getAuth} from "firebase/auth";
import Loader from "../Components/Loader/Loader";

const AppRouter: React.FC = () => {
    const Lobby = lazy(() => import("../Components/Lobby/Lobby"))
    const Game = lazy(() => import("../Components/Game/Game"))

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
            element: <Suspense fallback={<Loader/>}>
                <Lobby/>
            </Suspense>
        },
        {
            path: "/gameLobby",
            element: <Suspense fallback={<Loader/>}>
                <Game/>
            </Suspense>
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
