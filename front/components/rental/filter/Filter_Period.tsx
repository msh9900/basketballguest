import cls from './Filter_Period.module.scss'
import {useState} from 'react'

// util
import getDate from './getDate'

interface Props{
  period:Array<string>
  setPeriod:React.Dispatch<React.SetStateAction<string[]>>;
  periodActive:boolean;
  setPeriodActive:React.Dispatch<React.SetStateAction<boolean>>
}

const Filter_Period = (props:Props) => {

  const [stt, setStt] = useState(getDate('today'))
  const [end, setEnd] = useState(getDate('tomorrow'))

  // 시작일 변경
  const onChangeStart = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if(val > props.period[1]){
      alert('시작일은 종료일보다 늦을 수 없습니다.')
      return
    }
    setStt(val)
  }

  // 종료일 변경
  const onChangeEnd = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if(props.period[0] > val){
      alert('종료일은 시작일보다 빠를 수 없습니다.')
      return
    }
    setEnd(val)
  }

  // 기간 설정
  const setOn = () => {
    props.setPeriod([stt, end])
    props.setPeriodActive(true)
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
              value={stt} 
              onChange={onChangeStart}
            />
          </div>

          <div>
            <span>종료기간</span>
            <input 
              type="date"
              id="date"
              value={end} 
              onChange={onChangeEnd}
            />
          </div>

          <div>
            {<button onClick={setOn}> 기간설정 ON </button>}
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Filter_Period