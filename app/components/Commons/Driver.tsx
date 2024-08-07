interface DriverProps {
    style?: string;
    spaceY?: string;
}

const Driver = ({ style, spaceY }: DriverProps) => {
    return (
        <div className="border-b-[1px]" 
            style={{ 
                borderStyle: style ? style : "solid", 
                marginTop: spaceY ? spaceY: "24px", 
                marginBottom: spaceY ? spaceY : "24px"
            }}
        ></div>
    );
}
 
export default Driver;