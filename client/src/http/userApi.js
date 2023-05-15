import jwt_decode from 'jwt-decode'

const {$host, $authHost} = require('./index')

/**
 * Регистрация пользователя.
 * @param userName - Имя пользователя.
 * @param userEmail - Почта пользователя.
 * @param userPassword - Пароль пользователя.
 * @return {Promise<unknown>}
 */
export const registration = async (userName, userEmail, userPassword) => {
    const {data} = await $host.post('api/user/registration', {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword
    })
    localStorage.setItem('token', data.token)
    console.log(data)
    return jwt_decode(data.token)
}

/**
 * Авторизация пользователя.
 * @param userEmail - Почта пользователя.
 * @param userPassword - Пароль пользователя.
 * @return {Promise<unknown>}
 */
export const login = async (userEmail, userPassword) => {
    const {data} = await $host.post('api/user/login', {userEmail, userPassword})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

/**
 * Функция валидности токена авторизации пользователя.
 * @return {Promise<unknown>}
 */
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

/**
 * Обновление данных пользователя.
 * @param userId - Идентификатор пользователя.
 * @param userName - Имя пользвоателя.
 * @param userEmail - Почта пользователя.
 * @param userFio - ФИО пользователя.
 * @param userAddress - Адрес пользователя.
 * @param userPhone - Телефон пользователя.
 * @return {Promise<any>}
 */
export const updateData = async (userId,
                                 userName,
                                 userEmail,
                                 userFio,
                                 userAddress,
                                 userPhone) => {
    const {data} = await $host.put(`api/user/update/${userId}`, {
        userName, userEmail, userFio, userAddress, userPhone
    })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}