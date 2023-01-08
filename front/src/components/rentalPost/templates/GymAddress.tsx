// import InputText from '../inputStyle/Input_Text'
import cls from '../inputStyle/TextInput.module.scss'

interface Props{
  address:string
  setAddress:React.Dispatch<React.SetStateAction<string>>
}

const GymAddress = (props:Props) => {
  const onChange = (e:any) => {
    props.setAddress(e.target.value)
  }
  return (
    <>
      <h3 className={cls.explanation}>주소</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          placeholder='ex : 서울 송파구 ...'
          value={props.address}
          onChange={onChange}
        />
      </div>
      {/* https://postcode.map.daum.net/guide */}
    </>
  )
}

export default GymAddress