import cls from '../inputStyle/TextInput.module.scss'
interface Props{
  openingPeriod:string[]
  setOpeningPeriod:React.Dispatch<React.SetStateAction<string[]>>
}

const GymOpeningPeriod = (props:Props) => {

  const getCurrentDate = (param:string) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    if (param==='today') return `${year}-${month}-${day}`
    else if (param==='nextYear') return `${year+1}-${month}-${day}`
  }

  const today = getCurrentDate('today') as string
  const nextYear = getCurrentDate('nextYear') as string

  const inputDefaultValue = (e:any) => {
    e.preventDefault()
    props.setOpeningPeriod([today, nextYear])
  }

  const deleteInputValue = (e:any) => {
    e.preventDefault()
    props.setOpeningPeriod(['', ''])
  }

  const onChange = (e:any) => {
    const val = e.target.value
    if(val === 'periodStart'){
      props.setOpeningPeriod([val, props.openingPeriod[1]])
    }
    else{
      props.setOpeningPeriod([props.openingPeriod[0], val])
    }
  }

  return (
    <div>
      <h3 className={cls.explanation}>개장기간 (시작, 종료)</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          id='periodStart'
          placeholder={'ex : ' + getCurrentDate('today')}
          autoComplete="off"
          value={props.openingPeriod[0]}
          onChange={onChange}
        />
      </div>

      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <input
          type='text'
          id='periodEnd'
          placeholder={'ex : ' + getCurrentDate('nextYear')}
          autoComplete="off"
          value={props.openingPeriod[1]}
          onChange={onChange}
        />
      </div>
      <button className={cls.defaultValBtn} onClick={inputDefaultValue}>
        기본값 넣기
      </button>
      <button className={cls.defaultValBtn} onClick={deleteInputValue}>
        비우기
      </button>
    </div>
  )
}

export default GymOpeningPeriod