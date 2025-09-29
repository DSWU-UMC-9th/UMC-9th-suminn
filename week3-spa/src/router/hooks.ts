//현재 경로를 상태로 가지고 있게 하기 hook
//React는 state가 바뀔 때만 다시 그린다. 
//따라서 경로를 state로 관리해야 화면이 전환된다.
import { useEffect, useState } from 'react';
import { getCurrentPath, PUSHSTATE_EVENT } from './utils';

export const useCurrentPath = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const handleChange = () => setPath(getCurrentPath());
    window.addEventListener('popstate', handleChange);
    window.addEventListener(PUSHSTATE_EVENT, handleChange); //navigateTo('/___')하면 이 훅이 신호를 받아 path가 바뀌고 라우터다 리렌더링 된다
    return () => {
      window.removeEventListener('popstate', handleChange);
      window.removeEventListener(PUSHSTATE_EVENT, handleChange);
    };
  }, []);

  return path;
};
