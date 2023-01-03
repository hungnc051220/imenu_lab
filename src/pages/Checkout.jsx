import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api";
import {
  ButtonsChangeQuantity,
  FoodCard,
  FoodDetail,
  NavigationBar,
} from "../components";
import {
  calculateTotalItems,
  calculateTotalMoney,
  clearCart,
  setOrderCode,
  setOrderId,
} from "../features/cart/cartSlice";
import { formatMoney } from "../utils/commonFunctions";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = useSelector(calculateTotalItems);
  const totalMoney = useSelector(calculateTotalMoney);
  const { orderFoods } = useSelector((state) => state.cart);
  const storeData = useSelector((state) => state.store.storeData);
  const table = useSelector((state) => state.table);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    if (selectedFood) handleOpen();
  }, [selectedFood]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFood(null);
  };

  const onOrderHandler = async () => {
    try {
      setLoading(true);
      const response = await createOrder({
        branchId: storeData.id,
        floorId: table.floorId,
        tableId: table.tableId,
        orderFoods: orderFoods.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
          note: item.note,
        })),
        promotion: "no",
        totalCost: totalMoney,
      });
      toast.success(t("waitingOrderDesc"), { duration: 5000});

      setLoading(false);

      const { id: orderId } = response.data.data;
      localStorage.setItem("orderId", orderId);

      dispatch(setOrderId(orderId));
      dispatch(clearCart());

      navigate({
        pathname: "/",
        search: `?branch_id=${storeData?.id}`,
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data?.title);
      console.log(error);
    }
  };

  useEffect(() => {
    if (totalItems === 0) {
      navigate({
        pathname: "/menu",
        search: `?branch_id=${storeData?.id}`,
      });
    }
  }, [totalItems]);

  return (
    <div className="bg-white relative min-h-screen">
      <NavigationBar title="confirm" />

      {/* List Orders */}
      <div className="divide-y divide-fade-gray h-[calc(100vh_-_310px)] overflow-y-auto px-4">
        {orderFoods.map((food, index) => (
          <FoodCard
            food={food}
            key={index}
            setSelectedFood={setSelectedFood}
            rightComponent={<ButtonsChangeQuantity food={food} />}
          />
        ))}
      </div>

      <FoodDetail
        selectedFood={selectedFood}
        open={open}
        onOpen={handleOpen}
        handleClose={handleClose}
      />

      <div className="bg-white px-4 fixed bottom-0 left-0 w-full ring-1 ring-gray-200 py-5">
        <div className="bg-gray-100 mb-4 px-4 pt-4 rounded-lg border border-gray-200">
          <div className="pb-4">
            <div className="flex justify-between items-center">
              <p className="text-content4">{t("unitPrice")}:</p>
              <h2 className="text-button1">
                {formatMoney(totalMoney)}
                <span className="text-sm">₫</span>
              </h2>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-t border-dashed border-light-gray">
            <p className="text-content4">{t("totalProvisionalInvoice")}:</p>
            <h2 className="text-heading2">
              {formatMoney(totalMoney)}
              <span className="text-sm">₫</span>
            </h2>
          </div>
        </div>
        <LoadingButton
          variant="contained"
          size="large"
          fullWidth
          loading={loading}
          onClick={onOrderHandler}
        >
          {t("sendOrderRequest")}
        </LoadingButton>
      </div>
    </div>
  );
};

export default Checkout;
