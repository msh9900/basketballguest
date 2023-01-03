import cls from './Filter_Period.module.scss'

interface Props{
  period:Array<string>
  setPeriod:React.Dispatch<React.SetStateAction<string[]>>;
  periodActive:boolean;
  setPeriodActive:React.Dispatch<React.SetStateAction<boolean>>
}

const Filter_Period = (props:Props) => {

  // 시작일 변경
  const onChangeStart = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if(val > props.period[1]){
      alert('시작일은 종료일보다 늦을 수 없습니다.')
      return
    }
    props.setPeriod([val, props.period[1]])
  }

  // 종료일 변경
  const onChangeEnd = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if(props.period[0] > val){
      alert('종료일은 시작일보다 빠를 수 없습니다.')
      return
    }
    props.setPeriod([props.period[0], val])
  }

  // 기간 설정
  const setOn = () => {
    props.setPeriodActive(true)
  }
  // 설정 취소
  const setOff = () => {
    props.setPeriodActive(false)
  }
  
  return (
    <>
      <div className={cls.periodFilterLayout}>

        <div>

          <div>
            <span>시작기간</span>
            <input 
              type="date"
              id="date"
              value={props.period[0]}
              onChange={onChangeStart}
            />
          </div>

          <div>
            <span>종료기간</span>
            <input 
              type="date"
              id="date"
              value={props.period[1]}
              onChange={onChangeEnd}
            />
          </div>

          <div>
            { props.periodActive && <button onClick={setOff}>기간설정 Off</button>}
            {!props.periodActive && <button onClick={setOn}> 기간설정 ON </button>}
          </div>

        </div>
        
      </div>
    </>
  )
}

export default Filter_Period