import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IUserType} from "../Types/UserType";

class GameStore {
    users: IUserType[] = [];
    jsonUrl: string = 'http://localhost:3000/users';
    userIsAuth: boolean = false;
    userAuthNickName: string | number = "";
    userAuthEmail: string | number = "";
    userAuthPassword: string | number = "";
    userAuthShowPassword: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    getUsers() {
        axios.get(this.jsonUrl).then((response) => {
            this.users = response.data
        })
    }

    changeUserIsAuth(isAuth: boolean) {
        this.userIsAuth = isAuth;
    }

    changeUserAuthNickname(nickname: string | number) {
        this.userAuthNickName = nickname
    }

    changeUserAuthEmail(email: string | number) {
        this.userAuthEmail = email
    }

    changeUserAuthPassword(password: string | number) {
        this.userAuthPassword = password
    }

    changeUserAuthShowPassword() {
        this.userAuthShowPassword = !this.userAuthShowPassword
    }
}

export default new GameStore()