// import 
import cls from '../inputStyle/CheckBoxInput.module.scss'
import {useEffect} from 'react'

type name_open = {
  name: string;
  open: boolean;
}
interface Props{
  openingDays:name_open[]
  setOpeningDays:React.Dispatch<React.SetStateAction<name_open[]>>
}

const GymOpeningDays = (props:Props) => {

  const days = ['일','월','화','수','목','금','토']
  
  useEffect(()=>{
    const iterables = [...props.openingDays]
    const arr:string[] = []
    for(const x of iterables){
      if(x.open === true){
        arr.push(x.name)
      }
    }
  }, [props.openingDays])

  const checkClicked = (day:string) => {
    const iterables = [...props.openingDays]
    for(const x of iterables){
      if(x.name === day){
        return x.open
      }
    }
  }

  const setClicked = (day:string) => {
    let res:any = [...props.openingDays]
    for(const x of res){
      if(x.name === day){
        x.open = !x.open
      }
    }
    props.setOpeningDays(res)
    return false
  }

  return (
    <div className={cls.openingDaysLayout}>
      <h3 className={cls.explanation}>영업일</h3>
      <div className={cls.Input_CheckBox}>
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