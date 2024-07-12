import React from 'react';
import { Modal, Form, Select, Button } from 'antd';

const { Option } = Select;

const CheckoutModal = ({ isOpen, addresses, selectedAddress, onAddressSelect, onClose, onAddNewAddress }) => (
    <Modal
        title="Checkout"
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
    >
        <Form layout="vertical">
            <Form.Item label="Select Address">
                <Select
                    value={selectedAddress}
                    onChange={onAddressSelect}
                    style={{ width: '100%' }}
                >
                    {addresses.map(address => (
                        <Option key={address.id} value={address.id}>
                            {`${address.commune_ward}, ${address.district}, ${address.province_city} ${address.detail}`}
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
