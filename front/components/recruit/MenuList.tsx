import React, { useState } from "react";
import { useRouter } from "next/router";
import classes from "./MenuList.module.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import UpdateModal from "./UpdateModal";

export default function BasicMenu(props: any) {
  const router = useRouter();
  const [updateContent, setUpdateContent] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const updateHandler = async () => {
    setUpdateContent(true);
    //props.idx 해당되는 값 수정 post
    setAnchorEl(null);
  };
  const deleteHandler = async () => {
    router.reload();
    //props.idx 해당되는 값 삭제 post
    const data = {
      contentIdx: props.idx,
    };
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/board/article`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    setAnchorEl(null);
  };
  const handleClose = () => {
    setUpdateContent(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <Modal
        open={updateContent}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modal}>
          <UpdateModal data={props.data} />
        </div>
      </Modal>
      <Button id="basic-button" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon style={{ color: "black" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={updateHandler}>수정</MenuItem>
        <MenuItem onClick={deleteHandler}>삭제</MenuItem>
      </Menu>
    </div>
  );
}
