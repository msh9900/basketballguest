import cls from "./SlickSlider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";

const slickStyle = `
.container {
  margin: 0 auto;
  padding: 0px 40px 40px 40px;
  width: 400px;
}
h3 {
  background: #5f9ea0;
  color: #fff;
  font-size: 36px;
  line-height: 100px;
  margin: 10px;
  padding: 2%;
  position: relative;
  text-align: center;
}
.slick-next:before, .slick-prev:before {
    color: #000;
}
.center .slick-center h3 {
  color: #e67e22;
  opacity: 1;
  -ms-transform: scale(1.08);
  transform: scale(1.08);
}
.center h3 {
  transition: all .3s ease;
}
`;

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className={cls.outerCarousel}>
        <style>{slickStyle}</style>
        <Slider {...settings}>
          <div className={cls.imgBox}>
            <img
              src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201812022340"
              alt=""
            />
          </div>
          <div className={cls.imgBox}>
            <img
              src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201812022340"
              alt=""
            />
          </div>
        </Slider>
      </div>
    );
  }
}
