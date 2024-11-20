import { FC, PropsWithChildren } from "react";
import { FaAlignJustify } from "react-icons/fa6";

export interface IMainLayout {
  title: string;
  onOpenMenu: () => void;
}

const MainLayout: FC<PropsWithChildren<IMainLayout>> = ({
  children,
  title,
  onOpenMenu,
}) => {
  return (
    <main className="md:ml-[320px]">
      <nav className="bg-white flex space-x-2 p-2 mb-2">
        <button onClick={onOpenMenu}>
          <FaAlignJustify size={20} />
        </button>
        <h3 className="font-bold text-xl">{title}</h3>
      </nav>
      {children}
    </main>
  );
};

export default MainLayout;
