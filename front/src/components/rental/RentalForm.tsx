
import React from 'react'
import {useEffect} from 'react'
import classes from "./RentalForm.module.scss";
import {outerCheck, innerCheck} from '../../util/inOutCheck'

// 프롭스 넘기기 참조
// https://b41-41.github.io/posts/TIL-react-setState-type-220715/

interface Props {
  setIsEditFormOn: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostRental = (props:Props) => {
  
  useEffect(()=>{
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				props.setIsEditFormOn(false);
			}
		});
  }, [])
  const submitByEnter = (e:any) => {
    e.preventDefault()
  }
  let innerClick = 0;
	let outerClick = 0;
  return (
    <>
      <div 
        className={classes.RentalFormOuter}       
        onClick={() => {
          outerCheck(innerClick, outerClick, props);
        }}
      ></div>
      <div 
        className={classes.PostRentalLayout}       
        onClick={() => {
          innerCheck(innerClick, outerClick);
        }}> 
        <span>작성창</span>
        <button 
          className={classes.exitButton} 
          onClick={()=>{props.setIsEditFormOn(false)}}>
          X
        </button>
        <form action="" onSubmit={submitByEnter}>
          <div>제목<input className={classes.titleInput}/></div>
          <div>설명<input className={classes.contentInput}/></div>
          <div>장소<input className={classes.placeInput}/></div>
          <div>비용<input className={classes.priceInput}/></div>
        </form>
        <button className={classes.submitButton} onClick={()=>{alert('제출')}}>
          <img src={process.env.PUBLIC_URL + 'img/submit.png'} width='30px' alt="submit" /> 
        </button>
        <div><span className={classes.gray}>esc로 창 종료</span></div>
      </div>
  </>)
}

export default PostRental

