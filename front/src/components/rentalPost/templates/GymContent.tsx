import cls from '../inputStyle/TextAreaInput.module.scss'

interface Props{
  content:string
  setContent:React.Dispatch<React.SetStateAction<string>>
}

const GymContent = (props:Props) => {

  const onChange = (e:any) => {
    props.setContent(e.target.value)
  }

  return (
    <>
      <h3 className={cls.explanation}>내용</h3>
      <div className={cls.TextAreaInputLayout}>
        
        <div></div>
        <div>
          <textarea 
            placeholder='ex : 자세한 사항은 연락주세요!'
            value={props.content}
            onChange={onChange}
          />
        </div>
      </div>
    </>

  )
}

export default GymContent