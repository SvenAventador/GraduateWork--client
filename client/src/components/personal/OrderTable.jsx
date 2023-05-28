import React from 'react';
import {Table, Collapse, Tag} from 'antd';

const {Panel} = Collapse;

const OrderList = ({orders}) => {

    const DeliveryStatus = {
        1: { label: 'Заказ обрабатывается', color: 'red' },
        2: { label: 'Заказ обработан', color: 'blue' },
        3: { label: 'Заказ в доставке', color: 'orange' },
        4: { label: 'Заказ в городе', color: 'yellow' },
        5: { label: 'Заказ готов к получению', color: 'green' },
        6: { label: 'Заказ получен', color: 'lightgreen' },
    };
    
    const columns = [
        {
            title: 'Номер заказа',
            dataIndex: 'id',
            key: 'id',
            sorter: {
                compare: (a, b) => b.id - a.id,
                multiple: 1,
            }
        },
        {
            title: 'Дата заказа',
            dataIndex: 'dateOrder',
            key: 'dateOrder',
            sorter: {
                compare: (a, b) => {
                    const dateA = new Date(a.dateOrder);
                    const dateB = new Date(b.dateOrder);
                    return dateA - dateB;
                },
                multiple: 2
            }
        },
        {
            title: 'Цена заказа',
            dataIndex: 'orderPrice',
            key: 'orderPrice',
            render: (price) => (price ? `${price}₽` : '-'),
            sorter: {
                compare: (a, b) => a.orderPrice - b.orderPrice,
                multiple: 2
            }
        },
        {
            title: 'Статус доставки',
            dataIndex: 'deliveryStatusId',
            key: 'deliveryStatusId',
            render: (deliveryStatusId) => (
                <Tag color={DeliveryStatus[deliveryStatusId].color}>
                    {DeliveryStatus[deliveryStatusId].label}
                </Tag>
            ),
            sorter: {
                compare: (a, b) => a.deliveryStatusId - b.deliveryStatusId,
                multiple: 2
            }
        }
    ];

    return (
        <Table columns={columns}
               expandable={{
                   expandedRowRender: (record) => {
                       return (
                           <>
                               {record.order_devices.map((device, index) => (
                                   <div className="order__purchase"
                                        key={index}>
                                       <img
                                           src={`${process.env.REACT_APP_API_PATH}/${device.device.images[0].imagePath}`}
                                           className="order__purchase--img"
                                           aria-label="Изобрадение купленного устройства"
                                           alt="Изображение купленного устройства"
                                       />
                                       <div className="order__purchase--info">
                                           <p className="order_purchase--info-name">{device.device.deviceName}</p>
                                           <p className="order_purchase--info-price">{device.device.devicePrice}₽</p>
                                       </div>
                                   </div>
                               ))}
                           </>
                       );
                   },
                   rowExpandable: (record) => record.order_devices.length !== 0,
               }}
               dataSource={orders.map((order) => ({ ...order, key: order.id }))}
               pagination={{
                   defaultPageSize: 10, showSizeChanger: false
               }}
        />

    )
};

export default OrderList;