import React from 'react';
import {Select, Table} from "antd";
import {getOneOrder} from "../../http/orderApi";
import Swal from "sweetalert2";

const AdminUserData = ({orders}) => {
    const [selectedOrderId, setSelectedOrderId] = React.useState(null);
    const [selectedDeliveryStatusId, setSelectedDeliveryStatusId] = React.useState(null);

    const changeSelectId = (value, option, recordId) => {
        setSelectedDeliveryStatusId(option.id);
        setSelectedOrderId(recordId);

        getOneOrder(recordId, option.id)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: 'Ваушки!',
                    text: 'Статус заказа успешно изменен!',
                    customClass: {
                        popup: "custom-class"
                    }
                });
            });
    };

    const handleGetValues = () => {
        console.log("Номер заказа:", selectedOrderId);
        console.log("Выбранное значение комбобокса:", selectedDeliveryStatusId);
    };

    const userColumns = [
        {
            title: '№ клиента',
            dataIndex: 'id',
            key: 'id',
            sorter: {
                compare: (a, b) => b.id - a.id,
                multiple: 1,
            }
        },
        {
            title: 'Фамилия Имя Отчество',
            dataIndex: 'userFio',
            key: 'userFio'
        },
        {
            title: 'Почта пользователя',
            dataIndex: 'userEmail',
            key: 'userEmail'
        },
        {
            title: 'Телефон пользователя',
            dataIndex: 'userPhone',
            key: 'userPhone'
        }
    ]

    const DeliveryStatus = [
        {
            id: 1,
            value: 'Заказ обрабатывается',
            label: 'Заказ обрабатывается',
            key: 1
        },
        {
            id: 2,
            value: 'Заказ обработан',
            label: 'Заказ обработан',
            key: 2
        },
        {
            id: 3,
            value: 'Заказ в доставке',
            label: 'Заказ в доставке',
            key: 3
        },
        {
            id: 4,
            value: 'Заказ готов к получению',
            label: 'Заказ готов к получению',
            key: 4
        },
        {
            id: 5,
            value: 'Заказ в городе',
            label: 'Заказ в городе',
            key: 5
        },
        {
            id: 6,
            value: 'Заказ получен',
            label: 'Заказ получен',
            key: 6
        }
    ];

    const orderColumn = [
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
            render: (deliveryStatusId, record) => {
                const selectedOption = DeliveryStatus.find(option => option.id === deliveryStatusId);
                const defaultValue = selectedOption ? selectedOption.value : ''
                return (
                    <Select
                        defaultValue={defaultValue}
                        getPopupContainer={(triggerNode) => triggerNode.parentNode}
                        onChange={(value, option) => {
                            changeSelectId(value, option, record.id)
                        }}
                        onSelect={(value) => handleGetValues(value)}
                        style={{
                            width: 400,
                            border: "none",
                        }}
                        options={[
                            {
                                id: 1,
                                value: 'Заказ обрабатывается',
                                label: 'Заказ обрабатывается',
                                key: 1
                            },
                            {
                                id: 2,
                                value: 'Заказ обработан',
                                label: 'Заказ обработан',
                                key: 2
                            },
                            {
                                id: 3,
                                value: 'Заказ в доставке',
                                label: 'Заказ в доставке',
                                key: 3
                            },
                            {
                                id: 4,
                                value: 'Заказ в городе',
                                label: 'Заказ в городе',
                                key: 4
                            },
                            {
                                id: 5,
                                value: 'Заказ готов к получению',
                                label: 'Заказ готов к получению',
                                key: 5
                            },
                            {
                                id: 6,
                                value: 'Заказ получен',
                                label: 'Заказ получен',
                                key: 6
                            }
                        ]}
                    />
                )
            },
            sorter: {
                compare: (a, b) => a.deliveryStatusId - b.deliveryStatusId,
                multiple: 2
            }
        }
    ]

    const expandableRowRender = (record) => {
        return <Table dataSource={record.orders.map((order) => ({...order, key: order.id}))}
                      columns={orderColumn}
                      pagination={false}/>
    }


    return (
        <Table style={{backgroundColor: 'white'}}
               dataSource={orders.map((order) => ({...order, key: order.id}))}
               columns={userColumns}
               pagination={{
                   defaultPageSize: 6, showSizeChanger: false
               }}
               expandedRowRender={expandableRowRender}
        />
    );
};

export default AdminUserData;