import React from 'react';
import {Button, Space, Table} from "antd";
import {getAllMaterials} from "../../../http/deviceApi";
import {deleteMaterial} from "../../../http/adminApi";
import Swal from "sweetalert2";
import MaterialModal from "../modal/MaterialModal";

const MaterialComposition = ({materials}) => {
    const [materialList, setMaterialList] = React.useState(materials)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [materialId, setMaterialId] = React.useState(null)
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        if (isRefresh) {
            getAllMaterials().then((data) => {
                setIsRefresh(false)
                setMaterialList(data)
            })
        }
    }, [isRefresh])

    const deleteItem = (materialId) => {
        setMaterialId(materialId)

        return Swal.fire({
            icon: 'question',
            title: 'Маленькое уточнение!',
            text: 'Вы точно хотите удалить данный материал?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Нет, не хочу!',
            confirmButtonText: 'Да, хочу!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMaterial(materialId).then(() => {
                    getAllMaterials().then((data) => {
                        setMaterialId(data)
                        setIsRefresh(true)
                    }).finally(() => {
                        return Swal.fire({
                            icon: 'success',
                            title: 'Ваушки!',
                            text: 'Материал успешно удален из системы!'
                        })
                    })
                })
            }
        })
    }

    const showUpdateModal = (materialId, materialName) => {
        setIsOpenModal(true);
        if (materialName) {
            setName(materialName);
        } else {
            setName('');
        }
        if (materialId) {
            setMaterialId(materialId)
        } else {
            setMaterialId(null)
        }
    }

    const columns = [
        {
            title: '№ типа',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование материала',
            dataIndex: 'materialName',
            key: 'materialName',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button onClick={() => showUpdateModal(record.id, record.materialName)}>Изменить наименование
                        материала</Button>
                    <Button onClick={() => {
                        deleteItem(record.id)
                    }}>Удалить материал устройства</Button>
                </Space>
            ),
        },
    ];

    const handleOk = () => {
        setIsOpenModal(false);
        getAllMaterials().then((data) => {
            setMaterialList(data)
            setIsRefresh(true)
        })
    };
    const handleCancel = () => {
        setIsOpenModal(false);
    };
    return (
        <div>
            <Table bordered
                   title={() => <Button onClick={() => showUpdateModal(null, null)}>Добавить материал устройства</Button>}
                   dataSource={materialList.map((material) => ({...material, key: material.id}))}
                   pagination={{
                       defaultPageSize: 6, showSizeChanger: false
                   }}
                   columns={columns}/>
            <MaterialModal open={isOpenModal}
                        onOk={handleOk}
                        nameMaterial={name}
                        materialId={materialId}
                        onCancel={handleCancel}/>
        </div>
    );
};

export default MaterialComposition;