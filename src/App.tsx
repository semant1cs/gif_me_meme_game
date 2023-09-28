import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        const jsonUrl = 'http://localhost:3000/users';
        axios.get(jsonUrl).then((response) => {
            const allUsers = response.data
            setUsers(allUsers)
        })
    }, [])


    return (
        <div>
            {users !== undefined
                ? users.map((user) => (
                    <div><img
                        src={user.avatarImg}
                        height="50px"
                        alt={user.nickname}/> {user.id}.{user.nickname}</div>)
                )
                : "Пользователей нет"}
        </div>
    )
}

export default App
