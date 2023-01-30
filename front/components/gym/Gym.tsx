// library
import { useState } from "react";
import { useRouter } from "next/router";

// style
import cls from "./Gym.module.scss";
// component
import AllArticles from "./mainArticles/AllArticles";
import Filter from "./mainArticles/filter/Filter";
import Order from "./mainArticles/order/Order";
import Search from "./mainArticles/search/Search";
import { useSelector } from "react-redux";

const Rental = () => {
  const stateId = useSelector((state: any) => state.login.userId);
  const router = useRouter();
  const [searchRes, setSearchRes] = useState("");
  const [needToSearch, setNeedToSearch] = useState(true);
  const [orderStatus, setOrderStatus] = useState({
    ispriceOrderOn: false,
    isdistanceOrderOn: false,
  });
  const [filterStatus, setFilterStatus] = useState({
    activeAreas: [],
    priceRange: [],
    periodRange: [],
    ispriceActive: false,
    isperiodActive: false,
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
        <Order orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
        <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <Search
          orderStatus={orderStatus}
          setOrderStatus={setOrderStatus}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchRes={searchRes}
          setSearchRes={setSearchRes}
          setNeedToSearch={setNeedToSearch}
        />
        <AllArticles
          orderStatus={orderStatus}
          filterStatus={filterStatus}
          searchRes={searchRes}
          needToSearch={needToSearch}
          setNeedToSearch={setNeedToSearch}
        />
      </div>
    </>
  );
};

export default Rental;
