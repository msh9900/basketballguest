// library
import { useState } from "react";
import { useRouter } from "next/router";

// style
import cls from "./Gym.module.scss";
// component
import AllArticles from "./mainArticles/AllArticles";
import Filter from "./mainArticles/filter/Filter";
import Order from "./mainArticles/order/Order";
import SearchSection from "./mainArticles/search/Search";
import { useSelector } from "react-redux";
import orderStatusType from './mainArticles/order/interface_orderStatus';

const Rental = () => {
  const router = useRouter();
  const stateId = useSelector((state: any) => state.login.userId);
  const [searchRes, setSearchRes] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [needToSearch, setNeedToSearch] = useState(true);
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

  const goToPosting = () => {
    if (stateId == "") {
      alert("로그인이 필요합니다.");
      return;
    }
    router.push("/gym/post");
  };

  return (
    <>
      <div className={cls.rentalCompLayout}>
        <button className={cls.postButton} onClick={goToPosting}>
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
        />
          <AllArticles
            order={orderStatus}
            filter={filterStatus}
            searchVal={searchVal}
            needToSearch={needToSearch}
            setNeedToSearch={setNeedToSearch}
          />
      </div>
    </>
  );
};

export default Rental;
