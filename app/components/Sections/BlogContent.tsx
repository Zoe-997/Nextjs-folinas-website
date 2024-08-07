"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/Commons/Sidebar";
import BlogSideBar from "@/app/components/Sections/BlogSidebar";
import BlogMainContent from "@/app/components/Sections/BlogMainContent";

const BlogContent = () => {
  const [blogsList, setBlogsList] = useState<any>([]);

  const handleBlogsList = (data: any) => {
    setBlogsList(data);
  };

  return (
    <div className="flex flex-wrap md:py-10">
      <Sidebar>
        <BlogSideBar handleBlogs={handleBlogsList} />
      </Sidebar>
      <BlogMainContent data={blogsList} />
    </div>
  );
};

export default BlogContent;
