import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteOrderList from "./component/InfiniteOrdersList";
import "./orders.css";
import { Button, Result, Tabs, Skeleton } from "antd";
import { ShoppingOutlined } from '@ant-design/icons';
import { getOrders, cancelOrder } from "../../services/orders";
import { getToken, setTokenToRedirect } from "../../utils/token_utils";
import { useTranslation } from 'react-i18next';
import LoadingModal from "../../modal/loadingModal";
import { notify } from "../../main";

const Orders = () => {
    const { t } = useTranslation(['order']);
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(10); // Fixed number of items per page
    const [totalOrders, setTotalOrders] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [orderStatus, setOrdersStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const token = getToken();
    const navigate = useNavigate();

    const fetchOrders = async (orderStatus, page) => {
        setIsLoading(true); // Show loading modal
        try {
            const res = await getOrders({ page, limit: itemsPerPage, sortStatus: orderStatus });
            if (res.success) {
                setTotalOrders(res.total_orders); // Total data length
                setOrders(prevOrders => [...prevOrders, ...res.orders]);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            setOrders([]); // Reset orders on status change
            fetchOrders(orderStatus, 1);
        }
    }, [token]);

    const fetchMoreOrders = () => {
        const nextPage = page + 1;
        setPage(nextPage); // Update the page state
        fetchOrders(orderStatus, nextPage);
    };

    const onChange = async (key) => {
        const status = getStatusFromTabKey(key);
        setOrders([]); // Clear current orders
        setPage(1); // Reset page to 1
        setOrdersStatus(status);
        setIsLoading(true);
        await fetchOrders(status, 1); // Fetch new orders
        setActiveTab(key); // Change active tab after fetching
        setIsLoading(false);
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
                return 'cancelled';
            default:
                return null;
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await cancelOrder(orderId);
            if (response.success) {
                notify('success', t('Cancel_Order_Successful'))
                setOrders([]);
                fetchOrders(orderStatus, 1);
            } else {
                notify('error', t(`Cancel_Order_Fail`))
            }
        } catch (error) {
            return error
        }
    };

    const handleLoginRedirect = () => {
        setTokenToRedirect();
        navigate('/login');
    };

    const renderTabContent = () => {
        if (isLoading && orders.length === 0) {
            return <Skeleton active />;
        }
        return (
            <InfiniteOrderList
                orders={orders}
                fetchMoreOrders={fetchMoreOrders}
                hasMore={orders.length < totalOrders}
                cancelOrder={handleCancelOrder}
            />
        );
    };
    const items = [
        {
            key: '1',
            label: t('Your_Orders'),
            children: renderTabContent(),
        },
        {
            key: '2',
            label: t('Pending'),
            children: renderTabContent(),
        },
        {
            key: '3',
            label: t('Processing'),
            children: renderTabContent(),
        },
        {
            key: '4',
            label: t('Shipping'),
            children: renderTabContent(),
        },
        {
            key: '5',
            label: t('Delivered'),
            children: renderTabContent(),
        },
        {
            key: '6',
            label: t('Cancelled'),
            children: renderTabContent(),
        },
    ];

    return (
        <>
            {isLoading && <LoadingModal />}
            {token ? (
                <Tabs
                    type="card"
                    size="large"
                    style={{ width: '800px' }}
                    defaultActiveKey="1"
                    items={items}
                    activeKey={activeTab} // Set active tab
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
