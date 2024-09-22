# :bulb: 가을축제핑

## :tada: 프로젝트 소개

### :one: 프로젝트 주제 및 선정 배경
지도 API를 활용하여 선택 할 수 있는 다양한 주제중에서 무더운 이번 여름에 야외 활동을 하지 못하는 시기를 벗어나 가을이 다가오는 만큼 가을 축제라는 주제를 가지고 프로젝트를 진행하고자 하여 선정하게 되었습니다.

### :two: 프로젝트 내용
카카오 지도 API와 전국 문화 축제 표준 데이터의 API 및 유튜브 API를 활용하여 지도에서 축제들의 위치와 정보를 찾아 볼수 있으며 관련된 영상에도 접근 할 수 있도록 기획하였습니다.

### :three: 활용 방안 및 기대 효과
- 메인 페이지를 통하여 자신의 위치에 기반하여 가까운 축제나 다른 지역의 축제들도 찾아 볼 수 있습니다.
- 상세 페이지를 통하여 각 축제들의 이름, 축제 내용, 기간과 장소 등의 자세한 정보를 알 수 있고 유튜브 API를 통하여 축제와 관련된 영상도 찾아 볼 수 있습니다.
- 로그인/ 회원가입을 통하여 북마크가 표시된 축제들만을 마이 페이지에서 확인 할 수 있습니다.
- 자신의 위치 기반을 통하여 축제를 쉽게 찾아볼 수 있거나 다른 지역의 축제도 쉽게 찾을 수 있고 각 축제에 대한 상세한 정보와 관련된 영상을 이용하여 제공된 축제의 접근성을 쉽게 하였습니다.


## :family: 프로젝트 팀 구성 및 역할

| 이름   | 역할 | 담당업무                              |
| ------ | ---- | ------------------------------------- |
| 김민규 | 팀장 | 로그인&회원가입(JWT), 마이페이지, 전체 스타일 및 반응형 처리  |
| 선채훈 | 팀원 | 디테일 페이지 (youtube api 활용)                      |
| 이재호 | 팀원 | 디테일 페이지 (축제 api, 지도 api 활용)    |
| 강수진 | 팀원 | 메인 페이지(지도 api, 축제 api 활용해서 불러오기), 길찾기 기능, 북마크 기능 |
| 정윤오 | 튜터 | SA 피드백, 주제선정 피드백, 프로젝트 기술 질의 응답         |
| 김준영 | 튜터 | SA 피드백, 주제선정 피드백, 프로젝트 기술 질의 응답         |

## :date: 프로젝트 수행 절차 및 방법

- 2024.08.29 ~ 2024.09.03

| 구분                     | 기간                        | 활동                                                      | 비고                                            |
| ------------------------ | --------------------------- | --------------------------------------------------------- | ----------------------------------------------- |
| 기획 완료 및 협업준비         | 9/12(목)~9/13(금)            | 기획 준비 및 SA문서 작성, 프로젝트 세팅 시작 및<br/> 완료 구성 |                                                 |
| 집중 기능 개발            | 9/14(토)~9/15(일)               | 카카오 지도 메인, 디테일 페이지 노출 및<br/> 로그인/회원가입 페이지 생성                         |                            |
| 집중 기능 개발            | 9/16(월)~9/18(수)               | API(카카오 지도, 축제 데이터, 유튜브) 활용하여 각 페이지<br/> api기능 구현 완료 및 마이 페이지 구현(저장한 목록만 노출)                           |  |
| 집중 디자인 개발 | 9/18(수)~9/19(목) | 스타일 적용 및 디테일 작업                                |                                  |
| 도전기능 구현 및 트러블 슈팅           | 9/20(금)~9/22(일)               | 반응형 웹 디자인과 북마커 기능 추가 및 트러블 슈팅 분석                   |                                                 |
| 총 개발 기간             | 9/12(목)~9/22(일) 총 11일 |                                                           |

## :hammer_and_wrench: STACK

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Zustand](https://img.shields.io/badge/zustand-black?style=for-the-badge&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)  ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

## :fountain_pen: Code Convention

- prettier 사용
- `상태 관리`: context API
- `라우팅 관리`: react-router-dom
- `변수, 함수명`: camelCase
  - 명시적으로 사용: addPostHandler
- `컴포넌트`
  - 컴포넌트 명: PascalCase
  - 컴포넌트가 아닐 경우: camelCase 적용
  - export default '함수명' 사용
- `Styled-component`
  - 네이밍은 앞에 St가 붙는다. (StHeader)
  - 명시적으로 사용: StPostList

## :paintbrush: Github Rules

Branch, Commit, Commit 규칙

### :pushpin: Branch

- `main`: 배포용 브랜치
- `develop`: 릴리즈 통합 브랜치
- `feature/브랜치명`: 기능 개발 브랜치

### :pushpin: Commit

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `update`: 오타, 간단 수정 ⇒ 누락 등(로직 변화 없음)
- `refactor`: 코드 리팩토링

### :pushpin: 규칙

- 커밋 규칙
  - 최상단에 작업 타입, 현재 작업하는 페이지 작성
  - 하단엔 어떤 기능을 추가했는지 명시적으로 작성

```bash
feat: 로그인 페이지 기능 구현
- Input 함수 추가
- 회원가입과 로그인 로직 구현
- 로그인, 회원가입 폼 컴포넌트 구현
```

## :card_index_dividers: 주요 기능 소개

| 요구사항              | 선택                     | 이유                                                                                               |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| 상태 관리 라이브러리 | zustand, tanstack-query                 | 불필요한 전역 state를 로컬 state로 관리하고, <br/>가벼운 전역 state 관리를 위해 zustand 채택 |
| DB 활용       | json-server            | 로그인/회원가입 기능의 인증/인가 로직이 필요하고, <br/>Restful한 개발을 훈련해 볼 수 있으며,<br/> 실무에서는 거의 REST API를 사용하기 때문에 채택             |
| API                | 카카오,축제,유튜브                    | 키워드에 따른 검색 결과를 데이터로 받기 위해 youtube data api를 사용하고<br/> 그 데이터를 영상으로 띄우기 위해 iframe player api 사용, 카카오 지도의 경우 축제 주제가 국내 한정인 이유와 함께<br/> 다양한 api 기능을 보여주고 접근성이 좋기 때문에 채택하였고 축제 데이터의 경우에는 최신 상태의 다양한 축제 데이터가 존재하기 때문에 채택   |
| 코드블럭              | react-syntax-highlighter | npm.js 사이트에서 demo코드도 확인이 가능하고 설명이 잘 되어있었음                                  |
| RRD(react-router-dom)                | useNavigate, useLocation, useParams, useSearchParms         | 효율적으로 페이지를 전환하고 URL에 맞는 컴포넌트를 보여주기 위해 매우 유용하기 때문에 채택    |

### :one: 메인 페이지

![mainpage](https://github.com/user-attachments/assets/b69e279b-268c-429c-ba43-0633fbd3be8c)


- 사용자의 현재 위치 측정
- 축제 전체 리스트 노출
  - 각 게시물의 축제 정보 노출
  - 버튼
    - 카카오 지도: 새 창으로 카카오 맵 길찾기 서비스 이용 
    - 상세보기: 축제 상세페이지로 이동
    - 저장하기: 북마크에 저장 (마이페이지에서 확인 가능) 

### :two: 로그인,회원가입

![auth](https://github.com/user-attachments/assets/de79eb2c-1ae6-4522-b531-df2c10733340)

- 회원가입
  - 사용자의 아이디, 비밀번호, 닉네임을 입력 후 등록된 아이디인지 판별하여 회원가입 처리
- 로그인
  - 사용자의 아이디, 비밀번호 판별 후 로그인 처리

### :three: 상세 페이지

![detail](https://github.com/user-attachments/assets/528f9e60-5b55-49ad-b2e9-1fa4a5446b86)

- 선택한 축제 YOUTUBE 상위 검색 영상 노출
- 선택한 축제 KAKAO MAP 마커 등록
- 선택한 축제 상세 데이터 노출

### :four: 마이 페이지

![mypage](https://github.com/user-attachments/assets/271c0e55-9708-4d53-83d1-9b9c809ab39f)

- 북마크에 저장한 축제 리스트를 확인할 수 있습니다.
  - 상세페이로 이동이 가능합니다.
  - 북마크 취소가 가능합니다.

## 소감
- 김민규
  - 프로젝트 초기 기획단계에서 필수기능구현과 도전기능을 결정하는 부분에서 안전하게 프로젝트를 진행하기 위해 도전 기능을 추가하는 것에 소극적인 부분이 아쉬운 부분도 있었지만, 프로젝트를 진행하며 모두 적극적으로 임하였고 최종적으로 필수,도전 기능 구현에 있어 완성도있게 잘 마무리되어 좋았습니다. 
- 선채훈
  - 처음 프로젝트 기획하고 파트 분배할 때 어떻게 나눠야할지에 대해 어려움이 있었지만 역할 분배 이후에 팀적으로 어려웠던 부분은 크게 없었던거같고 추석 연휴에도 팀원분들이 휴식없이 프로젝트를 진행해주셔서 기간안에 잘 끝낼 수 있었던거같습니다
- 강수진
  - 처음부터 필수 기능을 목적으로 가볍게 기획을 하여서 심적 부담이 크게 줄어서 좋았고, 기획을 하는 데에 다들 의견이 많아 회의가 늘어지는 부분이 좀 아쉬웠지만 기획 단계가 지나고서부터는 다들 원활하게 소통하며 팀 과제를 진행하여서 만족스러웠습니다. API를 다룰 수 있게 되어 매우 뿌듯합니다.
- 이재호
  - 처음으로 다양한 API를 활용하여 프로젝트를 진행하려고 했다보니 업무 분배에 있어서 원활하지 못했던 것이 아쉬웠고 팀원들께서 맡은 업무를 다 잘 수행해주셔서 시간이 지날 수록 수월하게 프로젝트를 진행하였던 것 같습니다. 

