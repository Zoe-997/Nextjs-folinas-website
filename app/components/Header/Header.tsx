"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Container from "@/app/components/Commons/Container";
import ButtonModal from "@/app/components/Commons/ButtonModal";
import Drawer from "@/app/components/Commons/Drawer";
import MainMenu from "./MainMenu";
import HeaderTools from "./HeaderTools";
import Logo from "./Logo";
import MenuMobile from "./MenuMobile";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const pathnameIgnore = ["", "en", "vi"];
  const [height, setHeight] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const pathnameSplit = pathname.split("/");
  const breadcrumbs = pathnameSplit.filter(
    (item) => !pathnameIgnore.includes(item)
  );
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenuCanvas = (status: boolean) => {
    setOpenMenu(status);
  };

  useEffect(() => {
    function updateHeight() {
      if (elementRef.current) {
        const { height } = elementRef.current.getBoundingClientRect();
        setHeight(height);
      }
    }

    function handleScroll() {
      setScrollPosition(window.scrollY);
      updateHeight();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html")[0];
    if (openMenu) htmlElement.classList.add("openDrawer");
    else htmlElement.classList.remove("openDrawer");
  }, [openMenu]);

  return (
    <header
      ref={elementRef}
      className={`py-2 md:py-4 transition-all top-0 right-0 left-0 z-10 ${
        scrollPosition > 100
          ? "fixed animate__fadeInDown bg-white"
          : "absolute bg-[linear-gradient(to_top,_rgba(0,0,0,0),_rgba(0,0,0,0.4)_70%,_rgba(0,0,0,0.8))] text-white"
      }`}
      style={{
        minHeight: scrollPosition > 100 ? `${Math.round(height)}px` : "initial",
        boxShadow: "var(--box-shadow)",
        animationDuration: "0.5s",
      }}
    >
      <Container>
        <div className="flex flex-wrap items-center gap-2 w-full">
          <ButtonModal
            className="inline-block xl:hidden"
            onClick={() => handleToggleMenuCanvas(true)}
            isOpenModal={openMenu}
            isScroll={scrollPosition > 100}
          />
          <Logo pathName={breadcrumbs} isHeader />
          <MainMenu className="flex-1 text-center hidden xl:block" />
          <HeaderTools />
          <Drawer
            heading="Menu"
            isOpen={openMenu}
            closeModal={() => handleToggleMenuCanvas(false)}
            content={<MenuMobile openMenu={setOpenMenu} />}
            position="left"
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
