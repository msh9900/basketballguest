
import RentalForm from './RentalForm'
import Articles from './Articles'
import Filter from './filter/Filter'
import Order from './order/Order'

import { useState} from 'react';
import cls from "./Rental.module.scss";

const Rental = () => {

  const [isEditFormOn, setIsEditFormOn] = useState<boolean>(false)
  const loadEditForm = () => {
    // 1 로그인 상태 확인
    // 2 글쓰기 폼 열기
    if(!isEditFormOn) setIsEditFormOn(true)
    if(isEditFormOn) setIsEditFormOn(false)
  }

  const [inputImgs, setInputImgs] = useState<string[]>([])
  const deleteImgs = () => {setInputImgs([])}

  const handleImageUpload = (e:any) => {
    const fileArr = e.target.files;
    let fileURLs : string[] = [];
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result as string;
        setInputImgs([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (<>
    <div className={cls.rentalCompLayout}>
      <button className={cls.postButton} onClick={loadEditForm}>글쓰기</button>
      {isEditFormOn && <RentalForm setIsEditFormOn={setIsEditFormOn}/>}
      
      <div className={cls.imageUploadBox}>
        <input 
          type="file"
          multiple
          // style={{ display: "none" }}
          id="photo_file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {inputImgs?.map((v,i) =>
          <img key={i} src={v} alt='profileImg1' width='100'></img>
        )}
      </div>
      <button onClick={deleteImgs}>
        이미지 삭제
      </button>
    
      {/* <Order/> */}
      {/* <Filter/> */}
      {/* <Articles/> */}
    </div>
  </>)
}

export default Rental