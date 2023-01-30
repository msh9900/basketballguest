import cls from "../inputStyle/FileInput.module.scss";
import ImgPop from "util/ImgPop";

interface Props {
  imgFormData: any;
  setImgFormData: any;
  inputImgs: any;
  setInputImgs: any;
}

const GymImages = (props: Props) => {
  // 이미지 파일 업로드 클릭 (브라우저 메모리)
  let len = 0;
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
    props.setImgFormData(FD);
    props.setInputImgs(urlArr);
  };

  function resetGymImages() {
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
    props.setInputImgs([]);
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

      {props.inputImgs.length > 0 && (
        <>
          <div className={cls.imgBox}>
            {props.inputImgs?.map((v: any, i: number) => (
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
          <button onClick={resetGymImages}>전체삭제</button>
        </>
      )}
    </div>
  );
};

export default GymImages;
