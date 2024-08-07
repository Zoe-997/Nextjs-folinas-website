import { useRouter } from "next/navigation";
import Social from "../Commons/Social";

const CopyRight = () => {
  const date = new Date();
  const year = date.getFullYear();
  const router = useRouter();
  return (
    <div className="border-t-[.5px] mt-3 py-10 mx-auto md:px-0 px-4 text-center">
      <p className="text-center">
        © Copyright {year} Folinas LLC. All Rights Reserved.
      </p>
      <div className="mt-5">
        <Social />
      </div>
    </div>
  );
};

export default CopyRight;
