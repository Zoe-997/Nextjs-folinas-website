"use client";
import { useEffect, useState } from "react";

interface BackgroundEllipseProps {
    animate?: string;
    activeBlock?: boolean; 
    data: any
}

const BackgroundEllipse = ({ activeBlock, data, animate }: BackgroundEllipseProps ) => {
    const [windowSize, setWindowSize] = useState<any>({
        width: 1920
    });
    
      useEffect(() => {
        const handleResize = () => {
          setWindowSize({
            width: window.innerWidth
          });
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // console.log('windowSize: ', windowSize);
    

    return (
        <div className="block absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
            <div className="block bg-ellipse-wrapper absolute top-0 left-0 w-full h-full overflow-visible z-[-1]">
                {data?.map((item: any, index: number) => (
                    <div key={index} className={`bg-ellipse bg-ellipse-1 absolute rounded-full z-[-1] transition-all duration-300${animate?` ${animate}`:''}`}
                        style={{ 
                            background: item.bg, 
                            top: `${item.top?`${item.top}rem` : 'auto'}`,
                            right: `${item.right?`${item.right}rem` : 'auto'}`,
                            bottom: `${item.bottom?`${item.bottom}rem` : 'auto'}`,
                            left: `${item.left?`${item.left}rem` : 'auto'}`,
                            width: `${windowSize.width > 750 ?  `${item.width_desktop}rem`: `${item.width}rem`} `,
                            height: `${windowSize.width > 750 ?  `${item.width_desktop}rem`: `${item.width}rem`} `,
                            transform: activeBlock ? `translate3d(0px, ${index*10}px, 0px)` : 'translate3d(0px, 0px, 0px)'
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
 
export default BackgroundEllipse;