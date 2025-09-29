// pushState는 화면을 자동으로 바꿔주지 않는다. 
//우리가 직접 “경로 바뀜”을 React에 알려줘야 한다.
export const PUSHSTATE_EVENT = 'app:pushstate';

export const getCurrentPath = () => window.location.pathname;

export const navigateTo = (to: string) => {
  if (to === getCurrentPath()) return;       // 같은 경로면 무시
  window.history.pushState({}, '', to);      // URL만 변경(서버 요청 X)
  window.dispatchEvent(new Event(PUSHSTATE_EVENT)); 
};

//콘솔에서 navigateTo('/____') 실행해보면 주소창은 바뀌지만 화면은 그대로이다.
//아직 React에 바뀌었다는걸 못 알려줬기 때문