import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedProduct, selectRelatedProducts, selectRelatedProductsStatus, selectRelatedProductsError } from "../../../redux/slice/products/productsSlice.js";
import { Skeleton, Empty } from "antd";
import { useTranslation } from "react-i18next";

export default function RelatedProducts({ productId, currentPage, itemsPerPage }) {
    const { t } = useTranslation(['product', 'common']);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const relatedProducts = useSelector(selectRelatedProducts) || [];
    const relatedProductsStatus = useSelector(selectRelatedProductsStatus);
    const relatedProductsError = useSelector(selectRelatedProductsError);

    useEffect(() => {
        dispatch(fetchRelatedProduct({
            page: currentPage,
            limit: itemsPerPage,
            relatedToProduct: productId
        }));
    }, [dispatch, productId, currentPage, itemsPerPage]);

    const linkToDetail = (id) => {
        navigate(`/products/${id}`);
    };

    if (relatedProductsStatus === 'loading') {
        return <Skeleton active />;
    }

    if (relatedProductsStatus === 'failed') {
        return <Empty description={t('Related products not found!')} />;
    }

    if (relatedProductsStatus === 'succeeded' && relatedProducts.length === 0) {
        return null
    }

    return (
        <div className="related-products-list">
            <h2>{t("Recommend_For_You")}</h2>
            {relatedProducts.map((product) => (
                <div
                    key={product.id}
                    className="product-info"
                    onClick={() => linkToDetail(product.id)}
                >
                    <img
                        className="image-product"
                        src={product.image_path}
                        alt={product.name}
                    />
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                </div>
            ))}
        </div>
    );
}
