// library
// import { useNavigate} from 'react-router-dom';
import { useState} from 'react';
import { useRouter } from 'next/router'

// style
import cls from './Rental.module.scss';
// component
import AllArticles from './allArticles/AllArticles';
import Filter from './filter/Filter';
import Order from './order/Order';
import Search from './search/Search';

const Rental = () => {
  const [searchRes, setSearchRes] = useState('');
  const router = useRouter()
  // const navigate = useNavigate();
  
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
    // navigate('/gym/post')
    router.push('/gym/post')
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
        <AllArticles />
      </div>
    </>
  );
};

export default Rental;
