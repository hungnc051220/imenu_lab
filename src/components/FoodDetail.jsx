import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, saveToCart, selectMenuItemWithId } from "../features/cart/cartSlice";
import { formatMoney } from "../utils/commonFunctions";
import ButtonsChangeQuantity from "./ButtonsChangeQuantity";

const FoodDetail = ({ selectedFood, open, handleClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [note, setNote] = useState("");

  const orderItem = useSelector((state) =>
    selectMenuItemWithId(state, selectedFood?.id)
  );

  const onSaveToCartHandler = () => {
    let data = null;
    if(!orderItem){
      data = {...selectedFood}
    }
    else {
      data = {...orderItem};
    }
    data.note = note;
    
    dispatch(saveToCart(data));
    handleClose();
  };

  return (
    <Drawer
      anchor="bottom"
      PaperProps={{
        elevation: 0,
        style: { backgroundColor: "transparent" },
      }}
      open={open}
      onClose={handleClose}
    >
      <div className="rounded-t-[30px] bg-white px-4 pt-2 pb-4">
        <div className="mx-auto mb-1 h-1 w-[130px] rounded-full bg-gray-300"></div>
        <div className="text-right">
          <button className="text-button3 text-dark-gray" onClick={handleClose}>
            {t("close")}
          </button>
        </div>
        <div className="mt-5">
          <img
            src={selectedFood?.image}
            alt="food"
            className="object-center object-cover h-[199px] w-full rounded-lg shadow-md"
          />
          <h4 className="mt-4 text-heading4">{selectedFood?.name}</h4>
          <div className="flex justify-between mt-2">
            <h2 className="text-heading2">
              {formatMoney(selectedFood?.price)}
              <span className="text-sm">₫</span>
            </h2>
            {selectedFood && (
              <ButtonsChangeQuantity
                food={selectedFood}
              />
            )}
          </div>
          <div className="mt-6 relative">
            <p className="text-button1 mb-2">{t("note")}</p>
            <textarea
              defaultValue={orderItem?.note}
              rows={4}
              name="comment"
              id="comment"
              placeholder={t("note")}
              className="py-2 px-3 block w-full rounded-md focus:outline-none border border-gray-200 shadow-sm sm:text-sm text-content2 bg-[#F8F8F8]"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            className="bg-primary text-white font-semibold shadow-lg px-4 py-3 rounded-lg gap-2 text-center w-full mt-5"
            onClick={onSaveToCartHandler}
          >
            {t("confirm")}
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default FoodDetail;
