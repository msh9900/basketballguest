
import React from 'react'
import {useState, useEffect} from 'react'
import cls from "./RentalForm.module.scss";
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

  const [uploadImg, setUploadImg] = useState({
    file : '',
    previewURL : ''
  })

  const handleFileOnChange = (e:any) => {

    // 파일을 한 개만 입력받는 경우이기 때문에 files[0]으로 접근해야 업로드한 파일값을 얻어올 수 있습니다.
    // FileReader API를 사용하기 위해 생성자로 선언해준 뒤, result값에 접근합니다.
    // FileReader.result는 파일 업로드 작업이 완료된 후 실행되며 파일의 컨텐츠에 접근할 수 있습니다.
    // reader.onloadend가 바로 파일 업로드 작업이 끝났을 때 실행되도록 해줍니다.

    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setUploadImg({
        file : file as string,
        previewURL : reader.result as string
      })
    }
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div 
        className={cls.RentalFormOuter}       
        onClick={() => {
          outerCheck(innerClick, outerClick, props);
        }}
      ></div>
      <div 
        className={cls.PostRentalLayout}       
        onClick={() => {
          innerCheck(innerClick, outerClick);
        }}> 
        <span>작성창</span>
        <button 
          className={cls.exitButton} 
          onClick={()=>{props.setIsEditFormOn(false)}}>
          X
        </button>
        <form action="" onSubmit={submitByEnter}>
          <div><input className={cls.titleInput} placeholder={'제목'}/></div>
          <div><input className={cls.contentInput} placeholder={'설명'}/></div>
          <div><input className={cls.placeInput} placeholder={'장소'}/></div>
          <div><input className={cls.priceInput} placeholder={'비용(시간당)'}/></div>
          <div><input className={cls.priceInput} placeholder={'사진'}/></div>
          <div><input className={cls.priceInput} placeholder={'대여가능기간'}/></div>
          <input 
            type='file' 
            accept='image/jpg,impge/png,image/jpeg,image/gif,.png,.jpg,.jpeg,.gif'
            name='profile_img' 
            onChange={handleFileOnChange}>
          </input>
          { uploadImg &&
            <img src={uploadImg.previewURL} alt='profileImg' width='100'></img>
          }

          {/* <label className="" htmlFor="photo_file"> 사진 추가</label> */}
        </form>

        {/* <button className={cls.submitButton} onClick={()=>{alert('제출')}}>
          <img src={process.env.PUBLIC_URL + 'images/submit.png'} width='30px' alt="submit" /> 
        </button> */}

        {/* <div><span className={cls.gray}>esc로 창 종료</span></div> */}
      </div>
  </>)
}

export default PostRental

