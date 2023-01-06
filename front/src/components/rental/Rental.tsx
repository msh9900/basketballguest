import RentalForm from './RentalForm';
import Articles from './Articles';
import Filter from './filter/Filter';
import Order from './order/Order';

import { useState } from 'react';
import cls from './Rental.module.scss';

const Rental = () => {
  const [isEditFormOn, setIsEditFormOn] = useState<boolean>(false);
  const loadEditForm = () => {
    // 1 로그인 상태 확인
    // 2 글쓰기 폼 열기
    if (!isEditFormOn) setIsEditFormOn(true);
    if (isEditFormOn) setIsEditFormOn(false);
  };

  const [inputImgs, setInputImgs] = useState<string[]>([]);
  const deleteImgs = () => {
    setInputImgs([]);
  };
  const formData = new FormData();

  const handleImageUpload = (e: any) => {
    const fileArr = e.target.files;
    for (let i = 0; i < fileArr.length; i++) {
      formData.append('img', e.target.files[i]);
    }
    // let fileURLs: string[] = [];
    // let file;
    // let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    // for (let i = 0; i < filesLength; i++) {
    //   file = fileArr[i];
    //   let reader = new FileReader();
    //   reader.onload = () => {
    //     fileURLs[i] = reader.result as string;
    //     setInputImgs([...fileURLs]);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const sendImgs = async (event: any) => {
    event.preventDefault();
    // profile.tsx <= 참고

    try {
      const resImg = await fetch('http://localhost:4000/rental/img', {
        method: 'POST',
        body: formData,
      });
      // const imgName = await resImg.json();
      console.log(resImg);
    } catch (error: any) {
      console.log(error);
    }
    // const imgName = await resImg.json();

    // const response = await fetch('http://localhost:4000/rental/userdata', {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify({
    //     // id,
    //     // pw,
    //     // email,
    //     // userName,
    //     userImg: imgName,
    //   }),
    // });
    // const data = await response.json();
  };

  return (
    <>
      <div className={cls.rentalCompLayout}>
        <button className={cls.postButton} onClick={loadEditForm}>
          글쓰기
        </button>
        {isEditFormOn && <RentalForm setIsEditFormOn={setIsEditFormOn} />}

        <div className={cls.imageUploadBox}>
          <form onSubmit={sendImgs} encType="multipart/form-data">
            <input
              type="file"
              multiple
              name="img"
              // style={{ display: "none" }}
              id="photo_file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <input type="submit"></input>
          </form>
          {inputImgs?.map((v, i) => (
            <img key={i} src={v} alt="profileImg1" width="100"></img>
          ))}
        </div>
        <button onClick={deleteImgs}>삭제</button>
        {/* <button onClick={sendImgs}>전송</button> */}

        <Order />
        <Filter />
        <Articles />
      </div>
    </>
  );
};

export default Rental;
