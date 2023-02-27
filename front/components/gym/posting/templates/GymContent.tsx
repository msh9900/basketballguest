import cls from '../inputStyle/TextAreaInput.module.scss'
import Wyziwyg from 'components/common/wyzywig/Wyziwyg'

interface Props{
  content:string
  setContent:React.Dispatch<React.SetStateAction<string>>
}

const GymContent = (props:Props) => {

  return (
    <>
      <h3 className={cls.explanation}>내용</h3>
      <div className={cls.TextAreaInputLayout}>
        <div></div>
        <div>
          <Wyziwyg
            content={props.content}
            setContent={props.setContent}
          />
        </div>
      </div>
    </>
  )
}

export default GymContent