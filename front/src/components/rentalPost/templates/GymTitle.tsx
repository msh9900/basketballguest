import cls from '../inputStyle/TextInput.module.scss'

const GymTitle = () => {
  return (
    <>
      <h3 className={cls.explanation}>제목</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          placeholder='ex : 강동 다이나믹짐 오픈했습니다.'
        />
      </div>
    </>
  )
}

export default GymTitle

