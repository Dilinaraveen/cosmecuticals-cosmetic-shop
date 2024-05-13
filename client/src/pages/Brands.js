import axios from "axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { updateProducts } from "../features/productSlice";
import brands from "../brands";

const Categories = () => {
  
  return (
    <div style={{padding:'20px'}}>
      <Row>
        {brands.map((brand) => (
          <LinkContainer key={""} to={`/brand/${brand.name}`}>
            <Col md={4}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${brand.img})`,
                  gap: "10px",
                }}
                className="category-tile"
              >
                {brand.name}
              </div>
            </Col>
          </LinkContainer>
        ))}
      </Row>
    </div>
  );
};

export default Categories;
