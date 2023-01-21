// library
import { useState, useCallback} from 'react';
import { useRouter } from 'next/router'

// style
import cls from './Gym.module.scss';
// component
import AllArticles from './mainArticles/AllArticles';
import Filter from './mainArticles/filter/Filter';
import Order from './mainArticles/order/Order';
import Search from './mainArticles/search/Search';

const Rental = () => {
  const router = useRouter()
  const [searchRes, setSearchRes] = useState('');
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

  const goToPosting = useCallback(() => {
    router.push('/gym/post')
  }, []);

  const jsonserverPostTest = async () => {
    const testResponse = await fetch("http://localhost:5004/test", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        value: "tests...",
      }),
    }).then((response) => console.log('jsonserverPostTest response', response));
  }

  return (
    <>
    <button onClick={jsonserverPostTest}> 글쓰기 테스트 (JSON-SERVER) </button>
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
