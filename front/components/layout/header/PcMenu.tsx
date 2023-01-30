import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import Link from "next/link";
import classes from "./Header.module.scss";
import RouteMap from "./_RouteMap";

const PcMenu = () => {
  return (
    <>
      {/* 홈 */}
      <Link href="/" className={classes.homename}>
        <div>
          <SportsBasketballIcon />
        </div>
        <div>BPT</div>
      </Link>

      {/* 상단 메뉴 */}
      <div className={classes.listcontainer}>
        {Object.entries(RouteMap).map(([key, value]) => (
          <Link key={key} href={value} className={classes.HeaderList}>
            {key}
          </Link>
        ))}
      </div>
    </>
  );
};

export default PcMenu;
