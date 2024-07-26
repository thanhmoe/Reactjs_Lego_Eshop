import React, { useState } from 'react';
import { Button, Card, List, Modal } from 'antd';
import { STATUSCOLORS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';

const OrderList = ({ orders }) => {
    const { t } = useTranslation(['order']);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const showModal = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleCancelOrder = () => {
        // cancel order logic here
        setIsModalVisible(false);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={orders}
                renderItem={order => (
                    <Card
                        key={order.order_id}
                        title={`${t('Order')} #${order.order_id}`}
                        style={{ marginBottom: '16px' }}
                    >
                        <p><strong>{t('Customer_Name')}:</strong> {order.customer_name}</p>
                        <p><strong>{t('Address')}:</strong> {order.address_detail}, {order.commune_ward}, {order.district}, {order.province_city}</p>
                        <p><strong>{t('Phone_Number')}:</strong> {order.phone_number}</p>
                        <p><strong>{t('Total_Amount')}:</strong> ${order.total_amount}</p>
                        <p><strong>{t('Note')}:</strong> {order.note}</p>
                        <p><strong>{t('Status')}:</strong>
                            <span className={STATUSCOLORS[order.status] || 'badge-default'}>
                                {t(`Status_${order.status}`) || order.status}
                            </span>
                        </p>
                        <p><strong>{t('Order_Date')}:</strong> {new Date(order.create_at).toLocaleString()}</p>
                        <List
                            itemLayout="horizontal"
                            dataSource={order.products}
                            renderItem={product => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={product.image_path} alt={product.product_name} style={{ width: '50px', height: '50px' }} />}
                                        title={product.product_name}
                                        description={`${t('Quantity')}: ${product.quantity} - ${t('Price')}: $${product.price}`}
                                    />
                                </List.Item>
                            )}
                        />
                        {order.status === 'pending' &&
                            <Button onClick={() => showModal(order)} type='dashed'>
                                {t('Cancel_Ordered_button')}
                            </Button>}
                    </Card>
                )}
            />
            <Modal
                title={t('Confirm_Cancel_Order')}
                visible={isModalVisible}
                onOk={handleCancelOrder}
                onCancel={handleCancelModal}
                okText={t('Yes')}
                cancelText={t('No')}
            >
                <p>{t('Are_you_sure_you_want_to_cancel_order')} #{selectedOrder?.order_id}?</p>
            </Modal>
        </>
    );
};

export default OrderList;
