import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import "../styles/CategoryPage.css";
import Pagination from "../components/Pagination";
function BrandPage() {
    const { brand } = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
   
    useEffect(() => {
        setLoading(true);
        axios
            .get(`/products/brand/brand`, {
                params: {
                  brand: brand
                }
              })
            .then(({ data }) => {
                setLoading(false);
                setProducts(data);
                console.log(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, [brand]);

    if (loading) {
        <Loading />;
    }

    const productsSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    function ProductSearch({ _id, brand, name, pictures }) {
        return <ProductPreview _id={_id} brand={brand} name={name} pictures={pictures} />;
    }

    return (
        <div className="category-page-container">
            <div className={`pt-3 ${brand}-banner-container category-banner-container`}>
                <h1 className="text-center">{brand.charAt(0).toUpperCase() + brand.slice(1)}</h1>
            </div>
            <div className="filters-container d-flex justify-content-center pt-4 pb-4">
                <input type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {productsSearch.length === 0 ? (
                <h1>No products to show</h1>
            ) : (
                <Container>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <Pagination data={productsSearch} RenderComponent={ProductSearch} pageLimit={1} dataLimit={5} tablePagination={false} />
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default BrandPage;
