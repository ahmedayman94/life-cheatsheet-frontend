import { IRoute } from "../interfaces/route.model";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const routes: IRoute[] = [
    {
        component: Home,
        path: '/',
        exact: true,
    },
    {
        component: Login,
        path: '/login',
        exact: true,
    }
];