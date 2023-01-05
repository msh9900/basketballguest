
import RentalForm from './RentalForm'
import Articles from './Articles'
import Filter from './filter/Filter'
import Order from './order/Order'

import { useState} from 'react';
import classes from "./Rental.module.scss";

const Rental = () => {

  const [isEditFormOn, setIsEditFormOn] = useState<boolean>(false)
  const loadEditForm = () => {
    // 1 로그인 상태 확인
    // 2 글쓰기 폼 열기
    if(!isEditFormOn) setIsEditFormOn(true)
    if(isEditFormOn) setIsEditFormOn(false)
  }

  return (<>
    <div className={classes.rentalCompLayout}>
      <button className={classes.postButton} onClick={loadEditForm}>글쓰기</button>
      {isEditFormOn && <RentalForm setIsEditFormOn={setIsEditFormOn}/>}
      <Order/>
      <Filter/>
      <Articles/>
    </div>
  </>)


}

export default Rental