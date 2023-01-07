import cls from './GymRentalPost.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// comp
import GymTitle from './templates/GymTitle'
import GymContent from './templates/GymContent'
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

  // const [txtFormValue, setTxtFormValue] = useState([
  //   {title:''},
  //   {content:'none'},
  //   {address:'none'},
  //   {pricePerHour:'none'},
  //   {openingHours:'none'},
  //   {openingPeriod:'none'},
  //   {openingDays:'none'},
  // ])

  const post = async () => {
    await setIsLoading(true)
    // navigate('/gym')
  }

  const submitForm = (e:any) => {
    e.preventDefault()
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
            // txtFormValue={txtFormValue}
            // setTxtFormValue={setTxtFormValue}
          />
          <GymContent/>
          <GymAddress/>
          <GymPrice/>
          <GymOpeningHours/> 
          <GymOpeningPeriod/> 
          <GymOpeningDays/>
        </form>
        <div className={cls.bottomBtns}>
          <button onClick={cancelPost}>취소</button>
          <button onClick={post}>완료</button>
        </div>
      </div>

    </div>
  )
}

export default GymRentalPost