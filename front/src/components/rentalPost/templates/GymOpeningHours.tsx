import cls from '../inputStyle/TextInput.module.scss'

const GymOpeningHours = () => {
  return (
    <>
      <h3 className={cls.explanation}>영업시간</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          placeholder='ex : 06:00 ~ 24:00'
        />
      </div>
    </>

  )
}

export default GymOpeningHours