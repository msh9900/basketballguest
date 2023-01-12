// component
import Articles from './articles/MainArticles';
import Filter from './filter/Filter';
import Order from './order/Order';
import Search from './search/Search';
// library
import { useNavigate} from 'react-router-dom';
import { useState} from 'react';
// style
import cls from './Rental.module.scss';

const Rental = () => {
  const [searchRes, setSearchRes] = useState('');
  const navigate = useNavigate();
  
  const [orderStatus, setOrderStatus] = useState({
    ispriceOrderOn: false,
    isdistanceOrderOn: false,
  })

  const [filterStatus, setFilterStatus] = useState({
    activeAreas: [],
    priceRange: [],
    periodRange: [],
    ispriceActive: false,
    isperiodActive: false
  })

  const goToPosting = () => {
    navigate('/gym/post')
  }

  return (
    <>
      <div className={cls.rentalCompLayout}>
        <button className={cls.postButton} onClick={goToPosting}>
          글쓰기
        </button>
        <Order orderStatus={orderStatus} setOrderStatus={setOrderStatus}/>
        <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>
        <Search 
          orderStatus={orderStatus} setOrderStatus={setOrderStatus}
          filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          searchRes={searchRes} setSearchRes={setSearchRes}/>
        <Articles />
      </div>
    </>
  );
};

export default Rental;
