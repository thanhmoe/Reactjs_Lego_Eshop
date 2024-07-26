import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteOrderList from "./component/InfiniteOrdersList";
import "./orders.css";
import { Button, Result, Tabs } from "antd";
import { ShoppingOutlined } from '@ant-design/icons';
import { getOrders } from "../../services/orders";
import { getToken, setTokenToRedirect } from "../../utils/token_utils";
import { useTranslation } from 'react-i18next';

const Orders = () => {
    const { t } = useTranslation(['order']);
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(10); // Fixed number of items per page
    const [totalOrders, setTotalOrders] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [orderStatus, setOrdersStatus] = useState('');
    const token = getToken();
    const navigate = useNavigate();

    const fetchOrders = async (orderStatus, page) => {
        try {
            const res = await getOrders({ page, limit: itemsPerPage, sortStatus: orderStatus });
            if (res.success) {
                setTotalOrders(res.total_orders); // Total data length
                setOrders(prevOrders => [...prevOrders, ...res.orders]);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            setOrders([]); // Reset orders on status change
            fetchOrders(orderStatus, 1);
        }
    }, [token, orderStatus]);

    const fetchMoreOrders = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchOrders(orderStatus, nextPage);
    };

    const onChange = (key) => {
        const status = getStatusFromTabKey(key);
        setActiveTab(key);
        setOrdersStatus(status);
        setPage(1); // Reset page to 1
    };

    const getStatusFromTabKey = (key) => {
        switch (key) {
            case '1':
                return '';
            case '2':
                return 'pending';
            case '3':
                return 'processing';
            case '4':
                return 'shipping';
            case '5':
                return 'delivered';
            case '6':
                return 'cancel';
            default:
                return null;
        }
    };

    const items = [
        {
            key: '1',
            label: t('Your_Orders'),
            children: (
                <InfiniteOrderList
                    orders={orders}
                    fetchMoreOrders={fetchMoreOrders}
                    hasMore={orders.length < totalOrders}
                />
            ),
        },
        {
            key: '2',
            label: t('Pending'),
            children: (
                <InfiniteOrderList
                    orders={orders}
                    fetchMoreOrders={fetchMoreOrders}
                    hasMore={orders.length < totalOrders}
                />
            ),
        },
        {
            key: '3',
            label: t('Processing'),
            children: (
                <InfiniteOrderList
                    orders={orders}
                    fetchMoreOrders={fetchMoreOrders}
                    hasMore={orders.length < totalOrders}
                />
            ),
        },
        {
            key: '4',
            label: t('Shipping'),
            children: (
                <InfiniteOrderList
                    orders={orders}
                    fetchMoreOrders={fetchMoreOrders}
                    hasMore={orders.length < totalOrders}
                />
            ),
        },
        {
            key: '5',
            label: t('Delivered'),
            children: (
                <InfiniteOrderList
                    orders={orders}
                    fetchMoreOrders={fetchMoreOrders}
                    hasMore={orders.length < totalOrders}
                />
            ),
        },
        {
            key: '6',
            label: t('Cancelled'),
            children: (
                <InfiniteOrderList
                    orders={orders}
                    fetchMoreOrders={fetchMoreOrders}
                    hasMore={orders.length < totalOrders}
                />
            ),
        },
    ];

    const handleLoginRedirect = () => {
        setTokenToRedirect();
        navigate('/login');
    };

    return (
        <>
            {token ? (
                <Tabs
                    type="card"
                    size="large"
                    style={{ width: '800px' }}
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                />
            ) : (
                <Result
                    icon={<ShoppingOutlined style={{ color: '#484848' }} />}
                    title={t('Login_To_View_Orders')}
                    extra={<Button onClick={handleLoginRedirect} type="primary">{t('Login_Button')}</Button>}
                />
            )}
        </>
    );
};

export default Orders;
