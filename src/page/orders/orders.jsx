import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderList from "./component/ordersList";
import "./orders.css";
import { Button, Result, Tabs } from "antd";
import { ShoppingOutlined } from '@ant-design/icons';
import { getOrders } from "../../services/orders";
import { getToken } from "../../utils/token_utils";
import { useTranslation } from 'react-i18next';

const Orders = () => {
    const { t } = useTranslation(['order']);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [orderStatus, setOrdersStatus] = useState('');
    const token = getToken();
    const navigate = useNavigate();

    const fetchOrders = async (orderStatus) => {
        try {
            const res = await getOrders({ page, limit: itemsPerPage, sortStatus: orderStatus });
            if (res.success) {
                setOrders(res.orders);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders(orderStatus);
        }
    }, [token, orderStatus]);

    const onChange = (key) => {
        const status = getStatusFromTabKey(key);
        setActiveTab(key);
        setOrdersStatus(status);
        fetchOrders(status);
    };

    const getStatusFromTabKey = (key) => {
        switch (key) {
            case '1':
                return '';
            case '2':
                return 'pending';
            case '3':
                return 'shipping';
            case '4':
                return 'delivered';
            case '5':
                return 'cancel';
            default:
                return null;
        }
    };

    const items = [
        {
            key: '1',
            label: t('Your_Orders'),
            children: <OrderList orders={orders} />,
        },
        {
            key: '2',
            label: t('Pending'),
            children: <OrderList orders={orders} />,
        },
        {
            key: '3',
            label: t('Shipping'),
            children: <OrderList orders={orders} />,
        },
        {
            key: '4',
            label: t('Delivered'),
            children: <OrderList orders={orders} />,
        },
        {
            key: '5',
            label: t('Cancelled'),
            children: <OrderList orders={orders} />,
        },
    ];

    return (
        <>
            {token ? (
                <Tabs type="card" size="large"
                    style={{ width: '800px' }}
                    defaultActiveKey="1" items={items} onChange={onChange} />
            ) : (
                <Result
                    icon={<ShoppingOutlined style={{ color: '#484848' }} />}
                    title={t('Login_To_View_Orders')}
                    extra={<Button onClick={() => navigate('/login')} type="primary">{t('Login_Button')}</Button>}
                />
            )}
        </>
    );
};

export default Orders;