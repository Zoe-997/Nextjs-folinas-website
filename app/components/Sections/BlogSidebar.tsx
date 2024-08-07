"use client";
import { useEffect, useState } from "react";
import { TbLayoutSidebar } from "react-icons/tb";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";

import Search from "@/app/components/Commons/Search";
import Driver from "@/app/components/Commons/Driver";
import Collections from "@/app/components/Commons/Collections";
import BlogRecentPost from "@/app/components/Sections/BlogRecentPost";
import BlogTags from "@/app/components/Sections/BlogTags";
import Button from "@/app/components/Commons/Button";

const BlogSideBar = ({ handleBlogs }: { handleBlogs: (data: any) => void }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [blogTag, setBlogTag] = useState<any>([]);
  const [searchKey, setSearchKey] = useState<any>("");
  const [blogList, setBlogList] = useState<any>([]);
  const [blogPreview, setBlogPreview] = useState<any>([]);
  const [tagSelected, setTagSelected] = useState<number>();
  const [blogCollection, setBlogCollection] = useState<any>([]);
  const [collectionSelected, setCollectionSelected] = useState<number>();
  const { getBlogsItems, getBlogsTags, getBlogsCollections } =
    useCollectionTypesStores();

  const getCountBlogByCollection = (data: any) => {
    const countByCollectionId: any = {};
    data?.forEach((item: any) => {
      const collectionId = item?.attributes?.Collection?.data?.id;
      countByCollectionId[collectionId] =
        (countByCollectionId[collectionId] || 0) + 1;
    });

    const countArray = Object.keys(countByCollectionId).map((id) => ({
      id: parseInt(id),
      count: countByCollectionId[id],
    }));

    const blogCollectionPreview = blogCollection?.map((item: any) => {
      const count =
        countArray.find((countItem) => countItem.id === item.id)?.count || 0;
      return {
        ...item,
        count: count,
      };
    });

    return blogCollectionPreview;
  };

  const handleGetBlogListByCollection = (collectionId: number) => {
    setCollectionSelected(collectionId);
    setOpenSidebar(false);
  };

  const handleGetBlogListByTag = (tagId: number) => {
    setTagSelected(tagId);
    setOpenSidebar(false);
  };

  const handleSearch = (key: string) => {
    setSearchKey(key);
    setOpenSidebar(false);
  };

  useEffect(() => {
    const onSuccessItems = (res: any) => {
      if (res) {
        setBlogList(res);
        setBlogPreview(res);
      }
    };

    const onSuccessTags = (res: any) => {
      if (res) setBlogTag(res);
    };

    const onSuccessCollections = (res: any) => {
      if (res) setBlogCollection(res);
    };
    getBlogsItems(`?populate=*&locale=en`, onSuccessItems);
    getBlogsTags(`?populate=*&locale=en`, onSuccessTags);
    getBlogsCollections(`?populate=*&locale=en`, onSuccessCollections);
  }, [getBlogsItems, getBlogsTags, getBlogsCollections]);

  useEffect(() => {
    const searchKeyLower = searchKey.toLowerCase();
    const blogListByKey = blogList.filter((item: any) =>
      item.attributes.Title.toLowerCase().includes(searchKeyLower)
    );
    setBlogPreview(blogListByKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  useEffect(() => {
    const blogListByCollection = blogList.filter(
      (item: any) => item.attributes.Collection.data?.id === collectionSelected
    );
    setBlogPreview(blogListByCollection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionSelected]);

  useEffect(() => {
    const blogListByTag = blogList.filter((item: any) =>
      item.attributes.Tags.data?.some((tag: any) => tag.id === tagSelected)
    );
    setBlogPreview(blogListByTag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagSelected]);

  useEffect(() => {
    handleBlogs(blogPreview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogPreview]);

  return (
    <div className="relative">
      <div>
        <div className="flex flex-wrap items-center">
          <div className="flex-1 md:flex-[0 0 100%]">
            <Search searchKey={handleSearch} />
          </div>
          <div className="w-[3.5rem] h-full ml-2 lg:hidden">
            <Button
              icon={TbLayoutSidebar}
              onClick={() => setOpenSidebar(!openSidebar)}
              outline
              className="py-1"
            />
          </div>
        </div>
        <Driver style="dashed" />
      </div>

      <div className="hidden md:block">
        <Collections
          data={getCountBlogByCollection(blogList)}
          heading="Blog Categories"
          collectionSelect={handleGetBlogListByCollection}
        />
        <Driver style="dashed" />
        <BlogRecentPost data={blogList} />
        <Driver style="dashed" />
        <BlogTags data={blogTag} tagSelect={handleGetBlogListByTag} />
      </div>
      <div
        className={`block md:hidden ${
          openSidebar
            ? "opacity-1 visible top-[100%]"
            : "opacity-0 invisible top-[calc(100%+10px)]"
        } absolute right-0 left-0 transition-all duration-500 bg-white p-10 z-[1]`}
        style={{ boxShadow: "var(--box-shadow)" }}
      >
        <Collections
          data={getCountBlogByCollection(blogList)}
          heading="Blog Categories"
          collectionSelect={handleGetBlogListByCollection}
        />
        <Driver style="dashed" />
        <BlogRecentPost data={blogList} />
        <Driver style="dashed" />
        <BlogTags data={blogTag} tagSelect={handleGetBlogListByTag} />
      </div>
    </div>
  );
};

export default BlogSideBar;
