import axios from 'axios'

/**
 * Запросы к серверу, к которым заголовок Authorization не нужен.
 * Пример, авторизация.
 * @type {axios.AxiosInstance}
 */
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_PATH
})


/**
 * Запросы к серверу, к которым заголовок Authorization нужен.
 * Пример, корзина.
 * @type {axios.AxiosInstance}
 */
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_PATH
})

/**
 * Предоставление заголовка Authorization.
 * @param config - кофнфигурация.
 * @returns {string} - Заголоваок
 */
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}