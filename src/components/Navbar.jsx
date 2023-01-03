import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const storeData = useSelector((state) => state.store.storeData);

  return (
    <div
      className="flex p-4 items-center justify-between border-b border-fade-gray gap-4 bg-white bg-opacity-75 backdrop-blur backdrop-filter sticky top-0 z-10"
    >
      <div
        onClick={() =>
          navigate({
            pathname: "/",
            search: `?branch_id=${storeData?.id}`,
          })
        }
      >
        <h1 className="text-heading4">{storeData?.companyName}</h1>
        <div className="flex items-start mt-1">
          <HiOutlineLocationMarker
            color="gray"
            size={16}
            className="min-w-[16px] mt-[2px]"
          />
          <p className="text-content4 text-gray-700 ml-1">
            {storeData?.address}
          </p>
        </div>
      </div>
      <Sidebar storeData={storeData} />
    </div>
  );
};

export default Navbar;
