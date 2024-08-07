"use client";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";

import { useBlogsStore } from "@/app/apis/stores/blogsStores";
import { initialResponsive } from "@/app/libs/carousel";

import Container from "../Commons/Container";
import BlogCarouselItem from "./BlogCarouselItem";
import BackgroundEllipse from "./BackgroundEllipse";

interface BlogCarouselProps {}

const BlogCarousel = ({}: BlogCarouselProps) => {
  const ref = useRef<any>(null);
  const [blogsList, setBlogsList] = useState<any>([]);
  const [activeSlide, setActiveSlide] = useState<any>();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { getBlogs, loading } = useBlogsStore();
  const bgItems = [
    {
      width: 6.99,
      width_desktop: 9,
      top: 0,
      right: 2,
      bg: "linear-gradient(44.11deg, rgba(245, 198, 39, 0.6) 8.94%, rgba(255, 255, 255, 0) 86.73%)",
    },
  ];

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setBlogsList(res);
    };
    getBlogs(`?populate=*&locale=en`, onSuccess);
  }, [getBlogs]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <Container>
        {blogsList.length > 0 && (
          <Carousel
            showDots={false}
            className={`blog-carousel -mx-3${
              isIntersecting ? " animate__fadeInUp" : ""
            }`}
            responsive={initialResponsive}
            arrows
            beforeChange={(nextSlide, currentSlide) => {
              let currentItem = nextSlide - 1;
              if (nextSlide - 1 > blogsList.length || nextSlide - 1 < 1)
                currentItem = 1;
              setActiveSlide(currentItem);
            }}
          >
            {blogsList?.map((blog: any, index: number) => (
              <div
                key={index}
                data-index={index + 1}
                data-active={activeSlide}
                className="px-3"
              >
                <BlogCarouselItem
                  blogItem={blog}
                  isActive={activeSlide === index + 1}
                />
              </div>
            ))}
          </Carousel>
        )}
        <BackgroundEllipse activeBlock={isIntersecting} data={bgItems} />
      </Container>
    </div>
  );
};

export default BlogCarousel;
