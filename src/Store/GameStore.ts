import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IUserType} from "../Types/UserType";

class GameStore {
    users: IUserType[] = [];
    jsonUrl: string = 'http://localhost:3000/users';
    userAuthNickName: string = "";
    userAuthEmail: string = "";
    userAuthPassword: string = "";
    userAuthShowPassword: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    getUsers() {
        axios.get(this.jsonUrl).then((response) => {
            this.users = response.data
        })
    }

    changeUserAuthNickname(nickname: string) {
        this.userAuthNickName = nickname
    }

    changeUserAuthEmail(email: string) {
        this.userAuthEmail = email
    }

    changeUserAuthPassword(password: string) {
        this.userAuthPassword = password
    }

    changeUserAuthShowPassword() {
        this.userAuthShowPassword = !this.userAuthShowPassword
    }
}

export default new GameStore()