import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation } from "../services/appApi";
import axios from "../axios";
import "../styles/NewProduct.css";

function EditProductPage() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [updateProduct, { isError, error, isLoading, isSuccess }] = useUpdateProductMutation();

    useEffect(() => {
        axios
            .get("/products/" + id)
            .then(({ data }) => {
                const product = data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setBrand(product.brand);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => console.log(e));
    }, [id]);

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !brand || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        updateProduct({ id, name, description, price, category, brand, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "your-cloudname",
                uploadPreset: "your-preset",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Edit product</h1>
                        {isSuccess && <Alert variant="success">Product updated</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product description</Form.Label>
                            <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control type="number" placeholder="Price ($)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={category}>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="Skincare">Skincare</option>
                                <option value="Makeup">Makeup</option>
                                <option value="Haircare">Haircare</option>
                                <option value="Fragrances">Fragrances</option>
                                <option value="Bath and Body">Bath and Body</option>
                                <option value="Accessories">Accessories</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" onChange={(e) => setBrand(e.target.value)}>
                            <Form.Label>Brand</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="Caudalie">Caudalie</option>
                                <option value="Olay">Olay</option>
                                <option value="Himalaya">Himalaya</option>
                                <option value="Clinique">Clinique</option>
                                <option value="La Mer">La Mer</option>
                                <option value="Phillips">Phillips</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Update Product
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container"></Col>
            </Row>
        </Container>
    );
}

export default EditProductPage;
