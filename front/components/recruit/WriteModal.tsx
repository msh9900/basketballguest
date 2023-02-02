import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./WriteModal.module.scss";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
export default function WriteModal() {
  const router = useRouter();
  const userId = useSelector((state: any) => state.login?.userId);
  const userImg = useSelector((state: any) => state.login?.userImg);
  const [imgFile, setImgFile] = useState("");
  const [contentText, setContentText] = useState("");
  const [titleText, setTitleText] = useState("");
  const imgRef: any = useRef();
  const titleRef: any = useRef();
  const readImage = () => {
    const file = imgRef.current.files[0];
    const reader: any = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
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
    router.reload();
    const FD = new FormData();

    FD.append("userId", userId);
    FD.append("title", titleText);
    FD.append("userImg", userImg);
    FD.append("content", contentText);
    for (let i = 0; i < imgRef.current.files.length; i++) {
      console.log(imgRef.current.files[i]);
      FD.append("articleImg", imgRef.current.files[i]);
    }

    FD.get("articleImg");
    //글쓰기 fetch 구현
    const response = await fetch("http://localhost:4000/board/article", {
      method: "POST",
      body: FD,
    });
  };
  return (
    <>
      <form
        onSubmit={contentSubmitHandler}
        className={classes.container}
        encType="multipart/form-data"
      >
        <div className={classes.title}>게시물만들기</div>
        <div className={classes.content}>
          <div className={classes.userBox}>
            <Avatar alt="Remy Sharp" src={userImg} />
            <div>{userId}</div>
          </div>
          <div>
            <div>제목</div>
            <input type="test" onChange={titleChange}></input>
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
            {imgFile && (
              <img
                src={imgFile}
                alt="들어갈 이미지"
                className={classes.contentImg}
              />
            )}
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
