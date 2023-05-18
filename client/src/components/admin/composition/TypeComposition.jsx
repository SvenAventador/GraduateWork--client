import React from 'react';
import {Button, Space, Table} from "antd";
import TypeModal from "../modal/TypeModal";
import {getAllTypes} from "../../../http/deviceApi";
import {deleteType} from "../../../http/adminApi";
import Swal from "sweetalert2";

const TypeComposition = ({types}) => {
    const [typeList, setTypeList] = React.useState(types)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [typeId, setTypeId] = React.useState(null)
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        if (isRefresh) {
            getAllTypes().then((data) => {
                setIsRefresh(false)
                setTypeList(data)
            })
        }
    }, [isRefresh])

    const deleteItem = (typeId) => {
        setTypeId(typeId)

        return Swal.fire({
            icon: 'question',
            title: 'Маленькое уточнение!',
            text: 'Вы точно хотите удалить данный тип?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Нет, не хочу!',
            confirmButtonText: 'Да, хочу!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteType(typeId).then(() => {
                    getAllTypes().then((data) => {
                        setTypeList(data)
                        setIsRefresh(true)
                    }).finally(() => {
                        return Swal.fire({
                            icon: 'success',
                            title: 'Ваушки!',
                            text: 'Тип успешно удален из системы!'
                        })
                    })
                })
            }
        })
    }

    const showUpdateModal = (typeId, typeName) => {
        setIsOpenModal(true);
        if (typeName) {
            setName(typeName);
        } else {
            setName('');
        }
        if (typeId) {
            setTypeId(typeId)
        } else {
            setTypeId(null)
        }
    }

    const columns = [
        {
            title: '№ типа',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование типа',
            dataIndex: 'typeName',
            key: 'typeName',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button onClick={() => showUpdateModal(record.id, record.typeName)}>Изменить наименование
                        типа</Button>
                    <Button onClick={() => {
                        deleteItem(record.id)
                    }}>Удалить тип устройства</Button>
                </Space>
            ),
        },
    ];

    const handleOk = () => {
        setIsOpenModal(false);
        getAllTypes().then((data) => {
            setTypeList(data)
            setIsRefresh(true)
        })
    };
    const handleCancel = () => {
        setIsOpenModal(false);
    };
    return (
        <div>
            <Table bordered
                   title={() => <Button onClick={() => showUpdateModal(null, null)}>Добавить тип устройства</Button>}
                   dataSource={typeList.map((types) => ({...types, key: types.id}))}
                   pagination={{
                       defaultPageSize: 6, showSizeChanger: false
                   }}
                   columns={columns}/>
            <TypeModal open={isOpenModal}
                       onOk={handleOk}
                       nameType={name}
                       typeId={typeId}
                       onCancel={handleCancel}/>
        </div>
    );
};

export default TypeComposition;