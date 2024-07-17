import React, { useEffect, useState } from "react"
import OrderList from "./component/ordersList";
import { Tabs } from "antd";
import { getOrders } from "../../services/orders";

const Orders = () => {
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [orderStatus, setOrdersStatus] = useState('pending')

    const fetchOrders = async (orderStatus) => {
        try {
            const res = await getOrders({ page, limit: itemsPerPage, sortStatus: orderStatus });
            if (res.success) {
                setOrders(res.orders);
            } else {
                console.error(res.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchOrders(orderStatus);
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
                return 'pending';
            case '2':
                return 'shipping';
            case '3':
                return 'delivered';
            case '4':
                return 'cancel';
            default:
                return 'pending';
        }
    };

    const items = [
        {
            key: '1',
            label: 'Pending',
            children: <OrderList orders={orders} />,
        },
        {
            key: '2',
            label: 'Shipping',
            children: <OrderList orders={orders} />,
        },
        {
            key: '3',
            label: 'Delivered',
            children: <OrderList orders={orders} />,
        },
        {
            key: '4',
            label: 'Cancelled',
            children: <OrderList orders={orders} />,
        },
    ];

    return (
        <>
            <Tabs type="card" size="large" style={{ width: '800px' }}
                defaultActiveKey="1" items={items} onChange={onChange} />
        </>
    );
};

export default Orders;