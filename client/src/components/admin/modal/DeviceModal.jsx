import React from 'react';
import {Button, Input, Modal, Select, Upload} from "antd";
import {DndContext, PointerSensor, useSensor} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {css} from '@emotion/css';
import {UploadOutlined} from "@ant-design/icons";
import {ReactComponent as Delete} from "../../../assets/svg/admin/delete.svg";
import {createDevice, updateDevice} from "../../../http/adminApi";
import Swal from "sweetalert2";

const {TextArea} = Input;

const DraggableUploadListItem = ({originNode, file}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging} = useSortable({
        id: file.uid,
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'move',
    };
    const imageDrag = isDragging
        ? css`
              a {
                pointer-events: none;
              }
        `
        : '';
    return (
        <div
            ref={setNodeRef}
            style={style}
            className={imageDrag}
            {...attributes}
            {...listeners}
        >
            {file.status === 'error' && isDragging ? originNode.props.children : originNode}
        </div>
    );
};

const DeviceModal = (props) => {
    const {
        open,
        onOk,
        device,
        onCancel,
        brand,
        type,
        color,
        material,
        wireless
    } = props
    const [fileList, setFileList] = React.useState([])
    const [fileNames, setFileNames] = React.useState([])
    const [info, setInfo] = React.useState([])

    const [deviceName, setDeviceName] = React.useState(device?.deviceName || '')
    const [devicePrice, setDevicePrice] = React.useState(device?.devicePrice || 0)
    const [deviceDescription, setDeviceDescription] = React.useState(device?.deviceDescription || '')
    const [deviceCount, setDeviceCount] = React.useState(device?.deviceCount || 0)

    const [typeId, setTypeId] = React.useState(null)
    const [brandId, setBrandId] = React.useState(null)
    const [colorId, setColorId] = React.useState(null)
    const [materialId, setMaterialId] = React.useState(null)
    const [wirelessId, setWirelessId] = React.useState(null)

    const clearData = () => {
        setFileList([])
        setFileNames([])
        setInfo([])
        setDeviceName('')
        setDeviceCount(0)
        setDeviceDescription('')
        setDevicePrice(0)
        setTypeId(null)
        setBrandId(null)
        setColorId(null)
        setMaterialId(null)
        setWirelessId(null)
        onOk()
    }

    React.useEffect(() => {
        if (device === null) {
            setDeviceName('');
            setDevicePrice(0);
            setDeviceCount(0)
            setDeviceDescription('');
            setFileList([]);
            setFileNames([]);
            setInfo([]);
            setTypeId(null);
            setBrandId(null)
            setColorId(null)
            setMaterialId(null)
            setWirelessId(null)
        } else {
            setDeviceName(device?.deviceName);
            setDevicePrice(device?.devicePrice);
            setDeviceDescription(device?.deviceDescription);
            setDeviceCount(device?.deviceCount)
            setTypeId(device?.typeId || null);
            setBrandId(device?.brandId || null)
            setColorId(device?.colorId || null)
            setMaterialId(device?.deviceMaterialId || null)
            setWirelessId(device?.wirelessTypeId || null)
        }
    }, [device]);

    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const onDragEnd = ({active, over}) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                const newFileList = arrayMove(prev, activeIndex, overIndex);

                const names = newFileList.map(file => file.name);
                setFileNames(names);

                return newFileList;
            });
        }
    };
    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);

        const names = newFileList.map(file => file.name)
        setFileNames(names)
    };

    const addInfo = () => {
        setInfo([...info, {infoTitle: '', infoDescription: '', number: Date.now()}])
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    };

    const onChangeSelect = (value, setValue) => {
        if (value === "Выберите тип устройства" ||
            value === "Выберите бренд устройства" ||
            value === "Выберите цвет устройства" ||
            value === "Выберите материал устройства" ||
            value === "Выберите дополнение устройства") {
            setValue(null);
        } else {
            setValue(value);
        }
    };

    const createAdminDevice = () => {

        if (!deviceName || deviceName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название устройства!'
            })
        }

        if (!devicePrice || devicePrice < 10000 || devicePrice > 1000000) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Минимальная цена на устройство в нашем магазине 10.000 рублей, а максимальная 1000000 рублей!'
            })
        }

        if (!deviceCount || deviceCount < 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Количество товара на складе должно быть больше 0!'
            })
        }

        if (!deviceDescription || deviceDescription === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите описание устройства!'
            })
        }

        if (!typeId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите тип устройства!'
            })
        }

        if (!brandId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите бренд устройства!'
            })
        }

        if (!color) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите цвет устройства!'
            })
        }

        if (!materialId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите материал устройства!'
            })
        }

        if (!wirelessId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите дополнение устройства!'
            })
        }

        if (fileList.length < 2) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите минимум 2 изображения устройства устройства!'
            })
        }

        if (info.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, создайте минимум одну характеристику устройства!'
            })
        }

        const isEmptyInfo = info.some((item) => item.infoTitle === '');
        const isEmptyDescription = info.some((item) => item.infoDescription === '')

        if (isEmptyInfo) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название свойства!!'
            })
        }

        if (isEmptyDescription) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите описание свойства!!'
            })
        }

        const formData = new FormData();
        formData.append('deviceName', deviceName)
        formData.append('devicePrice', devicePrice)
        formData.append('deviceDescription', deviceDescription)
        formData.append('deviceCount', deviceCount)
        formData.append('typeId', typeId)
        formData.append('brandId', brandId)
        formData.append('colorId', colorId)
        formData.append('deviceMaterialId', materialId)
        formData.append('wirelessTypeId', wirelessId)
        formData.append('info', JSON.stringify(info))
        fileList.forEach(file => {
            formData.append('image', file.originFileObj);
        });
        createDevice(formData).then(() => {
            return Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Устройство успешно создано!'
            }).then(() => {
                onOk()
            })
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: e.response.data.message
            });
        })
    }

    const updateAdminDevice = () => {

        if (!deviceName || deviceName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название устройства!'
            })
        }

        if (!devicePrice || devicePrice < 10000 || devicePrice > 1000000) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Минимальная цена на устройство в нашем магазине 10.000 рублей, а максимальная 1000000 рублей!'
            })
        }

        if (!deviceDescription || deviceDescription === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите описание устройства!'
            })
        }

        if (!typeId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите тип устройства!'
            })
        }

        if (!brandId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите бренд устройства!'
            })
        }

        if (!color) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите цвет устройства!'
            })
        }

        if (!materialId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите материал устройства!'
            })
        }

        if (!wirelessId) {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, выберите дополнение устройства!'
            })
        }

        const formData = new FormData();
        formData.append('id', device.id)
        formData.append('deviceName', deviceName)
        formData.append('devicePrice', devicePrice)
        formData.append('deviceCount', deviceCount)
        formData.append('deviceDescription', deviceDescription)
        formData.append('typeId', typeId)
        formData.append('brandId', brandId)
        formData.append('colorId', colorId)
        formData.append('deviceMaterialId', materialId)
        formData.append('wirelessTypeId', wirelessId)

        updateDevice(formData).then(() => {
            return Swal.fire({
                icon: 'success',
                title: 'Ваушки!',
                text: 'Устройство успешно обновлено!'
            }).then(() => {
                onOk()
            })
        }).catch((e) => {
            Swal.fire({
                icon: 'error',
                title: 'Внимение!',
                text: e.response.data.message
            });
        })
    }

    return (
        <div>
            <Modal
                title={device !== null ? 'Изменение устройства' : 'Добавление устройства'}
                visible={open}
                centered
                width={1245}
                maskClosable={false}
                onOk={clearData}
                onCancel={clearData}
                footer={[
                    <Button onClick={clearData}>Отмена</Button>,
                    <Button onClick={() => {
                        if (device !== null) {
                            updateAdminDevice()
                            clearData()
                        } else {
                            createAdminDevice()
                            clearData()
                        }
                    }}>
                        Сохранить данные
                    </Button>
                ]}
            >
                <Input value={deviceName}
                       onChange={(e) => setDeviceName(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите название устройства..."
                />
                <Input value={devicePrice}
                       onChange={(e) => setDevicePrice(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите цену устройства..."
                       prefix='₽'
                />
                <Input value={deviceCount}
                       prefix='Кол-во'
                       onChange={(e) => setDeviceCount(e.target.value)}
                       style={{marginBottom: '1rem'}}
                       placeholder="Введите количество устройства..."
                />
                <TextArea value={deviceDescription}
                          onChange={(e) => setDeviceDescription(e.target.value)}
                          style={{marginBottom: '1rem'}}
                          rows={5}
                          placeholder="Введите описание устройства..."
                          prefix='₽'
                />
                <div style={{
                    display: "flex",
                    flexFlow: 'row wrap',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    {
                        device === null ? (
                                <>
                                    <Select
                                        value={typeId !== null ? typeId : "Выберите тип устройства"}
                                        onChange={(value) => onChangeSelect(value, setTypeId)}
                                        style={{marginRight: '1rem', width: '225px'}}>
                                        {type.map((typeItem) => (
                                            <Select.Option value={typeItem.id} key={typeItem.id}>
                                                {typeItem.typeName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    <Select value={brandId !== null ? brandId : "Выберите бренд устройства"}
                                            onChange={(value) => onChangeSelect(value, setBrandId)}
                                            style={{marginRight: '1rem', width: '225px'}}>
                                        {
                                            brand.map((brandItem) => (
                                                <Select.Option value={brandItem.id}
                                                               key={brandItem.id}>{brandItem.brandName}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                    <Select value={colorId !== null ? colorId : "Выберите цвет устройства"}
                                            onChange={(value) => onChangeSelect(value, setColorId)}
                                            style={{marginRight: '1rem', width: '225px'}}>
                                        {
                                            color.map((colorItem) => (
                                                <Select.Option value={colorItem.id}
                                                               key={colorItem.id}>{colorItem.colorName}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                    <Select value={materialId !== null ? materialId : "Выберите материал устройства"}
                                            onChange={(value) => onChangeSelect(value, setMaterialId)}
                                            style={{marginRight: '1rem', width: '225px'}}>
                                        {
                                            material.map((materialItem) => (
                                                <Select.Option value={materialItem.id}
                                                               key={materialItem.id}>{materialItem.materialName}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                    <Select value={wirelessId !== null ? wirelessId : "Выберите дополнение устройства"}
                                            onChange={(value) => onChangeSelect(value, setWirelessId)}
                                            style={{width: '230px'}}>
                                        {
                                            wireless.map((wirelessItem) => (
                                                <Select.Option value={wirelessItem.id}
                                                               key={wirelessItem.id}>{wirelessItem.typeName}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </>
                            ) :
                            (<div style={{display: 'flex', flexFlow: 'column nowrap'}}>
                                    <div style={{
                                        display: 'flex',
                                        flexFlow: 'row nowrap', marginBottom: '1rem'
                                    }}>
                                        <p style={{marginRight: '1rem'}}>Выберите новый тип устройства</p>
                                        <Select
                                            value={typeId !== null ? typeId : "Выберите тип устройства"}
                                            onChange={(value) => onChangeSelect(value, setTypeId)}
                                            style={{marginRight: '1rem', width: '239px'}}>
                                            {type.map((typeItem) => (
                                                <Select.Option value={typeItem.id} key={typeItem.id}>
                                                    {typeItem.typeName}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        flexFlow: 'row nowrap', marginBottom: '1rem'
                                    }}>
                                        <p style={{marginRight: '1rem'}}>Выберите новый бренд устройства</p>
                                        <Select value={brandId !== null ? brandId : "Выберите бренд устройства"}
                                                onChange={(value) => onChangeSelect(value, setBrandId)}
                                                style={{marginRight: '1rem', width: '239px'}}>
                                            {
                                                brand.map((brandItem) => (
                                                    <Select.Option value={brandItem.id}
                                                                   key={brandItem.id}>{brandItem.brandName}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        flexFlow: 'row nowrap', marginBottom: '1rem'
                                    }}>
                                        <p style={{marginRight: '1rem'}}>Выберите новый цвет устройства</p>
                                        <Select value={colorId !== null ? colorId : "Выберите цвет устройства"}
                                                onChange={(value) => onChangeSelect(value, setColorId)}
                                                style={{marginRight: '1rem', width: '239px'}}>
                                            {
                                                color.map((colorItem) => (
                                                    <Select.Option value={colorItem.id}
                                                                   key={colorItem.id}>{colorItem.colorName}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        flexFlow: 'row nowrap', marginBottom: '1rem'
                                    }}>
                                        <p style={{marginRight: '1rem'}}>Выберите новый материал устройства</p>
                                        <Select
                                            value={materialId !== null ? materialId : "Выберите материал устройства"}
                                            onChange={(value) => onChangeSelect(value, setMaterialId)}
                                            style={{marginRight: '1rem', width: '239px'}}>
                                            {
                                                material.map((materialItem) => (
                                                    <Select.Option value={materialItem.id}
                                                                   key={materialItem.id}>{materialItem.materialName}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        flexFlow: 'row nowrap', marginBottom: '1rem'
                                    }}>
                                        <p style={{marginRight: '1rem'}}>Выберите новое дополнение устройства</p>
                                        <Select
                                            value={wirelessId !== null ? wirelessId : "Выберите дополнение устройства"}
                                            onChange={(value) => onChangeSelect(value, setWirelessId)}
                                            style={{width: '249px'}}>
                                            {
                                                wireless.map((wirelessItem) => (
                                                    <Select.Option value={wirelessItem.id}
                                                                   key={wirelessItem.id}>{wirelessItem.typeName}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                            )
                    }
                </div>
                {
                    device === null && (
                        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                            <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    fileList={fileList}
                                    listType='picture'
                                    onChange={onChange}
                                    maxCount={6}
                                    multiple
                                    className="upload-list-inline"
                                    itemRender={(originNode, file) => (
                                        <DraggableUploadListItem originNode={originNode} file={file}/>
                                    )}
                                >
                                    <Button icon={<UploadOutlined/>}>Загрузите изображение(-я)</Button>
                                </Upload>
                            </SortableContext>
                        </DndContext>
                    )
                }
                {
                    device === null && (
                        <>
                            <Button onClick={addInfo} style={{marginTop: '1rem'}}>Добавить характеристику</Button>
                            {info.map((i) => (
                                <div style={{display: "flex", flexFlow: "row nowrap", alignItems: 'center'}} key={i.number}>
                                    <Input
                                        style={{width: "350px", marginTop: '1rem', marginRight: '1rem'}}
                                        value={i.infoTitle}
                                        onChange={(e) => changeInfo('infoTitle', e.target.value, i.number)}
                                        placeholder="Введите название свойства"
                                    />
                                    <Input
                                        style={{width: "350px", marginTop: '1rem'}}
                                        value={i.infoDescription}
                                        onChange={(e) => changeInfo('infoDescription', e.target.value, i.number)}
                                        placeholder="Введите описание свойства"
                                    />
                                    <Button className="btn-reset" onClick={() => removeInfo(i.number)}>
                                        <Delete/>
                                    </Button>
                                </div>
                            ))}
                        </>
                    )
                }
            </Modal>
        </div>
    );
};

export default DeviceModal;
