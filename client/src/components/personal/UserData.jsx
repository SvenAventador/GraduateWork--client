import React from 'react';
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/consts";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";
import {updateData} from "../../http/userApi";

const UserData = () => {
    const {user} = React.useContext(Context)
    const history = useNavigate()

    const [userName, setUserName] = React.useState(user.user.userName || '')
    const [userEmail, setUserEmail] = React.useState(user.user.userEmail || '')
    const [userFio, setUserFio] = React.useState(user.user.userFio || '')
    const [userPhone, setUserPhone] = React.useState(user.user.userPhone || '')

    const logout = () => {
        user.setIsAuth(false)
        user.setUser({})
        localStorage.removeItem('token')
        history(MAIN_ROUTE)
    }

    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    const phoneRegex = /^(\+7|8)?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/

    const changeData = async () => {
        if (!user.user.userName && (userName === '')) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректное имя!"
            })
        }

        if (!user.user.userFio && (userFio === '' || userFio.split(' ') < 2)) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректное ФИО"
            })
        }

        if (!user.user.userEmail && (userEmail === '' || !emailRegex.test(userEmail))) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректную почту!"
            })
        }

        if (!user.user.userPhone && (userPhone === '' || !phoneRegex.test(userPhone))) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: "Пожалуйста, введите корректный мобильный телефон!"
            })
        }

        let data;

        try {
            data = await updateData(user.user.id, userName, userEmail, userFio, user.user.userAddress, userPhone)
            user.setUser(data)
            user.setIsAuth(true)

            return Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Данные успешно обновлены!'
            })
        } catch (e) {
            return Swal.fire({
                icon: "error",
                title: "Ошибочка",
                text: e.response.data.message
            })
        }
    }

    return (
        <div className="user-data">
            <div className="user-data__title">
                <p>Ваши данные</p>
                <button className="btn-reset"
                        onClick={logout}>
                    Выйти
                </button>
            </div>
            <div className="user-data__personal">
                <div className="user-data__personal--field">
                    <input type="text"
                           id="yourNickName"
                           value={userName}
                           onChange={(e) => setUserName(e.target.value)}
                           required="required"
                           autoComplete="false"/>
                    <label htmlFor="yourNickName">Никнейм</label>
                </div>
                <div className="user-data__personal--field">
                    <input type="text"
                           id="yourName"
                           value={userFio}
                           onChange={(e) => setUserFio(e.target.value)}
                           required="required"
                           autoComplete="false"/>
                    <label htmlFor="yourName">ФИО</label>
                </div>
                <div className="user-data__personal--field">
                    <input type="text"
                           id="yourEmail"
                           required="required"
                           value={userEmail}
                           onChange={(e) => setUserEmail(e.target.value)}
                           autoComplete="false"/>
                    <label htmlFor="yourEmail">Почта</label>
                </div>
                <div className="user-data__personal--field">
                    <InputMask type="text"
                               mask="+7 (999) 999 99-99"
                               id="yourPhone"
                               required="required"
                               value={userPhone}
                               onChange={(e) => setUserPhone(e.target.value)}
                               autoComplete="false"/>
                    <label htmlFor="yourPhone">Телефон</label>
                </div>
            </div>
            <button className="btn-reset user-data__save"
                    onClick={changeData}>
                Сохранить данные
            </button>
        </div>
    );
};

export default UserData;