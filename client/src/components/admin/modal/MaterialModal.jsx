import React from 'react';
import {Button, Input, Modal} from "antd";
import {createMaterial, updateMaterial} from "../../../http/adminApi";
import Swal from "sweetalert2";

const MaterialModal = (props) => {
    const {open, onOk, nameMaterial, materialId, onCancel} = props;
    const [materialName, setMaterialName] = React.useState('');

    React.useEffect(() => {
        if (nameMaterial !== null) {
            setMaterialName(nameMaterial)
        }
    }, [nameMaterial])

    const createAdminMaterial = () => {
        if (materialName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название материала!'
            });
        }

        createMaterial(materialName)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Материал успешно создан!'
                }).then(() => {
                    onOk()
                });
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Внимение!',
                    text: e.response.data.message
                });
            });
    };

    const updateAdminMaterial = () => {
        if (materialName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название материала!'
            });
        }

        updateMaterial(parseInt(materialId), materialName)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Материал успешно обновлен!'
                }).then(() => {
                    onOk()
                });
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Внимение!',
                    text: e.response.data.message
                });
            });
    };

    return (
        <div>
            <Modal
                title={materialId !== null ? 'Изменение материала устройств' : 'Добавление материала устройства'}
                visible={open}
                centered
                maskClosable={false}
                onOk={onOk}
                onCancel={onCancel}
                footer={[
                    <Button onClick={onCancel}>Отмена</Button>,
                    <Button
                        onClick={() => {
                            if (materialId !== null) {
                                updateAdminMaterial();
                            } else {
                                createAdminMaterial();
                            }
                            onOk()
                        }}>
                        Сохранить данные
                    </Button>
                ]}
            >
                <Input
                    placeholder="Введите название материала..."
                    maxLenght="6"
                    value={materialName}
                    onChange={(e) => setMaterialName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default MaterialModal;
