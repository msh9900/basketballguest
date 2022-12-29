import classes from "./Footer.module.scss";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div>
        <ul className={classes.menus}>
          <li className={classes.menu}>
            <Link to="/" className={classes.font}>
              사업자 정보
            </Link>
          </li>
          <li className={classes.menu}>
            <Link to="/" className={classes.font}>
              이용약관
            </Link>
          </li>
          <li className={classes.menu}>
            <Link to="/" className={classes.font}>
              개인정보처리방침
            </Link>
          </li>
          <li className={classes.menu}>
            <Link to="/" className={classes.font}>
              고객센터
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.copyright}>
        ⓒ 2023 MOS Company. All Rights Reserved.
      </div>
    </footer>
  );
}
