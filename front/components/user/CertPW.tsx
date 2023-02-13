import { useRouter } from "next/router";
import { useState, useCallback } from "react";

import cls from "./Cert.module.scss";

const CertPW = () => {
  const [certificationNumber, setCertificationNumber] = useState("");
  const [backupCertNum, setBackupCertNum] = useState("");
  const [isCertSuccess, setIsCertSuccess] = useState(false);
  const [resultByCert, setResultByCert] = useState();
  const [newPw1, setNewPw1] = useState("");
  const [newPw2, setNewPw2] = useState("");

  const router = useRouter();

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/matchpw`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ certificationNumber }),
        }
      );
      const result = await res.json();

      if (result.msg == "이메일 인증 완료") {
        setIsCertSuccess(true);
        setBackupCertNum(certificationNumber);
        alert("이메일 인증 성공");
        router.push("/login");
      } else {
        // 사용자에게 인증번호 불일치 안내 메시지
        setIsCertSuccess(false);
        alert("인증번호 불일치");
      }
    } catch (err: any) {
      console.log("인증 API 작동 실패", err);
    }
  };

  const onChangePw1 = (e: any) => {
    setNewPw1(e.target.value);
  };
  const onChangePw2 = (e: any) => {
    setNewPw2(e.target.value);
  };
  const onSubmitNewPw = (e: any) => {
    e.preventDefault();
    resetPw();
  };
  const onClickNewPw = () => {
    resetPw();
  };
  const resetPw = async () => {
    if (newPw1 !== newPw2) {
      alert("두 입력창의 비밀번호가 다릅니다.");
      return;
    }

    const resetPwBody = {
      certificationNumber: backupCertNum,
      newPassword: newPw1,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/setpw`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetPwBody }),
        }
      );
      const result = await res.json();
      await alert("비밀번호 변경 성공");
    } catch (err: any) {
      console.log("인증 API 작동 실패", err);
      await alert("새 비밀번호 POST 실패");
    }
  };

  return (
    <div className={cls.CertLayout}>
      <div className={cls.center}>
        <h2> 비밀번호 재설정 페이지</h2>
        <p>메일로 받은 인증번호를 입력해 주세요</p>

        <form onSubmit={onSubmit}>
          <input value={certificationNumber} onChange={onChangeCertNum} />
        </form>
        <button onClick={sendCertNum}>입력</button>

        {/* http://localhost:3000/auth/lostPw */}

        {isCertSuccess && (
          <div className={cls.showResult}>
            <h3>인증 성공!</h3>
            <div>
              <form onSubmit={onSubmitNewPw}>
                <p>바꿀 비밀번호 입력</p>
                <input type="password" value={newPw1} onChange={onChangePw1} />
                <p>바꿀 비밀번호 다시 한번 입력</p>
                <input type="password" value={newPw2} onChange={onChangePw2} />
              </form>
              <p>비밀번호를 재설정하시겠습니까?</p>
              <button onClick={onClickNewPw}>변경</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertPW;
