import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import OrderList from "./component/ordersList";
import "./orders.css"
import { Button, Result, Tabs } from "antd";
import { ShoppingOutlined } from '@ant-design/icons';
import { getOrders } from "../../services/orders";
import { getToken } from "../../utils/token_utils";

const Orders = () => {
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [orderStatus, setOrdersStatus] = useState('')
    const token = getToken()
    const naigate = useNavigate()

    const fetchOrders = async (orderStatus) => {
        try {
            const res = await getOrders({ page, limit: itemsPerPage, sortStatus: orderStatus });
            if (res.success) {
                setOrders(res.orders);
            }
        } catch (error) {
            error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders(orderStatus);
        }
    }, []);

    const onChange = (key) => {
        const status = getStatusFromTabKey(key)
        setActiveTab(key)
        setOrdersStatus(status)
        fetchOrders(status)
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
            label: 'Your orders',
            children: <OrderList orders={orders} />,
        },
        {
            key: '2',
            label: 'Pending',
            children: <OrderList orders={orders} />,
        },
        {
            key: '3',
            label: 'Shipping',
            children: <OrderList orders={orders} />,
        },
        {
            key: '4',
            label: 'Delivered',
            children: <OrderList orders={orders} />,
        },
        {
            key: '5',
            label: 'Cancelled',
            children: <OrderList orders={orders} />,
        },
    ];

    return (
        <>
            {token ? <Tabs type="card" size="large"
                style={{ width: '800px' }}
                defaultActiveKey="1" items={items} onChange={onChange} />
                :
                <Result
                    icon={<ShoppingOutlined style={{ color: '#484848' }} />}
                    title="Login to see what's in your cart!"
                    extra={<Button onClick={() => naigate('/login')} type="primary">Login</Button>}
                />}
        </>
    );
};

export default Orders;