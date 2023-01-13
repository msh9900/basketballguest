type addr = {
  category: string;
  val: string;
}

const isFormValid = (
  title:string,
  address:addr[],
  openingHours:string,
  openingPeriod:string[],
) => {
  if(title===''){
    alert('제목을 입력해주세요')
    // 포커스 주기
    return false
  }
  if(address[0].val==='' || address[1].val==='' || address[2].val===''){
    alert('주소를 입력해주세요')
    // 포커스 주기
    return false
  }
  if(openingHours===''){
    alert('영업시간을 입력해주세요')
    // 포커스 주기
    return false
  }
  const stt = openingPeriod[0]
  const end = openingPeriod[1]
  const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  // https://curryyou.tistory.com/234

  if(stt==='' || end===''){
    alert('개장기간 값을 입력해주세요')
    return false
  }
  if(!regex.test(stt) || !regex.test(end)){
    alert('개장기간 양식을 확인해주세요')
    return false
  }
  return true
}

export default isFormValid