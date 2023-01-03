import React from "react";
import { classNames, formatMoney } from "../utils/commonFunctions";
import { MdOutlineEventNote } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectMenuItemWithId } from "../features/cart/cartSlice";
import { AiOutlineInfoCircle } from 'react-icons/ai';

const FoodCard = ({ groupName, food, setSelectedFood, rightComponent }) => {
  const { t } = useTranslation();
  const orderItem = useSelector((state) =>
    selectMenuItemWithId(state, food?.id)
  );

  return (
    <div className={`relative bg-white py-3 hover:bg-gray-50 ${food.soldOut && 'pointer-events-none opacity-30'}`}>
      <div className="align-center flex justify-between space-x-3">
        <div className="flex flex-1 gap-4">
          <img
            src={food.image}
            loading="lazy"
            alt="menu"
            className="h-[90px] w-[90px] rounded-md bg-gray-200 object-cover object-center"
            onClick={setSelectedFood ? () => setSelectedFood(food) : undefined}
          />
          <div
            className="flex flex-1 flex-col justify-between"
            onClick={setSelectedFood ? () => setSelectedFood(food) : undefined}
          >
            <div>
              <p className="text-supplement text-second">{groupName}</p>
              <p className="mt-[2px] text-button1">{food.name}</p>
            </div>
            <p className="mt-[2px] text-heading4">
              {formatMoney(food.price)}
              <span className="text-sm">₫</span>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            {rightComponent}
          </div>
        </div>
      </div>
     <div className="mt-3 flex items-center" onClick={setSelectedFood ? () => setSelectedFood(food) : undefined}>
        <MdOutlineEventNote color="#DDDDDD" />
        <p className="ml-1 text-supplement text-second">
          {t("note")}:{" "}
          {orderItem?.note || food?.note && <span className="text-primary underline">{orderItem?.note || food?.note}</span>}
        </p>
      </div>

      {food.status && <div className="mt-1 flex items-center" onClick={setSelectedFood ? () => setSelectedFood(food) : undefined}>
        <AiOutlineInfoCircle color="#DDDDDD" />
        <p className="ml-1 text-supplement text-second">
          {t("status")}:{" "}
         <span className={classNames(food.status === "IN_PROGRESS" ? "text-orange-500": "text-green-500","underline")}>{t(food?.status)}</span>
        </p>
      </div>}
    </div>
  );
};

export default FoodCard;
