import jwt_decode from 'jwt-decode'

const {$host, $authHost} = require('./index')

export const registration = async (userName, userEmail, userPassword) => {
    const { data } = await $host.post('api/user/registration', {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword
    })
    localStorage.setItem('token', data.token)
    console.log(data)
    return jwt_decode(data.token)
}

export const login = async (userEmail, userPassword) => {
    const {data} = await $host.post('api/user/login', {userEmail, userPassword})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}