import React, { Children } from "react";
import _ from "lodash"

const InfinityScroll = props => {

  const {children, callNext, is_next, loading} = props;

  const _handleScroll = _.throttle(()=> {
      
    if(loading){ // loading 중일땐 다시 중복으로 callNext함수를 실행시키지 않기 위해 조건을 걸어주는거.
        return; 
      }

      
      const {innerHeight} = window;
      const {scrollHeight} = document.body;
      
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      // "document.documentElement && document.documentElement.scrollTop" 도큐먼트 밑에 도큐먼트가 있는지 확인하는 조건 있으면 scrollTop을 가지고 오라는 뜻.
      // "|| document.body.scrollTop" 앞의 조건에서 값을 가지고 올수 없다면 도큐먼트의 scrollTop을 가지고 오라는 뜻이다.
      
      // console.log(scrollHeight - innerHeight - scrollTop) // 값 체크
      if(scrollHeight - innerHeight - scrollTop < 200) { // 스크롤할 수 있는 영역이 얼마나 남았나 계산을 해서 "200"보다 작아지면 안의 함수를 실행시키는 조건이다.
        callNext() // 다음꺼 실행하도록 설정.
      }
    }, 300);

    const handleScroll =React.useCallback(_handleScroll, [loading]); // "_handleScroll"의 저장되 있는 정보가 리랜더링시에 초기화 되지 않게 하기 위해서 "useCallback"을 사용하는것이다.

  React.useEffect(() => {
    
    if(loading){ // loading 중일땐 다시 중복으로 callNext함수를 실행시키지 않기 위해 조건을 걸어주는거.
      return;
    }

    if(is_next){ // 다음 item이 있으면 scroll 이벤트가 실행이 된것이거 
      window.addEventListener("scroll", handleScroll);
    } else { // 그게 아니면 remove 되어 이벤트를 없애줄것이다.
      window.removeEventListener("scroll", handleScroll);
    }

      return () => window.removeEventListener("scroll", handleScroll); // 실행된 함수를 정리해주는거 (클린업)
  },[is_next, loading]); // "is_next"가 없으면 1번만 일어나나?? 일단 강의 대로라면 스크롤할때마다 이벤트가 실행이되어 불필요한 이벤트가 계속 발생할것이라고 한다.
                         // 그것을 막기 위해서 is_next를 넣어주어, in_next가 변경될때나, 페이지가 리랜더링시에 안에 있는 함수들이 실행된다.

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {}, // 다음 item을 불러오는 함수가 있으면 실행할수 있도록 지정
  in_next: false, // 다음 item이 있는지 없는지 유무를 파악하기 위해 
  loading: false, // 로딩중인지 아닌지 파악하기 위해, 이게 없으면 함수가 중복 실행 될수있으니 그걸 방지 하기위해 만들어주는거다.
}

export default InfinityScroll;