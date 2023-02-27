import { useState, useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import React from 'react';
import cls from './Wyziwyg.module.scss'

interface Props{
  content:string
  setContent:React.Dispatch<React.SetStateAction<string>>
}

const Wyziwyg = (props:Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const ReactQuill = typeof window === "object" ? require("react-quill") : () => false;
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
        ],
      },
    }),
    []
  );

  return (
    <>
      {isMounted && (
        <ReactQuill
          className={cls.WyziwygLayout}
          value={props.content}
          onChange={props.setContent}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      )}
    </>
  );
};

export default Wyziwyg;
