import classes from "./Button2.module.scss";
// import { Link } from "react-router-dom";

import Link from 'next/link'

export default function Button2(props: any) {
  return (
    <Link href={props.src} className={classes.link}>
      자세히 보기
    </Link>
  );
}
