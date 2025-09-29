//SPA 링크 만들기
//<a href="/...">를 그대로 쓰면 브라우저가 서버로 새 문서를 요청해서 전체 새로고침됨
//서버 대신 프론트가 라우팅해야 하므로 막아야 한다.
import type { MouseEvent } from 'react';
import { getCurrentPath, navigateTo } from './utils';
import type { LinkProps } from './types';

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); //서버로 가는 기본 동작 막기
    if (getCurrentPath() === to) return;
    navigateTo(to); // URL만 바꿈
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};
