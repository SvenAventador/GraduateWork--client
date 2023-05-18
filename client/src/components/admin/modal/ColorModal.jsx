import React from 'react';
import {Button, Input, Modal} from "antd";
import {createBrand, updateBrand} from "../../../http/adminApi";
import Swal from "sweetalert2";

const ColorModal = (props) => {
    const {open, onOk, colorId, nameColor, valueHex, onCancel} = props;
    const [colorName, setColorName] = React.useState('');

    React.useEffect(() => {
        setColorName(colorName)
    }, [colorName])

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
                title={brandId !== null ? 'Изменение бренда устройств' : 'Добавление бренда устройства'}
                visible={open}
                centered
                onOk={onOk}
                onCancel={onCancel}
                footer={[
                    <Button onClick={onCancel}>Отмена</Button>,
                    <Button
                        onClick={() => {
                            if (brandId !== null) {
                                updateAdminBrand();
                            } else {
                                createAdminBrand();
                            }
                            onOk()
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

export default ColorModal;
