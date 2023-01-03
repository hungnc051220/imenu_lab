import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  calculateTotalItems,
  calculateTotalMoney,
} from "../features/cart/cartSlice";
import { formatMoney } from "../utils/commonFunctions";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const totalItems = useSelector(calculateTotalItems);
  const totalMoney = useSelector(calculateTotalMoney);
  const storeData = useSelector((state) => state.store.storeData);

  return (
    <div
      className="fixed bottom-6 left-4 flex h-[86px] w-[calc(100vw_-_32px)] items-center justify-between gap-2 rounded-2xl bg-white px-4"
      style={{ boxShadow: "0px 1px 26px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-orange text-lg text-white">
            {totalItems}
          </div>
          <div>
            <h4 className="text-button1">{formatMoney(totalMoney)}<span className="text-sm">₫</span></h4>
            <p className="text-content4 text-dark-gray">
              {t("youHaveSelected")}
              <span className="font-bold text-black">{totalItems}</span>
              {t("dish")}
            </p>
          </div>
        </div>
      </div>
      <button
        className="min-w-[120px] rounded-lg bg-primary px-4 py-2 text-center font-semibold text-white shadow-lg"
        onClick={() =>
          navigate({
            pathname: "/checkout",
            search: `?branch_id=${storeData?.id}`,
          })
        }
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Footer;
