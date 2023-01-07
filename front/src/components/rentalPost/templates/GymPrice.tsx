import cls from '../inputStyle/TextInput.module.scss'

const GymPricePerHour = () => {
  return (
    <>
      <div className={cls.TextInputLayout}>
      <div><p>*</p></div>
      <input
        type='text'
        placeholder='단위 고정(원/시간)'
      />
    </div>
    </>
  )
}

export default GymPricePerHour