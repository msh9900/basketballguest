import { useState, useRef, useEffect} from 'react';

// components
import RentalForm from '../../components/rental/RentalForm'
import Articles from '../../components/rental/Articles'
import classes from "./GymRental.module.scss";

export default function GymRental() {

  const [isEditFormOn, setIsEditFormOn] = useState<boolean>(false)
  const loadEditForm = () => {
    // 1 로그인 상태 확인
    // 2 글쓰기 폼 열기
    if(!isEditFormOn) setIsEditFormOn(true)
    if(isEditFormOn) setIsEditFormOn(false)
  }

  return <>
    <button className={classes.postButton} onClick={loadEditForm}>글쓰기</button>
    {/* 렌탈 글 작성 폼*/}
    {isEditFormOn && 
      <RentalForm setIsEditFormOn={setIsEditFormOn}/>
    }

    {/* 목록 불러오기 */}
    <Articles/>
  </>; 
}
