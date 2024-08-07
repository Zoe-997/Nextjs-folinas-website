"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";

const MenuMobile = ({
  className,
  openMenu,
}: {
  className?: string;
  openMenu: any;
}) => {
  const [menuData, setMenuData] = useState<any>([]);
  const { getMenu } = useCollectionTypesStores();
  const handleClick = () => {
    openMenu(false);
  };

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setMenuData(res);
    };

    getMenu(`?populate=*&locale=en`, onSuccess);
  }, [getMenu]);

  return (
    <nav id="nav-main" className={`inline-block align-middle ${className}`}>
      {menuData.length > 0 && (
        <ul>
          {menuData?.map((item: any, index: number) => (
            <li key={index} className="block align-middle py-2">
              <Link
                href={`/${
                  item.attributes.Link === "home" ? "" : item.attributes.Link
                }`}
                className="transition uppercase cursor-pointer hover:text-[rgb(var(--second-rgb))]"
                onClick={handleClick}
              >
                {item.attributes.Title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default MenuMobile;
