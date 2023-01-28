import { useState, useEffect } from "react";
import cls from "../inputStyle/FileInput.module.scss";
import { useRouter } from "next/router";

interface Props {
  isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setNeedToSendImg: any;
  needToSendImg: boolean;
  textData: any;
}

const GymImages = (props: Props) => {
  // let formData: any = new FormData();
  const router = useRouter();

  useEffect(() => {
    if (props.needToSendImg === true) {
      sendImgs();
    }
  }, [props.needToSendImg]);

  // useEffect(() => {
  //   formData = new FormData();
  // }, []);

  // 이미지 파일 업로드 클릭 (브라우저 메모리)
  let len = 0;
  const [inputImgs, setInputImgs] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>();

  const handleImageUpload = (event: any) => {
    const fileArr = event.target.files;
    len = 0;
    len = fileArr.length > 10 ? 10 : fileArr.length;
    let urlArr = [];

    const FD = new FormData();
    for (let i = 0; i < len; i++) {
      FD.append("img", event.target.files[i]);
      urlArr.push(URL.createObjectURL(fileArr[i]));
    }
    setFormData(FD);

    // console.log('formData.get("img")', urlArr);

    setInputImgs(urlArr);
  };

  // 이미지 전송 (전송 버튼 클릭)
  const sendImgs = async () => {
    // console.log('formData.get("img")', formData.get("img"));

    const fd = new FormData();
    fd.append("userId", props.textData.userId);
    fd.append("userName", props.textData.userName);
    fd.append("title", props.textData.title);
    fd.append("content", props.textData.content);
    fd.append("contact", props.textData.contact);
    fd.append("userImg", JSON.stringify(inputImgs));
    fd.append("address", JSON.stringify(props.textData.address));
    fd.append("price", props.textData.price);
    fd.append("openingHours", JSON.stringify(props.textData.openingHours));
    fd.append("openingPeriod", JSON.stringify(props.textData.openingPeriod));
    fd.append("openingDays", JSON.stringify(props.textData.openingDays));

    for (const pair of formData.entries()) {
      fd.append(pair[0], pair[1]);
    }

    try {
      await fetch("http://localhost:4000/rental/article", {
        method: "POST",
        body: fd,
      });
      // router.push("/gym");
      console.log("이미지 데이터 post 성공 : ");
    } catch (error: any) {
      console.log("이미지 데이터 post 실패 : ", error);
    }

    // await props.setIsLoading(false);
    await props.setNeedToSendImg(false);
  };

  const ImgPop = (v: string) => {
    var img = new Image();
    img.src = v;
    const winWidth = 500;
    const winHeight = 500;
    const attr = `width=${winWidth}, height=${winHeight}, menubars=no, scrollbars=auto style="cursor:pointer;"`;
    var OpenWindow = window.open("", "_blank", attr) as typeof window;
    OpenWindow.document.write(
      `<img src=${v} width=100% onClick='window.close()'/>`
    );
  };

  function resetForm() {
    // input 삭제
    const imgInput = document.querySelector("#file");
    imgInput?.remove();

    // input 생성
    const loc = document.querySelector("#imgFormLoc") as HTMLElement;
    const inputEle = document.createElement("input");
    inputEle.type = "file";
    inputEle.id = "file";
    inputEle.name = "file";
    inputEle.setAttribute("multiple", "");
    inputEle.accept = "image/*";
    inputEle.addEventListener("change", function (e) {
      handleImageUpload(e);
    });
    loc.append(inputEle);

    // 썸네일 삭제
    setInputImgs([]);
  }

  return (
    <div className={cls.GymImagesLayout}>
      <form id="imgForm" encType="multipart/form-data">
        <div id="imgFormLoc" className={cls.inputDiv}>
          <h3 className={cls.explanation}>체육관 사진</h3>
          <label htmlFor="file">
            <div className={cls.btnUpload}>
              <span>(최대 10장)</span>
            </div>
          </label>
          <input
            type="file"
            id="file"
            multiple
            name="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </form>

      {inputImgs.length > 0 && (
        <>
          <div className={cls.imgBox}>
            {inputImgs?.map((v, i) => (
              <img
                key={i}
                src={v}
                alt="gymImgs"
                onClick={() => {
                  ImgPop(v);
                }}
              ></img>
            ))}
          </div>
          <button onClick={resetForm}>전체삭제</button>
        </>
      )}
    </div>
  );
};

export default GymImages;
