import React from 'react';
import { Modal, Form, Select, Input } from 'antd';

const { Option } = Select;

const AddAddressModal = ({
    isOpen, provinces, districts, wards, newAddress,
    onProvinceChange, onDistrictChange, onWardChange, onDetailChange, onNameChange, onPhoneNumberChange, onSave, onClose
}) => {
    const [form] = Form.useForm();

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
            title="Add New Address"
            open={isOpen}
            onOk={handleOk}
            onCancel={onClose}
        >
            <Form layout="vertical" form={form} initialValues={newAddress}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input
                        value={newAddress.name}
                        onChange={onNameChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phonenumber"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                    <Input
                        value={newAddress.phonenumber}
                        onChange={onPhoneNumberChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Province"
                    name="province"
                    rules={[{ required: true, message: 'Please select a province' }]}
                >
                    <Select
                        value={newAddress.province}
                        onChange={onProvinceChange}
                        style={{ width: '100%' }}
                    >
                        {provinces.map(province => (
                            <Option
                                key={province.id} value={province.id}>{province.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="District"
                    name="district"
                    rules={[{ required: true, message: 'Please select a district' }]}
                >
                    <Select
                        value={newAddress.district}
                        onChange={onDistrictChange}
                        style={{ width: '100%' }}
                    >
                        {districts.map(district => (
                            <Option key={district.id} value={district.id}>{district.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Ward"
                    name="ward"
                    rules={[{ required: true, message: 'Please select a ward' }]}
                >
                    <Select
                        value={newAddress.ward}
                        onChange={onWardChange}
                        style={{ width: '100%' }}
                    >
                        {wards.map(ward => (
                            <Option key={ward.id} value={ward.id}>{ward.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Detail Address"
                    name="detail"
                >
                    <Input
                        value={newAddress.detail}
                        onChange={onDetailChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAddressModal;
