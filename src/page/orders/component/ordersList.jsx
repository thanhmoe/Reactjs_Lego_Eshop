import React from 'react';
import { Card, List, Badge } from 'antd';
import { STATUSCOLORS } from '../../../utils/constants';
const OrderList = ({ orders }) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={orders}
            renderItem={order => (
                <Card
                    key={order.order_id}
                    title={`Order #${order.order_id}`}
                    style={{ marginBottom: '16px' }}
                >
                    <p><strong>Customer Name:</strong> {order.customer_name}</p>
                    <p><strong>Address:</strong> {order.address_detail}, {order.commune_ward}, {order.district}, {order.province_city}</p>
                    <p><strong>Phone Number:</strong> {order.phone_number}</p>
                    <p><strong>Total Amount:</strong> ${order.total_amount}</p>
                    <p><strong>Status: </strong>
                        <span className={STATUSCOLORS[order.status] || 'badge-default'}>
                            {order.status}
                        </span></p>
                    <p><strong>Order Date:</strong> {new Date(order.create_at).toLocaleString()}</p>
                    <List
                        itemLayout="horizontal"
                        dataSource={order.products}
                        renderItem={product => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<img src={product.image_path} alt={product.product_name} style={{ width: '50px', height: '50px' }} />}
                                    title={product.product_name}
                                    description={`Quantity: ${product.quantity} - Price: $${product.price}`}
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
