// import InputText from '../inputStyle/Input_Text'
import { findAllByAltText } from '@testing-library/react';
import { forEachChild } from 'typescript';
import cls from '../inputStyle/TextInput.module.scss'
import {useEffect} from 'react'

type addr = {
  category: string;
  val: string;
}
interface Props{
  address:addr[]
  setAddress:React.Dispatch<React.SetStateAction<addr[]>>
}

const GymAddress = (props:Props) => {

  useEffect(() => {
    let scriptSrc = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script") as HTMLScriptElement;
      script.src = scriptSrc;
      script.async = true;
    }
    document.body.appendChild(script);
    // console.log('script', script);
  }, []);

  function DaumPostcode() {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소
        var extraRoadAddr = ''; // 참고 항목

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr +=
            extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        const postcode = document.getElementById('postcode') as HTMLInputElement;
        postcode.value = data.zonecode;

        const roadAddress = document.getElementById('roadAddress') as HTMLInputElement;
        roadAddress.value = roadAddr;

        const jibunAddress = document.getElementById('jibunAddress') as HTMLInputElement;
        jibunAddress.value = data.jibunAddress;

        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        if (roadAddr !== '') {
          const a = document.getElementById('extraAddress') as HTMLInputElement;
          a.value = extraRoadAddr;
        } else {
          const a = document.getElementById('extraAddress') as HTMLInputElement;
          a.value = '';
        }
        const param:string[] = [
          data.zonecode,
          roadAddr,
          data.jibunAddress,
          '',
          extraRoadAddr
        ]
        setAddrValues(param)
        
        var guideTextBox = document.getElementById('guide') as HTMLElement;
        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        if (data.autoRoadAddress) {
          var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
          guideTextBox.style.display = 'block';
        } else if (data.autoJibunAddress) {
          var expJibunAddr = data.autoJibunAddress;
          guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
          guideTextBox.style.display = 'block';
        } else {
          guideTextBox.innerHTML = '';
          guideTextBox.style.display = 'none';
        }
      },
    }).open();
  }

  const setAddrValues = (arr:any) => {
    const iterables : any = [...props.address]
    let detailAddressValue : string = ''
    for(const x of iterables){
      if(x.category === 'detailAddress'){
        detailAddressValue = x.val
        break;
      }
    }
    const tempCheck = [
      {category:'postcode', val:arr[0]},
      {category:'roadAddress', val:arr[1]},
      {category:'jibunAddress', val:arr[2]},
      {category:'detailAddress', val:detailAddressValue},
      {category:'extraAddress', val:arr[4]}
    ]

    props.setAddress(() => {
      return (
        [
          {category:'postcode', val:arr[0]},
          {category:'roadAddress', val:arr[1]},
          {category:'jibunAddress', val:arr[2]},
          {category:'detailAddress', val:detailAddressValue},
          {category:'extraAddress', val:arr[4]}
        ]
      )
    }
    )
  }

  const onChange = (e:any) => {
    const spot = e.target.id
    const inputValue = e.target.value
    const addrObjArr : any = [...props.address]
    addrObjArr.forEach((v:any) => {
      if(v.category === spot) v.val = inputValue
    });
    props.setAddress(addrObjArr)
  }

  return (
    <>
      <h3 className={cls.explanation}>주소</h3>
      <div className={cls.TextInputLayout}>
        <div><p>*</p></div>
        <div>
          <input type="button" onClick={()=>{DaumPostcode()}} value="우편번호 찾기" />
          <br />
          <input type="text" onChange={onChange} id="postcode" placeholder="우편번호" />
          <input type="text" onChange={onChange} id="roadAddress" placeholder="도로명주소" />
          <input type="text" onChange={onChange} id="jibunAddress" placeholder="지번주소" />
          <span
            id="guide"
            style={{color: '#999',display: 'none'}}
          ></span>
          <input type="text" onChange={onChange} id="detailAddress" placeholder="상세주소" />
          <input type="text" onChange={onChange} id="extraAddress" placeholder="참고항목" />
        </div>
      </div>
    </>
  )
}

export default GymAddress