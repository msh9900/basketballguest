import cls from '../inputStyle/TextAreaInput.module.scss'

const GymContent = () => {
  return (
    <>
      <h3 className={cls.explanation}>내용</h3>
      <div className={cls.TextAreaInputLayout}>
        
        <div></div>
        <div>
          <textarea 
            placeholder='ex) 자세한 사항은 연락주세요!'
          />
        </div>
      </div>
    </>

  )
}

export default GymContent