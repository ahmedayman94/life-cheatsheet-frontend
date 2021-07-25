export interface IRoute {
    path: string | string[];
    exact: boolean;
    component: any;
}