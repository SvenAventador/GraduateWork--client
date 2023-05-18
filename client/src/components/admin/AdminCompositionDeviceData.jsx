import React from 'react';
import {Tabs} from 'antd';
import TypeComposition from "./composition/TypeComposition";
import BrandComposition from "./composition/BrandComposition";
import MaterialComposition from "./composition/MaterialComposition";
import WirelessComposition from "./composition/WirelessComposition";
import ColorComposition from "./composition/ColorComposition";

const {TabPane} = Tabs;

const AdminCompositionDeviceData = ({brand, type, color, wireless, material, theme}) => {

    const [activeTab, setActiveTab] = React.useState('type');

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    return (
        <div>
            <Tabs style={{background: theme === 'dark' ? '#fff' : '', color: theme === 'dark' ? '#000' : ''}}
                  type="card" activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Типы устройств" key="type">
                    {type && <TypeComposition types={type}/>}
                </TabPane>
                <TabPane tab="Бренды устройств" key="brand">
                    {brand && <BrandComposition brands={brand}/>}
                </TabPane>
                <TabPane tab="Цвета устройств" key="color">
                    {color && <ColorComposition colors={color}/>}
                </TabPane>
                <TabPane tab="Материалы устройств" key="material">
                    {material && <MaterialComposition materials={material}/>}
                </TabPane>
                <TabPane tab="Дополнения для устройств" key="wireless">
                    {wireless && <WirelessComposition wireless={wireless}/>}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default AdminCompositionDeviceData;