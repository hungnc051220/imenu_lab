import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "../constants";
import Drawer from "@mui/material/Drawer";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";
import { classNames, formatPhoneNumber } from "../utils/commonFunctions";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

const Sidebar = ({ storeData }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const currentLanguage = cookies.get("i18next") || "vi";
  const [language, setLanguage] = useState(currentLanguage);

  useEffect(() => {
    i18next.changeLanguage(language);
    setOpen(false);
  }, [language]);

  return (
    <>
      <div
        className="flex h-7 min-w-[28px] items-center justify-center rounded-full bg-primary"
        onClick={() => setOpen(true)}
      >
        <RiMenu3Fill color="white" />
      </div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="flex h-full w-[250px] flex-col items-end bg-[#252525] px-5 pt-12 text-white">
          <div
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-black"
            onClick={() => setOpen(false)}
          >
            <AiOutlineClose color="black" />
          </div>

          {/* Store info */}
          <div className="mt-5 w-full border-b border-dark-gray pb-3">
            <p className="text-right text-heading4 font-bold">
              {storeData?.companyName}
            </p>
            <div className="flex items-start justify-end">
              <p className="mr-1 text-right text-xs text-content4 text-second">
                {storeData?.address}
              </p>
              <HiOutlineLocationMarker
                color="gray"
                size={16}
                className="mt-[2px] min-w-[16px]"
              />
            </div>
          </div>

          {/* Features */}
          <ul className="py-3 text-right">
            <li className="border-b border-gray-200">
              <a
                className="block py-4 text-heading3"
                onClick={() =>
                  navigate({
                    pathname: "/menu",
                    search: `?branch_id=${storeData?.id}`,
                  })
                }
              >
                {t("viewMenu")}
              </a>
            </li>
            <li className="border-b border-gray-200">
              <a
                className="block py-4 text-heading3"
                onClick={() =>
                  navigate({
                    pathname: "/checkout",
                    search: `?branch_id=${storeData?.id}`,
                  })
                }
              >
                {t("payment")}
              </a>
            </li>
            <li className="border-b border-gray-200">
              <a className="block py-4 text-heading3">{t("callStaff")}</a>
            </li>
            <li className="border-b border-gray-200">
              <a className="block py-4 text-heading3">{t("evaluate")}</a>
            </li>
          </ul>

          {/* Languague */}
          <div className="flex justify-end gap-4 pt-2 pb-4">
            <p
              className={classNames(
                language === "vi"
                  ? "border-b-2 border-gray-200 text-button1"
                  : "text-content1 text-gray-500",
                "pb-1"
              )}
              onClick={() => setLanguage("vi")}
            >
              Tiếng Việt
            </p>
            <p
              className={classNames(
                language === "en"
                  ? "border-b-2 border-gray-200 text-button1"
                  : "text-content1 text-gray-500",
                "pb-1"
              )}
              onClick={() => setLanguage("en")}
            >
              English
            </p>
          </div>

          {/* Support */}
          <div className="w-full border-t border-dark-gray py-3">
            <div className="flex items-center justify-end">
              <p className="mr-2 text-content3">{storeData?.email}</p>
              <IoMailOutline color="white" size={14} />
            </div>

            <div className="mt-1 flex items-center justify-end">
              <p className="mr-2 text-content3">{formatPhoneNumber(storeData?.phoneNumber)}</p>
              <FiPhone color="white" size={14} />
            </div>
          </div>

          {/* Powered by */}
          <div className="flex flex-1 items-end justify-end pb-6">
            <div className="flex items-center">
              <p className="text-content-3 mr-2 text-second">{t("poweredBy")}</p>
              <img src={icons.logoTextLight} alt="logo" />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
