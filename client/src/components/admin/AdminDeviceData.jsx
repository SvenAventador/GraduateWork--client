import React from 'react';
import {
    getAllBrands,
    getAllColors,
    getAllMaterials,
    getAllTypes,
    getAllWireless,
    getOneDevice
} from "../../http/deviceApi";
import {Button, Space, Table} from "antd";
import {deleteBrand, deleteDevice, getAllDevice} from "../../http/adminApi";
import DeviceModal from "./modal/DeviceModal";
import Swal from "sweetalert2";

const AdminDeviceData = ({device, deviceType, deviceBrand, deviceColor, deviceMaterial, deviceWireless}) => {

    const [type, setType] = React.useState(deviceType)
    const [brand, setBrand] = React.useState(deviceBrand)
    const [wireless, setWireless] = React.useState(deviceWireless)
    const [material, setMaterial] = React.useState(deviceMaterial)
    const [color, setColor] = React.useState(deviceColor)
    const [devices, setDevices] = React.useState(device)
    const [isRefresh, setIsRefresh] = React.useState(false)
    const [isOpenModal, setIsOpenModal] = React.useState(false)
    const [oneDevice, setOneDevice] = React.useState(null)
    const [deviceId, setDeviceId] = React.useState(null)

    React.useEffect(() => {
        getAllTypes().then((data) => {
            setType(data)
        })
        getAllBrands().then((data) => {
            setBrand(data)
        })
        getAllWireless().then((data) => {
            setWireless(data)
        })
        getAllMaterials().then((data) => {
            setMaterial(data)
        })
        getAllColors().then((data) => {
            setColor(data)
        })
    }, [])

    React.useEffect(() => {
        if (isRefresh) {
            getAllDevice().then((data) => {
                setDevices(data)
            })
        }
    }, [isRefresh])

    const showUpdateModal = (deviceId) => {
        setIsOpenModal(true);
        if (deviceId) {
            getOneDevice(deviceId).then((data) => {
                setOneDevice(data)
            })
        } else {
            setOneDevice(null)
        }
    }

    const deleteItem = (deviceId) => {
        setDeviceId(deviceId)

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
                deleteDevice(deviceId).then(() => {
                    getAllDevice().then((data) => {
                        setDevices(data)
                        setIsRefresh(true)
                    }).finally(() => {
                        return Swal.fire({
                            icon: 'success',
                            title: 'Ваушки!',
                            text: 'Устройство успешно удален из системы!'
                        })
                    })
                })
            }
        })
    }

    const columns = [
        {
            title: '№ устройства',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Наименование устройства',
            dataIndex: 'deviceName',
            key: 'deviceName'
        },
        {
            title: 'Цена устройства',
            dataIndex: 'devicePrice',
            key: 'devicePrice'
        },
        {
            title: 'Количество устройств',
            dataIndex: 'deviceCount',
            key: 'deviceCount',
            render: (dataCount) => {
                let color;
                if (dataCount <= 10) {
                    color = "red";
                } else if (dataCount > 10 && dataCount < 20) {
                    color = "orange";
                } else {
                    color = "green";
                }
                return (
                    <span style={{ color }}>Осталось {dataCount} шт.</span>
                );
            }
        },
        {
            title: 'Тип устройства',
            dataIndex: 'typeId',
            key: 'typeId',
            render: (typeId) => {
                const selectType = type.find((type) => type.id === typeId)
                return (
                    <span color={selectType ? "#000" : "#ff0000"}>{selectType ? selectType.typeName : 'Отсутствует'}</span>
                )
            }
        },
        {
            title: 'Бренд устройства',
            dataIndex: 'brandId',
            key: 'brandId',
            render: (brandId) => {
                const selectBrand = brand.find((brand) => brand.id === brandId)
                return (
                    <span color={selectBrand ? "#000" : "#ff0000"}>{selectBrand ? selectBrand.brandName : 'Отсутствует'}</span>
                )
            }
        },
        {
            title: 'Цвет устройства',
            dataIndex: 'colorId',
            key: 'colorId',
            render: (colorId) => {
                const selectColor = color.find((color) => color.id === colorId)
                return (
                    <div style={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        alignItems: 'center'}}>
                        <div style={{
                            marginRight: '.5rem',
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            border: '1px solid #000',
                            backgroundColor: selectColor ? selectColor.hexValue : '#FFF'
                        }}/>
                        <span color={selectColor ? "#000" : "#ff0000"}>{selectColor ? selectColor.colorName : 'Отсутствует'}</span>
                    </div>
                )
            }
        },
        {
            title: 'Материал устройства',
            dataIndex: 'deviceMaterialId',
            key: 'deviceMaterialId',
            render: (deviceMaterialId) => {
                const selectMaterial = material.find((material) => material.id === deviceMaterialId)
                return (
                    <span color={selectMaterial ? "#000" : "#ff0000"}>{selectMaterial ? selectMaterial.materialName : 'Отсутствует'}</span>
                )
            }
        },
        {
            title: 'Дополнение устройства',
            dataIndex: 'wirelessTypeId',
            key: 'wirelessTypeId',
            render: (wirelessTypeId) => {
                const wirelessName = wireless.find((wireless) => wireless.id === wirelessTypeId)
                return (
                    <span color={wirelessName ? "#000" : "#ff0000"}>{wirelessName ? wirelessName.typeName : 'Отсутствует'}</span>
                )
            }
        },
        {
            title: 'Действия',
            key: 'action',
            render: (record) => (
                <Space size="small" style={{display: "flex", flexFlow: "column"}}>
                    <Button onClick={() => showUpdateModal(record.id)}>Изменить устройство</Button>
                    <Button onClick={() => deleteItem(record.id)}>Удалить устройство</Button>
                </Space>
            ),
        }
    ]

    const handleOk = () => {
        setIsOpenModal(false);
        getAllDevice().then((data) => {
            setDevices(data)
            setIsRefresh(true)
        })
    };
    const handleCancel = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <Table columns={columns}
                   style={{backgroundColor: 'white'}}
                   bordered
                   title={() => <Button onClick={() => showUpdateModal(null)}>Добавить новое устройство</Button>}
                   expandable={{
                       expandedRowRender: (record) => {
                           return (
                               <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                                   {record.images.map((images, index) => (
                                       <img style={{width: '100px', height: '100px', marginRight: '1rem'}}
                                            key={index}
                                            src={`${process.env.REACT_APP_API_PATH}/${images.imagePath}`}
                                            aria-label="Изобрадение купленного устройства"
                                            alt="Изображение купленного устройства"
                                       />

                                   ))}
                               </div>
                           );
                       },
                       rowExpandable: (record) => record.images.length !== 0,
                   }}
                   dataSource={devices.map((device) => ({...device, key: device.id}))}
                   pagination={{
                       defaultPageSize: 6, showSizeChanger: false
                   }}
            />
            <DeviceModal open={isOpenModal}
                         onOk={handleOk}
                         device={oneDevice}
                         type={type}
                         brand={brand}
                         color={color}
                         material={material}
                         wireless={wireless}
                         onCancel={handleCancel}/>
        </>
    );
};

export default AdminDeviceData;