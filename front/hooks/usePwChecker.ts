import { useState, useEffect } from "react";

interface Props {
  pw: string;
  pw2: string;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPwSame: React.Dispatch<React.SetStateAction<boolean>>;
}

const usePwChecker = ({pw, pw2, setIsValid, setIsPwSame}:Props) => {

  useEffect(() => {
    // CHECK VALIDITY
    if (
      pw === pw2 &&
      pw.match(
        /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{4,}$/
      )
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    // CHECK MATCHING
    if(pw === pw2) setIsPwSame(true)
    else setIsPwSame(false)

  }, [pw, pw2]);

}

export default usePwChecker