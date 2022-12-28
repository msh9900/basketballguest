import React from "react";
import classes from "./Button.module.scss";
export default function Button(props: any) {
  return <button className={classes.button}>{props.children}</button>;
}
