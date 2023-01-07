// import 
import cls from '../inputStyle/CheckBoxInput.module.scss'
import {useState, useEffect} from 'react'

const GymOpeningDays = () => {

  const days = ['일','월','화','수','목','금','토']
  const [openingDays, setOpeningDays] = useState(
    [
      {name:'일', open:false},
      {name:'월', open:false},
      {name:'화', open:false},
      {name:'수', open:false},
      {name:'목', open:false},
      {name:'금', open:false},
      {name:'토', open:false},
    ]
  )
  const [selectedOnes, setSelectedOnes] = useState<string[]>([])

  useEffect(()=>{
    const iterables = [...openingDays]
    const arr:string[] = []
    for(const x of iterables){
      if(x.open === true){
        arr.push(x.name)
      }
    }
    setSelectedOnes(arr)
  }, [openingDays])

  const checkClicked = (day:string) => {
    const iterables = [...openingDays]
    for(const x of iterables){
      if(x.name === day){
        return x.open
      }
    }
  }

  const setClicked = (day:string) => {
    let res:any = [...openingDays]
    for(const x of res){
      if(x.name === day){
        x.open = !x.open
      }
    }
    setOpeningDays(res)
    return false
  }
  return (
    <div>
      <h3 className={cls.explanation}>영업일</h3>
      <div className={cls.Input_CheckBoxLayout}>
        {days.map((v,i)=>(
          <label htmlFor={v} className={checkClicked(v) ? cls.on : cls.off} key={v}>
            <input type="checkbox" id={v} onChange={()=>setClicked(v)}/>{v}
          </label>
        ))}
      </div>
    </div>
  )
}

export default GymOpeningDays