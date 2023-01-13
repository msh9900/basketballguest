import cls from '../inputStyle/TextInput.module.scss'

interface Props{
  price:string
  setPrice:React.Dispatch<React.SetStateAction<string>>
}

const GymPricePerHour = (props:Props) => {

  const onChange = (e:any) =>{
    props.setPrice(e.target.value)
  }

  return (
    <>
      <h3 className={cls.explanation}>가격</h3>
      <div className={cls.TextInputLayout}>
      <div><p>*</p></div>
      <input
        type='text'
        placeholder='(원/시간)'
        value={props.price}
        onChange={onChange}
      />
    </div>
    </>
  )
}

export default GymPricePerHour