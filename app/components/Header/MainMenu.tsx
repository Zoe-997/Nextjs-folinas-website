"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";

const MainMenu = ({ className }: { className: string }) => {
  const [menuData, setMenuData] = useState<any>([]);
  const { getMenu, loading } = useCollectionTypesStores();

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
            <li key={index} className="inline-block align-middle">
              <Link
                href={`/${
                  item.attributes.Link === "home" ? "" : item.attributes.Link
                }`}
                className="px-4 py-3 transition uppercase cursor-pointer hover:text-[rgb(var(--second-rgb))]"
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

export default MainMenu;
