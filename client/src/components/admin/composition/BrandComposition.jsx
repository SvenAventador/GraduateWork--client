import React from 'react';
import {Button, Space, Table} from "antd";
import {getAllBrands} from "../../../http/deviceApi";
import {deleteBrand} from "../../../http/adminApi";
import Swal from "sweetalert2";
import BrandModal from "../modal/BrandModal";

const BrandComposition = ({brands}) => {
    const [brandList, setBrandList] = React.useState(brands)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [brandId, setBrandId] = React.useState(null)
    const [name, setName] = React.useState('')

    React.useEffect(() => {
        if (isRefresh) {
            getAllBrands().then((data) => {
                setIsRefresh(false)
                setBrandList(data)
            })
        }
    }, [isRefresh])

    const deleteItem = (brandId) => {
        setBrandId(brandId)

        return Swal.fire({
            icon: 'question',
            title: 'Маленькое уточнение!',
            text: 'Вы точно хотите удалить данный бренд?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Нет, не хочу!',
            confirmButtonText: 'Да, хочу!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBrand(brandId).then(() => {
                    getAllBrands().then((data) => {
                        setBrandList(data)
                        setIsRefresh(true)
                    }).finally(() => {
                        return Swal.fire({
                            icon: 'success',
                            title: 'Ваушки!',
                            text: 'Бренд успешно удален из системы!'
                        })
                    })
                })
            }
        })
    }

    const showUpdateModal = (brandId, brandName) => {
        setIsOpenModal(true);
        if (brandName) {
            setName(brandName);
        } else {
            setName('');
        }
        if (brandId) {
            setBrandId(brandId)
        } else {
            setBrandId(null)
        }
    }

    const columns = [
        {
            title: '№ типа',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование бренда',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button onClick={() => showUpdateModal(record.id, record.brandName)}>Изменить наименование
                        бренда</Button>
                    <Button onClick={() => {
                        deleteItem(record.id)
                    }}>Удалить бренд устройства</Button>
                </Space>
            ),
        },
    ];

    const handleOk = () => {
        setIsOpenModal(false);
        getAllBrands().then((data) => {
            setBrandList(data)
            setIsRefresh(true)
        })
    };
    const handleCancel = () => {
        setIsOpenModal(false);
    };
    return (
        <div>
            <Table bordered
                   title={() => <Button onClick={() => showUpdateModal(null, null)}>Добавить бренд устройства</Button>}
                   dataSource={brandList.map((brands) => ({...brands, key: brands.id}))}
                   pagination={{
                       defaultPageSize: 6, showSizeChanger: false
                   }}
                   columns={columns}/>
            <BrandModal open={isOpenModal}
                        onOk={handleOk}
                        nameBrand={name}
                        brandId={brandId}
                        onCancel={handleCancel}/>
        </div>
    );
};

export default BrandComposition;