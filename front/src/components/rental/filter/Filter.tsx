// style
import cls from "./Filter.module.scss";

// component
import FilterArea from './Filter_Area'
import FilterPrice from './Filter_Price'
import SelectedValues from './SelectedValues'

// library
import {useState} from 'react'

const Filter = () => { 
  // filter on off
  const [areaFilter, setAreaFilter] = useState(false)
  const [priceFilter, setPriceFilter] = useState(false)

  // filters
  const [areas, setAreas] =  useState<string[]>([])
  const [priceRange, setPriceRange] =  useState<string[]>(['', ''])
  const [priceActive, setPriceActive] = useState(false)

  const priceFilterOn = () => {
    setAreaFilter(false)
    setPriceFilter(prev=>!prev)
  }
  const areaFilterOn = () => {
    setPriceFilter(false)
    setAreaFilter(prev=>!prev)
  }
  const filterReset = () => {
    setAreas([])
    setPriceRange(['',''])
    setPriceActive(false)
  }

  return (
    <div className={cls.FilterLayout}>
      <h3 className='topTitle'>필터 : </h3>

      {/* 현재 필터링 태그 */}
      <SelectedValues 
        areas={areas} 
        setAreas={setAreas} 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
        priceActive={priceActive}
        setPriceActive={setPriceActive}
      />

      {/* 지역 필터 버튼 */}
      <button 
        className={areaFilter ? cls.on : cls.off} 
        onClick={areaFilterOn}>지역
      </button>
      
      {/* 가격 필터 버튼 */}
      <button 
        className={priceFilter ? cls.on : cls.off} 
        onClick={priceFilterOn}>가격
      </button>

      {/* 리셋 필터 버튼 */}
      <button 
        className={cls.reset} 
        onClick={filterReset}>리셋
      </button>
      
      {/* 각 필터 생성기*/}
      {areaFilter && <FilterArea areas={areas} setAreas={setAreas}/>}
      {priceFilter && <FilterPrice 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
        setPriceActive={setPriceActive}/>}
    </div>
  )
}
export default Filter