import SidebarHeading from "./SidebarHeading";

interface CollectionProps {
    heading?: string;
    className?: string;
    data: any;
    collectionSelect: any;
}

const Collections = ({ heading, className, data, collectionSelect }: CollectionProps) => {    
    return (
        <div className={`${className?className+' ':''}`}>
            {heading && <SidebarHeading title={heading} />}
            <ul>
                {data.length > 0 && data?.map((item: any) => (
                    <li key={item.id} onClick={() => collectionSelect(item.id)}
                        className="mb-2 capitalize cursor-pointer hover:text-[rgb(var(--second-rgb))]"
                    >
                        {item?.attributes?.Title} ({item?.count})
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default Collections;