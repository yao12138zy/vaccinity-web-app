import Carousel from "react-bootstrap/Carousel";

import React, { Component } from "react";

import Image1 from "./static/slide1.jpg";
import Image2 from "./static/slide2.jpg";
import Image3 from "./static/slide3.jpeg";

export class SlideShow extends Component {
  render() {
    return (
      <div>
        <div class="container-fluid">
          <div className="row title" style={{ marginBottom: "20px" }}></div>
        </div>

        <div className="container-fluid">
          <Carousel interval={3000} keyboard={false} pauseOnHover={true}>
            <Carousel.Item style={{ height: "800px" }}>
              <img
                style={{ height: "800px" }}
                className="d-block w-100"
                src={Image1}
              />

              <Carousel.Caption>
                <h3 style={{ color: "black" }}>
                  Book An Appointment Right Now!{" "}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{ height: "800px" }}>
              <img
                style={{ height: "800px" }}
                className="d-block w-100"
                src={Image2}
              />

              <Carousel.Caption>
                <h3 style={{ color: "black" }}>Learn More About Vaccine!</h3>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{ height: "800px" }}>
              <img
                style={{ height: "800px" }}
                className="d-block w-100"
                src={Image3}
              />

              <Carousel.Caption>
                <h3 style={{ color: "black" }}>Sigh Up Today!</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default SlideShow;
