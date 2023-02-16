// library
import { useState, useCallback } from "react";
import { useRouter } from "next/router";



// style
import cls from "./Gym.module.scss";
// component
import AllArticles from "./allArticles/AllArticles";
import Filter from "./allArticles/filter/Filter";
import Order from "./allArticles/order/Order";
import SearchSection from "./allArticles/search/Search";
import { useSelector } from "react-redux";
import orderStatusType from './allArticles/order/interface_orderStatus';

const Rental = () => {
  const router = useRouter();
  const stateId = useSelector((state: any) => state.login.userId);
  const [searchRes, setSearchRes] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [needToSearch, setNeedToSearch] = useState(true);
  const [showSearchRes, setShowSearchRes] = useState(false)
  const [orderStatus, setOrderStatus] = useState<orderStatusType>({
    isPriceOrderOn: false,
    isAsc : false,
    isDistanceOrderOn: false,
    lat: '',
    lng: '',
  });
  const [filterStatus, setFilterStatus] = useState({
    activeAreas: [],
    priceRange: [],
    periodRange: [],
    isPriceActive: false,
    isPeriodActive: false,
  });


  const goToPosting = useCallback((stateId:string) => {
    if (stateId == "") {
      alert("로그인이 필요합니다.");
      return;
    }
    router.push("/gym/post");
  },[stateId])

  return (
    <>
      <div className={cls.rentalCompLayout}>

        <div className={cls.emptyBox}></div>
        <button className={cls.postButton} onClick={()=>goToPosting(stateId)}>
          글쓰기
        </button>
        <Order 
        setOrderStatus={setOrderStatus} 
        />
        <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <SearchSection
          orderStatus={orderStatus}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchRes={searchRes}
          setSearchRes={setSearchRes}
          setNeedToSearch={setNeedToSearch}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          showSearchRes={showSearchRes}
          setShowSearchRes={setShowSearchRes}
        />
          <AllArticles
            order={orderStatus}
            filter={filterStatus}
            searchVal={searchVal}
            needToSearch={needToSearch}
            setNeedToSearch={setNeedToSearch}
            setSearchRes={setSearchRes}
            setShowSearchRes={setShowSearchRes}
          />
      </div>
    </>
  );
};

export default Rental;
