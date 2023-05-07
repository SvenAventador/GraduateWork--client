/** overall routes **/
export const REGISTRATION_ROUTE = '/registration'
export const LOGIN_ROUTE = '/login'

/** admin routes **/
export const ADMIN_ROUTE = '/admin-panel'

/** users routes **/
export const PERSONAL_AREA_ROUTE = '/personal-route'
export const ORDER_MENU_ROUTE = '/your-orders'
export const CART_ROUTE = '/cart'
export const CURRENT_DEVICE_ROUTE = '/devices'
export const DEVICES_ROUTE = '/devices'
export const MAIN_ROUTE = '/'
export const FAVOURITE_ROUTE = '/favourite'
export const ABOUT_ROUTE = "/about"
export const CONTACTS_ROUTE = "/contacts"
export const DELIVERY_ROUTE = "/delivery"
export const FINDUS_ROUTE = "/find-us"
export const GUARANTEE_ROUTE = "/guarantee"
export const LOYAL_CUSTOMERS_ROUTE = "/loyal-customers"
export const TRADE_IN_ROUTE = "/trade-in"
export const NOTFOUND_ROUTE = "/not-found"

/** slider settings **/
export const settings = {
    dots: false,
    infinite: false,
    initialSlide: 0,
    centerPadding: "200px",
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: false,
    draggable: false,
    speed: 500,
    autoplaySpeed: 5000
};

export const imageSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
    ],
};