import React from 'react';
import {Button, Space, Table} from "antd";
import {getAllWireless} from "../../../http/deviceApi";
import {deleteWireless} from "../../../http/adminApi";
import Swal from "sweetalert2";
import WirelessModal from "../modal/WirelessModal";

const WirelessComposition = ({wireless}) => {
    const [wirelessList, setWirelessList] = React.useState(wireless)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [wirelessId, setWirelessId] = React.useState(null)
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        if (isRefresh) {
            getAllWireless().then((data) => {
                setIsRefresh(false)
                setWirelessList(data)
            })
        }
    }, [isRefresh])

    const deleteItem = (wirelessId) => {
        setWirelessId(wirelessId)

        return Swal.fire({
            icon: 'question',
            title: 'Маленькое уточнение!',
            text: 'Вы точно хотите удалить данное дополнение?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Нет, не хочу!',
            confirmButtonText: 'Да, хочу!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWireless(wirelessId).then(() => {
                    getAllWireless().then((data) => {
                        setWirelessId(data)
                        setIsRefresh(true)
                    }).finally(() => {
                        return Swal.fire({
                            icon: 'success',
                            title: 'Ваушки!',
                            text: 'Дополнение успешно удалено из системы!'
                        })
                    })
                })
            }
        })
    }

    const showUpdateModal = (wirelessId, wirelessName) => {
        setIsOpenModal(true);
        if (wirelessName) {
            setName(wirelessName);
        } else {
            setName('');
        }
        if (wirelessId) {
            setWirelessId(wirelessId)
        } else {
            setWirelessId(null)
        }
    }

    const columns = [
        {
            title: '№ типа',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование дополнения',
            dataIndex: 'typeName',
            key: 'typeName',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button onClick={() => showUpdateModal(record.id, record.typeName)}>Изменить наименование
                        дополнения</Button>
                    <Button onClick={() => {
                        deleteItem(record.id)
                    }}>Удалить дополнение устройства</Button>
                </Space>
            ),
        },
    ];

    const handleOk = () => {
        setIsOpenModal(false);
        getAllWireless().then((data) => {
            setWirelessList(data)
            setIsRefresh(true)
        })
    };
    const handleCancel = () => {
        setIsOpenModal(false);
    };
    return (
        <div>
            <Table bordered
                   title={() => <Button onClick={() => showUpdateModal(null, null)}>Добавить дополнение устройства</Button>}
                   dataSource={wirelessList.map((wireless) => ({...wireless, key: wireless.id}))}
                   pagination={{
                       defaultPageSize: 6, showSizeChanger: false
                   }}
                   columns={columns}/>
            <WirelessModal open={isOpenModal}
                           onOk={handleOk}
                           nameWireless={name}
                           wirelessId={wirelessId}
                           onCancel={handleCancel}/>
        </div>
    );
};

export default WirelessComposition;