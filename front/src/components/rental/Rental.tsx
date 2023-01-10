// comp
import Articles from './articles/MainArticles';
import Filter from './filter/Filter';
import Order from './order/Order';

import { useNavigate} from 'react-router-dom';
// import { useState } from 'react';
import cls from './Rental.module.scss';


const Rental = () => {
  const navigate = useNavigate();
  const goToPosting = () => {
    navigate('/gym/post')
  }

  return (
    <>
      <div className={cls.rentalCompLayout}>
        <button className={cls.postButton} onClick={goToPosting}>
          글쓰기
        </button>
        <Order />
        <Filter />
        <Articles />
      </div>
    </>
  );
};

export default Rental;
