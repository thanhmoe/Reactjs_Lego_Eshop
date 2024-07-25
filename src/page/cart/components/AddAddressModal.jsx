import React from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const AddAddressModal = ({
    isOpen, provinces, districts, wards, newAddress,
    onInputChange, onSave, onClose
}) => {
    const [form] = Form.useForm();
    const { t } = useTranslation('cart');

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                onSave();
            })
            .catch(info => {
                console.log('Validation Failed:', info);
            });
    };

    return (
        <Modal
            title={t('Add_Address_Title')}
            open={isOpen}
            onOk={handleOk}
            onCancel={onClose}
            cancelText={t('Cancel_Button')}
        >
            <Form layout="vertical" form={form} initialValues={newAddress}>
                <Form.Item
                    label={t('Name_Label')}
                    name="name"
                    rules={[{ required: true, message: t('Name_Required_Message') }]}
                >
                    <Input
                        value={newAddress.name}
                        onChange={(e) => onInputChange('name', e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label={t('Phone_Number_Label')}
                    name="phone_number"
                    rules={[{ required: true, message: t('Phone_Number_Required_Message') }]}
                >
                    <Input
                        value={newAddress.phone_number}
                        onChange={(e) => onInputChange('phone_number', e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label={t('Province_Label')}
                    name="province"
                    rules={[{ required: true, message: t('Province_Required_Message') }]}
                >
                    <Select
                        value={newAddress.province}
                        onChange={(value) => onInputChange('province', value)}
                        style={{ width: '100%' }}
                    >
                        {provinces.map(province => (
                            <Option
                                key={province.id} value={province.id}>{province.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t('District_Label')}
                    name="district"
                    rules={[{ required: true, message: t('District_Required_Message') }]}
                >
                    <Select
                        value={newAddress.district}
                        onChange={(value) => onInputChange('district', value)}
                        style={{ width: '100%' }}
                    >
                        {districts.map(district => (
                            <Option key={district.id} value={district.id}>{district.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t('Ward_Label')}
                    name="ward"
                    rules={[{ required: true, message: t('Ward_Required_Message') }]}
                >
                    <Select
                        value={newAddress.ward}
                        onChange={(value) => onInputChange('ward', value)}
                        style={{ width: '100%' }}
                    >
                        {wards.map(ward => (
                            <Option key={ward.id} value={ward.id}>{ward.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t('Detail_Address_Label')}
                    name="detail"
                    rules={[{ required: true, message: t('Detail_Address_Required_Message') }]}
                >
                    <Input
                        value={newAddress.detail}
                        onChange={(e) => onInputChange('detail', e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAddressModal;
