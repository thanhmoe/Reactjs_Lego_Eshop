import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderList from "./ordersList"
import { useTranslation } from "react-i18next";

const InfiniteOrderList = ({ orders, fetchMoreOrders, hasMore, cancelOrder, confirmOrder }) => {
    const { t } = useTranslation(['order'])
    return (
        <InfiniteScroll
            dataLength={orders.length}
            next={fetchMoreOrders}
            hasMore={hasMore}
            loader={<h4>{t('Loading')}</h4>}
            endMessage={<p>{t('No_More_Orders_Display')}</p>}
        >
            <OrderList orders={orders} cancelOrder={cancelOrder} confirmOrder={confirmOrder} />
        </InfiniteScroll>
    );
};

export default InfiniteOrderList;
