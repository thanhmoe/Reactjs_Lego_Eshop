import React, { useState } from 'react';
import { Button, Card, Collapse, List, Modal } from 'antd';
import { STATUSCOLORS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';

const OrderList = ({ orders, cancelOrder, confirmOrder }) => {
    const { t } = useTranslation(['order']);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const showCancelModal = (order) => {
        setSelectedOrder(order);
        isCancelModalVisible(true);
    };

    const showConfirmModal = (order) => {
        setSelectedOrder(order);
        setIsConfirmModalVisible(true);
    };

    const handleCancelOrder = () => {
        cancelOrder(selectedOrder.order_id);
        setIsModalVisible(false);
    };

    const handleConfirmOrder = () => {
        confirmOrder(selectedOrder.order_id);
        setIsConfirmModalVisible(false);
    };

    const handleCancelModal = () => {
        setIsCancelModalVisible(false);
    };
    const handleConfirmModal = () => {
        setIsConfirmModalVisible(false);
    }

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
                        {order.products.length > 0 && (
                            <>
                                {/* Render the first product */}
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<img src={order.products[0].image_path} alt={order.products[0].product_name} style={{ width: '50px', height: '50px' }} />}
                                        title={order.products[0].product_name}
                                        description={`${t('Quantity')}: ${order.products[0].quantity} - ${t('Price')}: $${order.products[0].price}`}
                                    />
                                </List.Item>

                                {/* Collapse component for the rest of the products */}
                                {order.products.length > 1 && (
                                    <Collapse>
                                        <Collapse.Panel header={t('More_Products')} key="1">
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={order.products.slice(1)}
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
                                        </Collapse.Panel>
                                    </Collapse>
                                )}
                            </>
                        )}
                        {order.status === 'pending' &&
                            <Button style={{ marginTop: '1rem' }} onClick={() => showCancelModal(order)} type='dashed'>
                                {t('Cancel_Ordered_button')}
                            </Button>}
                        {order.status === 'shipping' &&
                            <Button style={{ marginTop: '1rem' }} onClick={() => showConfirmModal(order)} type='primary'>
                                {t('Confirm_Ordered_Button')}
                            </Button>}
                    </Card>
                )}
            />
            <Modal
                title={t('Confirm_Cancel_Order')}
                open={isCancelModalVisible}
                onOk={handleCancelOrder}
                onCancel={handleCancelModal}
                okText={t('Btn_Yes')}
                cancelText={t('Btn_No')}
            >
                <p>{t('Are_you_sure_you_want_to_cancel_order')} #{selectedOrder?.order_id}?</p>
            </Modal>
            <Modal
                title={t('Confirm_Received_Order')}
                open={isConfirmModalVisible}
                onOk={handleConfirmOrder}
                onCancel={handleConfirmModal}
                okText={t('Btn_Yes')}
                cancelText={t('Btn_No')}
            >
                <p>{t('Are_you_sure_you_have_received_order')} #{selectedOrder?.order_id}?</p>
            </Modal>
        </>
    );
};

export default OrderList;
