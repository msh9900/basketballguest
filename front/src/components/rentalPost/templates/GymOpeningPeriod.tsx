import cls from '../inputStyle/TextInput.module.scss'

const GymOpeningPeriod = () => {
  return (
    <div>
      <h3 className={cls.explanation}>개장일자 (시작)</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          placeholder='ex : 2010.10.10'
        />
      </div>

      <h3 className={cls.explanation}>개장일자 (종료)</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          placeholder='ex : 2010.10.20'
        />
      </div>
    </div>
  )
}

export default GymOpeningPeriod