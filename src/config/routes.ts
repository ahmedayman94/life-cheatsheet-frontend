import { IRoute } from "../interfaces/route.model";
import CreatePost from "../pages/CreatePost";
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
    },
    {
        component: Home,
        path: '/categories/:categoryId/:posts?/:postId?',
        exact: true,
    },
    {
        component: CreatePost,
        path: '/create-post',
        exact: true,
    },
];