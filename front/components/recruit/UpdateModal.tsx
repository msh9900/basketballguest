import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./UpdateModal.module.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
export default function UpdateModal(props: any) {
  const router = useRouter();
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);
  const [imgFile, setImgFile] = useState<any[]>([]);
  const [contentText, setContentText] = useState("");
  const [titleText, setTitleText] = useState("");
  const imgRef: any = useRef();

  const readImage = () => {
    if (imgRef.current.files.length > 6) {
      setImgFile([]);
      alert("이미지는 최대 6장 입니다.");
    } else {
      const data: string[] = [];
      for (let i = 0; i < imgRef.current.files.length; i++) {
        const file = URL.createObjectURL(imgRef.current.files[i]);
        data.push(file);
        setImgFile(data);
      }
    }
  };

  const textChange = (e: any) => {
    setContentText(e.target.value);
  };
  const titleChange = (e: any) => {
    setTitleText(e.target.value);
  };
  const contentSubmitHandler = async (e: any) => {
    e.preventDefault();
    setTimeout(() => router.reload(), 1000);

    const FD = new FormData();
    FD.append("userId", userId);
    FD.append("title", titleText);
    FD.append("userImg", userImg);
    FD.append("content", contentText);
    FD.append("imgSrc", JSON.stringify(imgFile));
    FD.append("contentIdx", props.data.contentIdx);
    for (let i = 0; i < imgRef.current.files.length; i++) {
      FD.append("img", imgRef.current.files[i]);
    }
    //글 업데이트 fetch 구현

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/article`,
      {
        method: "PUT",
        body: FD,
      }
    );
  };

  useEffect(() => {
    setTitleText(props.data.title);
    setContentText(props.data.content);
    setImgFile(props.data.imgSrc);
  }, []);
  return (
    <>
      <form
        onSubmit={contentSubmitHandler}
        className={classes.container}
        encType="multipart/form-data"
      >
        <div className={classes.title}>게시물 수정</div>
        <div className={classes.content}>
          <div className={classes.userBox}>
            <Avatar alt="Remy Sharp" src={userImg} />
            <div>{userId}</div>
          </div>
          <div className={classes.contentTitle}>
            <div>글 제목:</div>
            <input
              className={classes.inputTitle}
              type="test"
              onChange={titleChange}
              value={titleText}
            ></input>
          </div>
          <div>
            <TextField
              variant="standard"
              InputProps={{
                sx: { height: 150, fontSize: 24 },
                disableUnderline: true,
              }}
              maxRows={4}
              placeholder="유저님은 무슨생각을 하고 계신가요?"
              multiline
              fullWidth
              onChange={textChange}
              value={contentText}
            />
          </div>
          <div className={classes.contentImgBox}>
            {imgFile &&
              imgFile.map((val: any, idx: any) => (
                <img
                  key={idx}
                  src={val}
                  alt="들어갈 이미지"
                  className={classes.contentImg}
                />
              ))}
          </div>
          <div className={classes.submitImgBox}>
            <IconButton color="primary" component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={readImage}
                ref={imgRef}
                multiple
              />
              <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
          <div>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth
              type="submit"
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
