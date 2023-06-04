import React from 'react';
import {Button, Input, Modal} from "antd";
import {createBrand, updateBrand} from "../../../http/adminApi";
import Swal from "sweetalert2";

const BrandModal = (props) => {
    const {open, onOk, nameBrand, brandId, onCancel} = props;
    const [brandName, setBrandName] = React.useState('');

    const clearData = () => {
        setBrandName('')
        onOk()
    }

    React.useEffect(() => {
        setBrandName(nameBrand)
    }, [nameBrand])

    const createAdminBrand = () => {
        if (brandName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название бренда!'
            });
        }

        createBrand(brandName)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Бренд успешно создан!'
                }).then(() => {
                    onOk()
                });
            })
            .catch((e) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Внимение!',
                    text: e.response.data.message
                });
            });
    };

    const updateAdminBrand = () => {
        if (brandName === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Внимание!',
                text: 'Пожалуйста, введите название бренда!'
            });
        }

        updateBrand(parseInt(brandId), brandName)
            .then((data) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Ваушки!',
                    text: 'Бренд успешно обновлен!'
                }).then(() => {
                    onOk()
                });
            })
            .catch((e) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Внимение!',
                    text: e.response.data.message
                });
            });
    };

    return (
        <div>
            <Modal
                title={brandId !== null ? 'Изменение бренда устройств' : 'Добавление бренда устройства'}
                visible={open}
                centered
                maskClosable={false}
                onOk={clearData}
                onCancel={clearData}
                footer={[
                    <Button onClick={clearData}>Отмена</Button>,
                    <Button
                        onClick={() => {
                            if (brandId !== null) {
                                updateAdminBrand();
                            } else {
                                createAdminBrand();
                            }
                            clearData()
                        }}>
                        Сохранить данные
                    </Button>
                ]}
            >
                <Input
                    placeholder="Введите название бренда..."
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default BrandModal;
