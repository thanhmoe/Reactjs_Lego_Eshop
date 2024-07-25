import React from 'react';
import { Modal, Form, Select, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const CheckoutModal = ({ isOpen, addresses, selectedAddress, note, onNoteChange, onAddressSelect, onClose, onCheckout, onAddNewAddress }) => {
    const { t } = useTranslation('cart');

    return (
        <Modal
            title={t('Checkout_Title')}
            open={isOpen}
            onOk={onCheckout}
            onCancel={onClose}
            okText={t('Place_Order_Button')}
            cancelText={t('Cancel_Button')}
        >
            <Form layout="vertical">
                <Form.Item
                    label={t('Select_Address_Label')}
                    rules={[{ required: true, message: t('Select_Address_Required_Message') }]}
                >
                    <Select
                        value={selectedAddress}
                        onChange={onAddressSelect}
                        style={{ width: '100%' }}
                        placeholder={t('Select_Address_Placeholder')}
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
                        {t('Add_New_Address_Button')}
                    </Button>
                </Form.Item>
                <Form.Item
                    label={t('Note_Label')}
                >
                    <Input.TextArea
                        value={note}
                        onChange={onNoteChange}
                        placeholder={t('Note_Placeholder')}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CheckoutModal;
