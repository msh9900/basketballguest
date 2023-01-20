
# json server 사용방법

json server의 기본적인 사용 방법은 db.json 파일을 바로 서버로 만드는 것인데,
그러면 파일 구분이 어렵기 떄문에 BPT 프로젝트에서는 다음과 같이 실행하겠습니다.

## 1. 데이터 준비

데이터를 넣고 db.js에서 불러올 json 파일을 명시합니다.

1-1. 데이터 넣기 : jsonServer/data 폴더에 json 파일 넣기.
import 할 때 이름이 붙기 때문에 이제부턴 json 파일 내부에서 제목을 명명할 필요 없이 바로 객체 배열을 넣어주면 됩니다.

1-2. db.js 에서 사용할 json 파일 import.
db.js 의 다른 자료처럼 라우팅 해주면 됨

## 2. 실행

루트 디렉토리나 해당 디렉토리에서 실행하는 방법이 있습니다.

2-1. 루트 디렉토리에서 run dev 하거나
2-2. jsonServer 디렉토리에서 node server.js 하기

<!-- 참고한 자료 : JSON 서버 여러 개 만들기 -->
<!-- https://stackoverflow.com/questions/36836424/cant-watch-multiple-files-with-json-server -->

<!-- 참고한 자료 : 값을 생성 위한 템플릿 -->
<!-- https://json-generator.com/ -->