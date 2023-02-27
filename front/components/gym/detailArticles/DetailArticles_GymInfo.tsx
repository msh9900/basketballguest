// component
import cls from "./DetailArticles.module.scss";
import SlickSlider from "./SlickSlider";
// react & next
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

import parse from 'html-react-parser';
// types
import gymArticleDataType from "util/types/gymArticleDataType";

interface Props {
  gymInfo: gymArticleDataType;
  setIsArticleEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isFetchingArticles: boolean;
  setIsFetchingArticles: React.Dispatch<React.SetStateAction<boolean>>;
}

const htmlString = '<div><p>hello</p><p>World</p></div>';
const DetailArticles_GymInfo = (props: Props) => {
  useEffect(() => {
    autoResizeTextarea();
  }, []);

  // useEffect(() => {
  //   console.log('isFetchingArticles', props.isFetchingArticles)
  // }, [props.isFetchingArticles]);

  const router = useRouter();
  // DELETE
  const deleteArticle = async () => {
    const pId = router.query.articles as string;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rental/article?pid=${pId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      router.push("/gym");
    } catch (err: any) {
      alert("게시글 DELETE 실패");
    }
  };

  const getOpeningDaysFromData = () => {
    let temp: string[] = [];
    props.gymInfo.openingDays.forEach((ele: any) => {
      if (ele.open === true) temp.push(ele.name);
    });
    return temp;
  };

  const autoResizeTextarea = () => {
    let textarea = document.querySelector(
      ".autoTextarea"
    ) as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = "auto";
      let height = textarea.scrollHeight; // 높이
      textarea.style.height = `${height + 8}px`;
    }
  };

  return (
    <>
      {!props.isFetchingArticles && (
        <>
          <h1>체육관 정보</h1>
          <div className={cls.contentBox}>
            <div className={cls.mainContent}>
              <div className={cls.titleSection}>
                <div className={cls.Left}>
                  <h2>{props.gymInfo.title}</h2>
                </div>
                <div className={cls.Right}>
                  <button
                    onClick={() => {
                      props.setIsArticleEditing(true);
                    }}
                  >
                    <Image
                      src="/images/rental/pencil.png"
                      alt="수정 버튼"
                      width="25"
                      height="25"
                    />
                  </button>
                  <button onClick={deleteArticle}>
                    <Image
                      src="/images/rental/bin.png"
                      alt="삭제 버튼"
                      width="25"
                      height="25"
                    />
                  </button>
                </div>
              </div>

              <div className={cls.eachContent}>
                {props.gymInfo.userName} | {props.gymInfo.createdAt}
              </div>
            </div>

            <div className={cls.imgContent}>
              <SlickSlider gymImg={props.gymInfo.gymImg} />
            </div>

            <div className={cls.mainContent}>
              <div className={cls.eachContent}>
                {/* <textarea readOnly className="autoTextarea">
                  {props.gymInfo.content}
                </textarea> */}
                {parse(props.gymInfo.content)}
              </div>
            </div>

            <div className={cls.mainContent}>
              <div className={cls.eachContent}>
                <div className={cls.flex}>
                  <div className={cls.Left}>
                    <b>연락처</b>
                  </div>
                  <div className={cls.Right}>
                    {props.gymInfo.contact
                      ? props.gymInfo.contact
                      : "010-0000-0000"}
                  </div>
                </div>
              </div>
            </div>

            <div className={cls.mainContent}>
              <div className={cls.eachContent}>
                <div className={cls.flex}>
                  <div className={cls.Left}>우편번호</div>
                  <div className={cls.Right}>
                    {props.gymInfo.address[0].val}
                  </div>
                </div>

                <div className={cls.flex}>
                  <div className={cls.Left}>도로명주소</div>
                  <div className={cls.Right}>
                    {props.gymInfo.address[1].val}
                  </div>
                </div>

                <div className={cls.flex}>
                  <div className={cls.Left}>지번주소</div>
                  <div className={cls.Right}>
                    {props.gymInfo.address[2].val}
                  </div>
                </div>

                <div className={cls.flex}>
                  <div className={cls.Left}>상세주소</div>
                  <div className={cls.Right}>
                    {props.gymInfo.address[3].val}
                  </div>
                </div>

                <div className={cls.flex}>
                  <div className={cls.Left}>참고정보</div>
                  <div className={cls.Right}>
                    {props.gymInfo.address[4].val}
                  </div>
                </div>
              </div>
            </div>

            <div className={cls.mainContent}>
              <div className={cls.eachContent}>
                <div className={cls.flex}>
                  <div className={cls.Left}>가격</div>
                  <div className={cls.Right}>{props.gymInfo.price} 원/시간</div>
                </div>
              </div>
            </div>

            <div className={cls.mainContent}>
              <div className={cls.eachContent}>
                <div className={cls.flex}>
                  <div className={cls.Left}>오픈시간</div>
                  <div className={cls.Right}>{props.gymInfo.openingHours}</div>
                </div>
              </div>
            </div>

            <div className={cls.mainContent}>
              <div className={cls.eachContent}>
                <div className={cls.flex}>
                  <div className={cls.Left}>오픈기간</div>
                  <div className={cls.Right}>
                    {props.gymInfo.openingPeriod[0].slice(0, 10)} ~
                    {props.gymInfo.openingPeriod[1].slice(0, 10)}
                  </div>
                </div>
              </div>
            </div>

            <div className={cls.mainContent}>
              <div className={cls.eachContent}>
                <div className={cls.flex}>
                  <div className={cls.Left}>영업일</div>
                  <div className={cls.Right}>{getOpeningDaysFromData()}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailArticles_GymInfo;
