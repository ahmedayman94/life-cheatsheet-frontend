export interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    access: string;
    isActive: boolean;
    picture: string;
}

export interface UserInfoState {
    userInfo?: UserInfo | null;
    loaded: boolean;
}