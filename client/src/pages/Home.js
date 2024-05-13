import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "../styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import { GrNext } from "react-icons/gr";
import Menu1 from "../assets/Menu1.png";
import Menu2 from "../assets/Menu2.png";
import Menu3 from "../assets/Menu3.png";
import HeroLeft from "../assets/HeroLeft.png";
import backgroundImage from "../assets/background.png";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      width: "100%"
    }}>
      <div className="hero-container">
        <div className="right-container">
          <span className="home-header">
            The health of<br/>your skin
          </span>
          <span className="desc">We make all cosmetics from natural ingredients <br />
          and without the addition of dyes.</span>
          <div className="img-wrapper">
            <img src={Menu1} alt='menu'/>
            <img src={Menu2} alt='menu'/>
            <img src={Menu3} alt='menu'/>
          </div>
          <button className="button">
            EXPLORE MORE <GrNext/>
            <GrNext />
          </button>
        </div>
        <div className="left-container">
            <img src={HeroLeft}/>
        </div>
      </div>

      <div className="featured-products-container container mt-4">
        <h2>Last products</h2>
        {/* last products here */}
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img src="https://res.cloudinary.com/srilankan-cloudname/image/upload/v1683791337/20230511111736__fpdl.in__cosmetic-ads-template-with-white-bottles-purple-background_384372-89_large_jo2ku8.jpg" />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
