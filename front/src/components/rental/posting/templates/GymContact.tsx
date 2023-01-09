// import InputText from '../inputStyle/Input_Text'
import cls from '../inputStyle/TextInput.module.scss'

interface Props{
  contact:string
  setContact:React.Dispatch<React.SetStateAction<string>>
}

const GymContact = (props:Props) => {
  const onChange = (e:any) => {
    props.setContact(e.target.value)
  }
  return (
    <>
      <h3 className={cls.explanation}>연락처</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          placeholder='ex : 010-0000-0000'
          value={props.contact}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default GymContact