import React from 'react';
import { Modal, Form, Select, Button, Input } from 'antd';

const { Option } = Select;

const CheckoutModal = ({ isOpen, addresses, selectedAddress, note, onNoteChange, onAddressSelect, onClose, onCheckout, onAddNewAddress }) => (
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
            <Form.Item>
                <Button type="dashed" onClick={onAddNewAddress} style={{ width: '100%' }}>
                    Add New Address
                </Button>
            </Form.Item>
            <Form.Item
                label="Note (optional):"
            >
                <Input.TextArea
                    value={note}
                    onChange={onNoteChange}
                    placeholder="Add a note for your order"
                />
            </Form.Item>
        </Form>
    </Modal>
);

export default CheckoutModal;
