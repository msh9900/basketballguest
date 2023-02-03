import { useState, useCallback } from "react";

import cls from "./Cert.module.scss";

const CertID = () => {
  const [certificationNumber, setCertificationNumber] = useState("");
  const [isCertSuccess, setIsCertSuccess] = useState(false);
  const [resultByCert, setResultByCert] = useState("");

  // Certification Number
  const onChangeCertNum = (e: any) => {
    setCertificationNumber(e.target.value);
  };

  // 마우스로 클릭
  const sendCertNum = () => {
    callCompareFunc();
  };

  // 키보드 엔터
  const onSubmit = (e: any) => {
    e.preventDefault();
    callCompareFunc();
  };

  const callCompareFunc = useCallback(
    () => compareCertNum(certificationNumber),
    [certificationNumber]
  );

  const compareCertNum = async (certificationNumber: any) => {
    try {
      const res = await fetch("http://localhost:4000/auth/matchid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificationNumber }),
      });
      const result = await res.json();

      if (result.msg == "이메일 인증 완료") {
        // 사용자에게 ID 돌려줌
        setIsCertSuccess(true);
        setResultByCert(result.id);
        alert("이메일 인증 성공");
      } else {
        // 사용자에게 인증번호 불일치 안내 메시지
        setIsCertSuccess(false);
        alert("인증번호 불일치");
      }
    } catch (err: any) {
      console.log("인증 API 작동 실패", err);
    }
  };

  return (
    <div className={cls.CertLayout}>
      <div className={cls.center}>
        <h2> 아이디 찾기 페이지</h2>
        <p>메일로 받은 인증번호를 입력해 주세요</p>

        <form onSubmit={onSubmit}>
          <input value={certificationNumber} onChange={onChangeCertNum} />
        </form>
        <button onClick={sendCertNum}>입력</button>

        {isCertSuccess && (
          <div className={cls.showResult}>
            <h4>인증 성공!</h4>
            <div>ID : {resultByCert}</div>
            <div>홈페이지로 이동</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertID;
