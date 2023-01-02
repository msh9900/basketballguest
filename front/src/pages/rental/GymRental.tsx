import { useState, useRef, useEffect} from 'react';

import classes from "./GymRental.module.scss";

// components
import RentalForm from '../../components/rental/RentalForm'
import Articles from '../../components/rental/Articles'
import Filter from '../../components/rental/filter/Filter'
import Order from '../../components/rental/order/Order'

export default function GymRental() {

  const [isEditFormOn, setIsEditFormOn] = useState<boolean>(false)
  const loadEditForm = () => {
    // 1 로그인 상태 확인
    // 2 글쓰기 폼 열기
    if(!isEditFormOn) setIsEditFormOn(true)
    if(isEditFormOn) setIsEditFormOn(false)
  }

  return (
    <div className={classes.rentalCompLayout}>
      <button className={classes.postButton} onClick={loadEditForm}>글쓰기</button>

      {/* 렌탈 글 작성 폼*/}
      {isEditFormOn && 
        <RentalForm setIsEditFormOn={setIsEditFormOn}/>
      }
    {/* <div className={classes.order}>정렬</div> */}
    {/* <div className={classes.filter}>필터</div> */}
    {/* <Order/> */}
    <Filter/>
    <Articles/>
    </div>
  ); 
}
