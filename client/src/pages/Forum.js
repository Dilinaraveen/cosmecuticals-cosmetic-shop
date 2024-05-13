import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Forum.css";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import backgroundImage from "../assets/background.png";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Forum = () => {
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getChannelDetails() {
      const res = await axios.get(`http://localhost:8080/channel/`);
      console.log("res::", res);
      setData(res.data);
    }
    getChannelDetails();
  }, []);

  async function handleSubmit(e,id) {
    e.preventDefault();
    console.log("id:::",id)
    console.log("data::",data)
    let body = {
      doctorId: user._id,
      doctorName: user.name,
      answer: answer
    };
    
    const res = await axios.patch(`http://localhost:8080/channel/${id}`, body);
    console.log("res:::", res);
    setAnswer("");
    // console.log("brand::",brand)
    // if (!name || !description || !price || !category|| !brand || !images.length) {
    //     return alert("Please fill out all the fields");
    // }
    // createProduct({ name, description, price, category, brand, images }).then(({ data }) => {
    //     if (data.length > 0) {
    //         setTimeout(() => {
    //             navigate("/");
    //         }, 1500);
    //     }
    // });
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      {/* <div className="title">You can add your Skincare/Haircare Problems Here</div>
      <div className="sub-title">Doctors will respond to you</div> */}

      <div>
        <div className="bottom-title">RECENTLY ADDED QUESTIONS</div>

        {data &&
          data.map((channel) => (
            <div className="card-container">
              <Form
                style={{ width: "100%", padding: "15px" }}
                onSubmit={(e)=>handleSubmit(e,channel._id)}
              >
                <div className="details-row">
                  <RxAvatar style={{ fontSize: "25px" }} />
                  <div className="row-name">Name: </div>{channel.userName}
                </div>
                <div className="details-row">
                  <MdOutlineEmail style={{ fontSize: "25px" }} />
                  <div className="row-name">Email:</div>{channel.userEmail}
                </div>
                <div>
                  <div className="que-card">
                    <span>{channel.description}</span>
                  </div>
                </div>
                <div className="answer"> Add Answer</div>
                <div>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      style={{ height: "100px" }}
                      value={answer}
                      required
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <button className="ask-button" type="submit">
                      Submit
                    </button>
                  </Form.Group>
                </div>
              </Form>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Forum;
