import { useState, useEffect } from 'react';
import cls from '../inputStyle/FileInput.module.scss';

interface Props{
  isLoading:boolean;
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}

const GymImages = (props:Props) => {

  useEffect(()=>{
    if(props.isLoading === true) sendImgs()
  }, [props.isLoading])

  const sendImgs = async () => {
    // try {
    //   const resImg = await fetch('http://localhost:4000/rental/img', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   console.log('post 성공 : ', resImg);
    // } catch (error: any) {
    //   console.log('post 실패 : ', error);
    // }
    await console.log('이미지 데이터 보내기');
    await props.setIsLoading(false)
  };
  
  let len = 0;
  const formData = new FormData();
  const [inputImgs, setInputImgs] = useState<string[]>([]);
  
  const handleImageUpload = (event: any) => {
    const fileArr = event.target.files;
    len = 0;
    len = (fileArr.length > 10 ? 10 : fileArr.length) 
    let urlArr = []
    for (let i = 0; i < len; i++) {
      formData.append('img', event.target.files[i]);
      urlArr.push(URL.createObjectURL(fileArr[i]))
    }
    setInputImgs(urlArr)
  };

  const ImgPop = (v:string) => {
    var img = new Image();
    img.src = v;
    const winWidth =500
    const winHeight = 500
    const attr = `width=${winWidth}, height=${winHeight}, menubars=no, scrollbars=auto style="cursor:pointer;"`
    var OpenWindow = window.open('','_blank', attr) as typeof window;
    OpenWindow.document.write(`<img src=${v} width=100% onClick='window.close()'/>`);
  }

  function resetForm()
  {
    // input 삭제
    const imgInput = document.querySelector('#file')
    imgInput?.remove()
    
    // input 생성
    const loc = document.querySelector('#imgFormLoc') as HTMLElement
    const inputEle = document.createElement('input');
    inputEle.type ='file'
    inputEle.id ='file'
    inputEle.name ='file'
    inputEle.setAttribute("multiple","");
    inputEle.accept ='image/*'
    inputEle.addEventListener('change', function(e) { handleImageUpload(e); });
    loc.append(inputEle)

    // 썸네일 삭제
    setInputImgs([])
  }
  return (
    <div className={cls.GymImagesLayout}>
      <form id='imgForm' encType="multipart/form-data" >
        <div id='imgFormLoc' className={cls.inputDiv}>
          
          <h3 className={cls.explanation}>체육관 사진</h3>
          <label htmlFor="file">
            <div className={cls.btnUpload}><span>(최대 10장)</span></div>
          </label>
          <input 
            type="file"
            id='file'
            multiple
            name="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </form>

      {inputImgs.length>0 && 
        <>
          <div className={cls.imgBox}>
            {inputImgs?.map((v, i) => (
              <img key={i} src={v} alt="gymImgs" onClick={()=>{ImgPop(v)}}></img>
            ))}
          </div>
          <button onClick={resetForm}>전체삭제</button>
        </>
      }
    </div>
  )
}

export default GymImages