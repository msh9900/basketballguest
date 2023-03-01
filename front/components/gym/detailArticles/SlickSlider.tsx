import cls from "./SlickSlider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import Image from 'next/image'
import ImgPop from 'util/ImgPop';

const slickStyle = `
  .slick-next:before, .slick-prev:before {
    color: #000;
  }
`;

interface Props {
  gymImg: string[];
}
const SlickSlider = (props: Props) => {
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
        {props.gymImg.map((ele, idx) => (
          <div className={cls.outerImg} key={'gymImg'+idx}>
            <div className={cls.innerImg}>
              <img onClick={()=>{ImgPop(ele)}} src={ele} alt="체육관 이미지" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;
