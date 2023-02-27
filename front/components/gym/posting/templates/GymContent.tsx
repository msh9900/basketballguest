import cls from '../inputStyle/TextAreaInput.module.scss'
import Wiziwig from 'components/common/wyzywig/Wyzywig'

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
          <Wiziwig
            content={props.content}
            setContent={props.setContent}
          />
        </div>
      </div>
    </>
  )
}

export default GymContent