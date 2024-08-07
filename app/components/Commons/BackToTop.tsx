"use client";
import { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

const BackToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      title="Back to top"
      className={`fixed right-[20px] p-2 rounded-md bg-[rgb(var(--btn-bg))] text-[rgb(var(--btn-text))] hover:bg-[rgb(var(--btn-bg-hv))] hover:text-[rgb(var(--btn-text-hv))] transition-all duration-500 ${
        scrollPosition > 100 ? "bottom-[20px]" : "opacity-0 -bottom-[100px]"
      }`}
      onClick={handleScrollTop}
    >
      <FaLongArrowAltUp size={20} />
    </button>
  );
};

export default BackToTop;
