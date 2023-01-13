import cls from '../inputStyle/TextInput.module.scss'

interface Props{
  title:string
  setTitle:React.Dispatch<React.SetStateAction<string>>
}

const GymTitle = (props:Props) => {
  const onChange = (e:any) => {
    props.setTitle(e.target.value)
  }
  return (
    <>
      <h3 className={cls.explanation}>제목</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          placeholder='ex : 강동 다이나믹짐 오픈했습니다.'
          value={props.title}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default GymTitle

