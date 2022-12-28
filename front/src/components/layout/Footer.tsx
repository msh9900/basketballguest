import classes from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <div>
        <ul className={classes.menus}>
          <li className={classes.menu}>사업자 정보</li>
          <li className={classes.menu}>이용약관</li>
          <li className={classes.menu}>개인정보처리방침</li>
          <li className={classes.menu}>고객센터</li>
        </ul>
      </div>
      <div className={classes.copyright}>
        ⓒ 2023 MOS Company. All Rights Reserved.
      </div>
    </footer>
  );
}
