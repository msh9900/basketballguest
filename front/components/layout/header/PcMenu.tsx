import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import Link from "next/link";
import cls from "./Header.module.scss";
import RouteMap from "./_RouteMap";

const PcMenu = () => {
  return (
    <>
      {/* 홈 */}
      <Link href="/" className={cls.homename}>
        <div>
          <SportsBasketballIcon />
        </div>
        <div>BPT</div>
      </Link>

      {/* 상단 메뉴 */}
      <div className={cls.listcontainer}>
        {Object.entries(RouteMap).map(([key, value]) => (
          <Link key={key} href={value} className={cls.HeaderList}>
            {key}
          </Link>
        ))}
      </div>
    </>
  );
};

export default PcMenu;
