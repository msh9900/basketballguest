import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import cls from './SlickSlider.module.scss';

const SlickSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
    };

  return (
    <div className={cls.outerCarousel}>
      <div className="carousel">
        <Slider {...settings}>
          <div className={cls.imgBox}>
            <img src='https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201812022340' alt='imgTest'/>
          </div>
          <div className={cls.imgBox}>Slide 2</div>
          <div className={cls.imgBox}>Slide 3</div>
        </Slider>
      </div>
    </div>
  );
};

export default SlickSlider;
