import React from 'react';
import { Modal, Form, Select, Button } from 'antd';

const { Option } = Select;

const CheckoutModal = ({ isOpen, addresses, selectedAddress, onAddressSelect, onClose, onCheckout, onAddNewAddress }) => (
    <Modal
        title="Checkout your order!"
        open={isOpen}
        onOk={onCheckout}
        onCancel={onClose}
        okText='Place Your Order!'
    >
        <Form layout="vertical">
            <Form.Item
                label="Select Address:"
                rules={[{ required: true, message: 'Please select your address before ordering!' }]}
            >
                <Select
                    value={selectedAddress}
                    onChange={onAddressSelect}
                    style={{ width: '100%' }}
                    placeholder="Select your address"
                >
                    {addresses.map(address => (
                        <Option key={address.id} value={address.id}>
                            {`${address.name} - ${address.phone_number}, ${address.commune_ward}, ${address.district}, ${address.province_city} ${address.detail}`}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Button type="dashed" onClick={onAddNewAddress} style={{ width: '100%' }}>
                Add New Address
            </Button>
        </Form>
    </Modal>
);

export default CheckoutModal;
