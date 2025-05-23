import { ReactNode, MouseEvent } from "react";

export const Link = ({ to, children }: { to: string, children: ReactNode }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    // Dispatch popstate event to notify the router to get updated window.location.pathname
    // as history pushState does not trigger popstate event
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return <a href={to} onClick={handleClick}>{children}</a>;
}