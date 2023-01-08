import cls from './GymRentalPost.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// component
import GymTitle from './templates/GymTitle'
import GymContent from './templates/GymContent'
import GymContact from './templates/GymContact'
import GymAddress from './templates/GymAddress'
import GymOpeningHours from './templates/GymOpeningHours'
import GymOpeningPeriod from './templates/GymOpeningPeriod'
import GymOpeningDays from './templates/GymOpeningDays'
import GymImages from './templates/GymImages'
import GymPrice from './templates/GymPrice'

const GymRentalPost =() => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const cancelPost = () => {navigate('/gym')}

  // form contents
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [openingPeriod, setOpeningPeriod] = useState<string[]>(['',''])
  const [openingDays, setOpeningDays] = useState(
    [
      {name:'일', open:false},
      {name:'월', open:false},
      {name:'화', open:false},
      {name:'수', open:false},
      {name:'목', open:false},
      {name:'금', open:false},
      {name:'토', open:false},
    ]
  )

  const post = async () => {
    // 텍스트 데이터 유효성 체크
    await checkFormValid()

    // 텍스트 데이터 번들 생성
    const formBody = {
      title,
      content,
      contact,
      address,
      price,
      openingHours,
      openingPeriod,
      openingDays,
    }
    console.log('formBody', formBody)

    // 텍스트 데이터 전송
    // try {
    //   const response = await fetch('http://localhost:4000/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formBody),
    //   });
    //   const data = await response.json();
    //   await console.log('post 성공', data);
    // } catch(err:any){
    //   await console.log('post 실패', err);
    // }

    // 이미지 데이터 전송
    // await setIsLoading(true)

    // gym 페이지로 이동
    // alert('성공')
    // navigate('/gym')
  }

  const checkFormValid = () => {
    if(title===''){
      alert('제목을 입력해주세요')
      // 포커스 주기
      return
    }
    if(address===''){
      alert('주소를 입력해주세요')
      // 포커스 주기
      return
    }
    if(openingHours===''){
      alert('영업시간을 입력해주세요')
      // 포커스 주기
      return
    }

    const stt = openingPeriod[0]
    const end = openingPeriod[1]
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    // https://curryyou.tistory.com/234

    if(stt==='' || end===''){
      alert('개장기간 값을 입력해주세요')
      return
    }
    if(!regex.test(stt) || !regex.test(end)){
      alert('개장기간 양식을 확인해주세요')
      return
    }
  }

  return (
    <div className={cls.GymRentalPostLayout}>
      <div className={cls.formBox}>
        <h2 className={cls.formTitle}>글쓰기</h2>
        <GymImages
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <form>
          <GymTitle 
            title={title}
            setTitle={setTitle}
          />
          <GymContent
            content={content}
            setContent={setContent}
          />
          <GymContact
            contact={contact}
            setContact={setContact}
          />
          <GymAddress
            address={address}
            setAddress={setAddress}
          />
          <GymPrice
            price={price}
            setPrice={setPrice}
          />
          <GymOpeningHours
            openingHours={openingHours}
            setOpeningHours={setOpeningHours}
          /> 
          <GymOpeningPeriod
            openingPeriod={openingPeriod}
            setOpeningPeriod={setOpeningPeriod}
          /> 
          <GymOpeningDays
            openingDays={openingDays}
            setOpeningDays={setOpeningDays}
          /> 
        </form>
        <div className={cls.bottomBtns}>
          <button onClick={cancelPost}>취소</button>
          <button onClick={post}>전송</button>
        </div>
      </div>
    </div>
  )
}

export default GymRentalPost