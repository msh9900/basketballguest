import cls from '../inputStyle/TextInput.module.scss'

interface Props{
  openingHours:string
  setOpeningHours:React.Dispatch<React.SetStateAction<string>>
}

const GymOpeningHours = (props:Props) => {
  const inputDefaultValue = (e:any) => {
    e.preventDefault()
    props.setOpeningHours('09:00~20:00')
  }
  const deleteInputValue = (e:any) => {
    e.preventDefault()
    props.setOpeningHours('')
  }
  const onChange = (e:any) => {
    props.setOpeningHours(e.target.value)
  }

  return (
    <>
      <h3 className={cls.explanation}>영업시간</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          id='GymOpeningHours'
          type='text'
          placeholder='ex : 09:00~20:00'
          value={props.openingHours}
          onChange={onChange}
        />
      </div>
      <button className={cls.defaultValBtn} onClick={inputDefaultValue}>
        기본값 넣기
      </button>
      <button className={cls.defaultValBtn} onClick={deleteInputValue}>
        비우기
      </button>
    </>
  )
}

export default GymOpeningHours