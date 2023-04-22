import {
    ADMIN_ROUTE,
    CART_ROUTE,
    CURRENT_DEVICE_ROUTE, DEVICES_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    ORDER_MENU_ROUTE,
    PERSONAL_AREA_ROUTE,
    REGISTRATION_ROUTE,
    ABOUT_ROUTE,
    CONTACTS_ROUTE,
    DELIVERY_ROUTE,
    FINDUS_ROUTE,
    GUARANTEE_ROUTE,
    LOYAL_CUSTOMERS_ROUTE,
    TRADE_IN_ROUTE,
    NOTFOUND_ROUTE
} from "./utils/consts";

import PersonalArea from "./pages/user/PersonalArea";
import OrderMenu from "./pages/user/OrderMenu";
import Cart from "./pages/user/Cart";
import AdminPanel from "./pages/admin/AdminPanel";
import Auth from "./pages/Auth";
import Device from "./pages/user/Device";
import Shop from "./pages/user/Shop";
import MainPage from "./pages/MainPage";
import AboutCompany from "./pages/user/info/AboutCompany";
import Contacts from "./pages/user/info/Contacts";
import Delivery from "./pages/user/info/Delivery";
import FindUs from "./pages/user/info/FindUs";
import Guarantee from "./pages/user/info/Guarantee";
import LoyalCustomers from "./pages/user/info/LoyalCustomers";
import TradeIn from "./pages/user/info/TradeIn";
import NotFound from "./pages/empty/NotFound";

/**
 * Роутеры, которые будут доступы только авторизированным пользователям.
 * @type {[{}]} - Array.
 */

export const authRoutes = [
    {
        path: PERSONAL_AREA_ROUTE,
        Component: PersonalArea
    },
    {
        path: ORDER_MENU_ROUTE,
        Component: OrderMenu
    },
    {
        path: CART_ROUTE + '/:id',
        Component: Cart
    }
]

/**
 * Роутер администратора.
 * @type {{}} - Object.
 */
export const adminRoute = {
    path: ADMIN_ROUTE,
    Component: AdminPanel
}

/**
 * Роутеры, которые будут доступны всем пользователям.
 * @type {[{}]} - Array.
 */
export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: CURRENT_DEVICE_ROUTE + '/:id',
        Component: Device
    },
    {
        path: DEVICES_ROUTE,
        Component: Shop
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: ABOUT_ROUTE,
        Component: AboutCompany
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: DELIVERY_ROUTE,
        Component: Delivery
    },
    {
        path: FINDUS_ROUTE,
        Component: FindUs
    },
    {
        path: GUARANTEE_ROUTE,
        Component: Guarantee
    },
    {
        path: LOYAL_CUSTOMERS_ROUTE,
        Component: LoyalCustomers
    },
    {
        path: TRADE_IN_ROUTE,
        Component: TradeIn
    },
    {
        path: NOTFOUND_ROUTE,
        Component: NotFound
    }
]