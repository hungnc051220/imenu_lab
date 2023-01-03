import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineHome, AiOutlineInfoCircle
} from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import removeAccents from "vn-remove-accents";
import Categories from "./Categories";
import MenuItems from "./MenuItems";
import Sidebar from "./Sidebar";

const Header = ({ currentCategory, setCurrentCategory }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const storeData = useSelector((state) => state.store.storeData);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const searchData = () => {
    let filterData = storeData.menus
      .map((product) => {
        const foods = product.foods.filter((food) =>
          removeAccents(food.name.toLowerCase()).includes(
            removeAccents(search.toLowerCase())
          )
        );
        if (foods.length) {
          return { ...product, foods };
        }
        return null;
      })
      .filter((p) => p);

    return filterData;
  };

  return (
    <div className="bg-white bg-opacity-75 sticky top-0 w-full z-10 border-b border-fade-gray backdrop-blur backdrop-filter">
      <div className="flex items-center px-4 gap-2 pt-4 pb-2">
        <div
          className="h-8 w-8 rounded-lg shadow-sm border border-fade-gray flex items-center justify-center"
          onClick={() =>
            navigate({
              pathname: "/",
              search: `?branch_id=${storeData?.id}`,
            })
          }
        >
          <AiOutlineHome />
        </div>
        {/* Search input */}
        <div
          className="flex flex-row flex-1 gap-1 border border-fade-gray bg-white p-2 py-1.5 items-center rounded-lg shadow-sm"
          onClick={() => setOpen(true)}
        >
          <CiSearch color="gray" size={16} />
          <input
            type="text"
            placeholder={t("searchInMenu")}
            disabled
            value={search}
            className="w-full text-content4 outline-none border-none bg-transparent placeholder-second"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <Sidebar storeData={storeData} />
        </div>
      </div>

      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-row flex-1 gap-2 py-3 px-2 items-cente sticky top-0 z-10 bg-white shadow">
          <CiSearch color="gray" size={20} />
          <input
            type="text"
            placeholder={t("searchInMenu")}
            value={search}
            className="text-content3 w-full outline-none border-none bg-transparent placeholder-second"
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
          />
          <p
            className="text-sm text-gray-500"
            onClick={() => {
              setSearch("");
              setOpen(false);
            }}
          >
            {t("cancel")}
          </p>
        </div>
        {search.length > 0 && (
          <div className="bg-white min-h-[calc(100vh_-_44px)] overflow-y-auto">
            {searchData().length > 0 ? (
              <MenuItems
                menuItems={searchData()}
              />
            ) : (
              <div className="flex flex-col items-center justify-center mt-10">
                <AiOutlineInfoCircle size={24} color="#C2C2C2" />
                <p className="text-center px-20 text-second">
                  {t("searchNotFound")}
                </p>
              </div>
            )}
          </div>
        )}
      </Drawer>
      {/* Categories */}
      <Categories currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
    </div>
  );
};

export default Header;
