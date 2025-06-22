import { ReactNode, useState, useRef, useEffect } from "react";
import "./Menu.css";

type Props = {
  text: string;
  icon: React.ReactElement<"i">;
  children?: ReactNode | ((closeMenu: () => void) => ReactNode);
};
export default function Menu({ text, icon, children }: Props) {
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleOpen = () => setIsChildrenOpen((v) => !v);
  const closeMenu = () => setIsChildrenOpen(false);

  useEffect(() => {
    if (!isChildrenOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChildrenOpen]);

  return (
    <div className="menu-wrapper" ref={containerRef}>
      <div className="interactive" onClick={toggleOpen}>
        {icon}
        <p className="text">{text}</p>
      </div>
      {isChildrenOpen && (
        <div className="opt-wrapper" tabIndex={-1}>
          {typeof children === "function" ? children(closeMenu) : children}
        </div>
      )}
    </div>
  );
}
