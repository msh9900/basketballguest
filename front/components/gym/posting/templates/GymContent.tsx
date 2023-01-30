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
            placeholder='ex : 많은 이용 부탁드립니다'
            value={props.content}
            onChange={onChange}
          />
        </div>
      </div>
    </>

  )
}

export default GymContent