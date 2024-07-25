import React from 'react';
import { Card, List } from 'antd';
import { STATUSCOLORS } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';

const OrderList = ({ orders }) => {
    const { t } = useTranslation(['order']);

    return (
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
                </Card>
            )}
        />
    );
};

export default OrderList;
