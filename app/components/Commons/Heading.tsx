'use client';
import { fontBase, fontBaseVi } from '@/app/libs/fonts'

interface HeadingProps {
    headingTag: string;
    heading: string;
    className?: string;
    local?: string;
}

const Heading = ({headingTag, heading, className, local}: HeadingProps) => {
    const HeadingTag = headingTag as keyof JSX.IntrinsicElements;
    return (
        <HeadingTag className={`mb-5 md:mb-10 ${local === 'vi' ? fontBaseVi.className : fontBase.className}${className?' '+className:''}`}>
            {heading}
        </HeadingTag>
    )
}
 
export default Heading;