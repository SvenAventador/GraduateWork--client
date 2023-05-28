import React, {useState} from 'react';
import {Layout, Menu, Button, Switch} from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    AppstoreOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import AdminAnalyticData from "../../components/admin/AdminAnalyticData";
import AdminDeviceData from "../../components/admin/AdminDeviceData";
import AdminUserData from "../../components/admin/AdminUserData";
import AdminCompositionDeviceData from "../../components/admin/AdminCompositionDeviceData";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/consts";
import {getAllDevice, getAllUserOrder} from "../../http/adminApi";
import {
    getAllBrands,
    getAllColors,
    getAllMaterials,
    getAllTypes,
    getAllWireless
} from "../../http/deviceApi";

const {Sider} = Layout;

const AdminPanel = () => {
    const {user} = React.useContext(Context);
    const history = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState('light');
    const [selectedMenuItem, setSelectedMenuItem] = useState('analytics');

    const [userOrder, setUserOrder] = React.useState([])
    const [color, setColor] = React.useState([])
    const [wireless, setWireless] = React.useState([])
    const [type, setType] = React.useState([])
    const [brand, setBrand] = React.useState([])
    const [material, setMaterial] = React.useState([])
    const [device, setDevice] = React.useState([])

    React.useEffect(() => {
        getAllUserOrder().then((data) => {
            setUserOrder(data.users)
        })
        getAllBrands().then((data) => {
            setBrand(data)
        })
        getAllColors().then((data) => {
            setColor(data)
        })
        getAllMaterials().then((data) => {
            setMaterial(data)
        })
        getAllWireless().then((data) => {
            setWireless(data)
        })
        getAllTypes().then((data) => {
            setType(data)
        })
        getAllDevice().then((data) => {
            setDevice(data)
        })
    }, [])

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuSelect = ({key}) => {
        setSelectedMenuItem(key);
    };

    const handleThemeChange = (checked) => {
        setTheme(checked ? 'dark' : 'light');
    };

    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'analytics':
                return <AdminAnalyticData theme={theme}/>;
            case 'devices':
                return <AdminDeviceData device={device}
                                        deviceType={type}
                                        deviceBrand={brand}
                                        deviceColor={color}
                                        deviceMaterial={material}
                                        deviceWireless={wireless}/>;
            case 'users':
                return <AdminUserData orders={userOrder}/>;
            case 'compositeDevices':
                return <AdminCompositionDeviceData brand={brand}
                                                   wireless={wireless}
                                                   color={color}
                                                   type={type}
                                                   material={material}
                                                   theme={theme}/>;
            default:
                return null;
        }
    };

    const handleLogout = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
        history(MAIN_ROUTE);
    };

    return (
        <Layout style={{height: '100v'}}>
            <Sider collapsible
                   width={300}
                   collapsed={collapsed}
                   theme={theme}>
                <div className={collapsed ? 'menu-header-collapsed' : ''}>
                    <Button
                        type="text"
                        onClick={toggleCollapsed}
                        className="collapse-button"
                        style={{
                            backgroundColor: '#fff',
                            width: '80px',
                            marginRight: '1rem',
                            marginBottom: '.5rem'
                        }}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </Button>
                    <Switch checked={theme === 'dark'}
                            onChange={handleThemeChange}
                            checkedChildren={"Тёмная тема"}
                            unCheckedChildren={"Светлая тема"}
                            className="theme-switch"/>
                </div>
                <Menu theme={theme}
                      mode="vertical"
                      selectedKeys={[selectedMenuItem]}
                      onSelect={handleMenuSelect}>
                    <Menu.Item key="analytics"
                               icon={<PieChartOutlined/>}>
                        Аналитика
                    </Menu.Item>
                    <Menu.Item key="devices"
                               icon={<DesktopOutlined/>}>
                        Девайсы
                    </Menu.Item>
                    <Menu.Item key="compositeDevices"
                               icon={<AppstoreOutlined/>}>
                        Составные устройства
                    </Menu.Item>
                    <Menu.Item key="users"
                               icon={<UserOutlined/>}>
                        Пользователи
                    </Menu.Item>
                    <Menu.Item key="logout"
                               icon={<LogoutOutlined/>}
                               onClick={handleLogout}>
                        Выйти из аккаунта
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Layout.Content
                    style={{
                        background: theme === 'dark' ? '#000f1e' : '#f0f2f5'
                    }}>
                    {renderContent()}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default AdminPanel;