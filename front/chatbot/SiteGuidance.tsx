import styled from 'styled-components';
import Link from 'next/link'

const SiteGuidanceStyle = styled.div`
  background-color: beige;
  border:1px solid black;
  padding:10px;
  h3 {margin:0px auto;}
  max-width:350px;
  color:black;

  .Link{
    color:#454545;
    text-decoration: none;
    font-weight:bold;
  }
`

const SiteGuidance = () => {
  return ( 
    <SiteGuidanceStyle>
      <h3>BPT 소개</h3>
      <Link className='Link' href='/introduce'>소개</Link> : BPT를 만든 개발자들 <br/>
      <Link className='Link' href='/guest'>게스트모집</Link> : 경기 참여 | 게스트 모집 게시판 <br/>
      <Link className='Link' href='/gym'>체육관대여</Link> : 체육관 홍보 | 대관 게시판 <br/>
    </SiteGuidanceStyle> 
  );
}
 
export default SiteGuidance;