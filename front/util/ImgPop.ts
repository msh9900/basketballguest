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
export default ImgPop