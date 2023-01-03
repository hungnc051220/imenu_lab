import { useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineCheck } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { formatMoney } from "../utils/commonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { ButtonsChangeQuantity, FoodCard, Loading } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { cancelOrder, getOrderDetail } from "../api";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { toast } from "react-hot-toast";
import { clearOrder } from "../features/cart/cartSlice";

const listStatus = {
  waiting: { label: "waiting", color: "text-orange-500" },
  created: { label: "created", color: "text-blue-500" },
  completed: { label: "completed", color: "text-green-500" },
  cancelled: { label: "cancelled", color: "text-red-500" },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const storeData = useSelector((state) => state.store.storeData);
  const { orderId, statusOrder, statusPayment, hasUpdate } = useSelector(
    (state) => state.cart
  );
  const [params] = useSearchParams();
  const branchId = params.get("branch_id");

  const [order, setOrder] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!orderId) {
      navigate(
        {
          pathname: "/",
          search: `?branch_id=${branchId}`,
        },
        { replace: true }
      );
      return;
    }

    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const response = await getOrderDetail(orderId);
        const orderData = response.data.data;
        if (orderData.status === "COMPLETED") {
          localStorage.removeItem("orderId");
          navigate(
            {
              pathname: "/",
              search: `?branch_id=${branchId}`,
            },
            { replace: true }
          );
        }
        setOrder(orderData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchOrderDetail();
  }, [orderId, hasUpdate]);

  const onCancelOrder = async () => {
    try {
      await cancelOrder({
        orderId,
        reason: t("customerSelfCancellation"),
      });
      toast.success(t("orderCancelled"));
      localStorage.removeItem("orderData");
      dispatch(clearOrder());
      handleClose();
      navigate(
        {
          pathname: "/",
          search: `?branch_id=${storeData?.id}`,
        },
        { replace: true }
      );
    } catch (error) {
      handleClose();
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen px-4 pt-16 pb-4">
      <div className="fixed top-0 left-0 z-10 flex w-full items-center justify-between gap-2 border-b border-gray-200 bg-white p-4 font-bold">
        <div className="w-10"></div>
        <p className="flex-1 text-center text-heading3">{t("orderDetail")}</p>
        {order.status === "WAITING" ? (
          <p
            className="min-w-10 mt-1 text-content3 text-red-700"
            onClick={handleOpen}
          >
            {t("cancelOrder")}
          </p>
        ) : (
          <div className="w-10"></div>
        )}
      </div>

      {/* List Orders */}
      <div className="mb-4 divide-y divide-fade-gray border-b border-gray-200">
        {order?.foods?.map((food, index) => (
          <FoodCard
            food={food}
            key={index}
            rightComponent={
              <p className="text-content3">
                {t("quantity")}: {food.quantity}
              </p>
            }
          />
        ))}
      </div>

      <div className="mb-5 rounded-lg border border-fade-gray bg-[#F3F3F3] px-4 pt-4">
        <div className="space-y-3 pb-4">
          <div className="flex items-center justify-between">
            <p className="text-content4">{t("orderCode")}:</p>
            <h2 className="text-content1">{order?.code}</h2>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-content4">{t("status")}:</p>
            <h2
              className={`text-content3 font-bold ${
                !statusOrder
                  ? t(listStatus["waiting"]?.color)
                  : t(listStatus["created"]?.color)
              }`}
            >
              {!statusOrder
                ? t(listStatus["waiting"]?.label)
                : t(listStatus["created"]?.label)}
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-content4">{t("unitPrice")}:</p>
            <h2 className="text-button1">
              {formatMoney(order?.totalNetPrice)}
              <span className="text-sm">₫</span>
            </h2>
          </div>

          {/* <div className="flex items-center justify-between">
            <p className="text-content4">{t("vat10")}:</p>
            <h2 className="text-button1">
              {formatMoney(order?.totalNetPrice * order?.vat)}
            </h2>
          </div> */}
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-second py-3">
          <p className="text-content4">{t("totalInvoice")}:</p>
          <h2 className="text-heading2">
            {formatMoney(order?.totalPrice)}
            <span className="text-sm">₫</span>
          </h2>
        </div>
      </div>

      {statusOrder && (
        <Button
          variant="outlined"
          fullWidth
          size="large"
          className="mb-2 text-orange-500 border border-orange-500"
          onClick={() =>
            navigate(
              {
                pathname: "/payment",
                search: `?branch_id=${storeData?.id}`,
              },
              { replace: true }
            )
          }
        >
          {t("payment")}
        </Button>
      )}

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={() =>
          navigate(
            {
              pathname: "/",
              search: `?branch_id=${storeData?.id}`,
            },
            { replace: true }
          )
        }
      >
        {t("backToHome")}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex h-full items-center justify-center">
          <div className="w-[90%] rounded-lg bg-white p-6 shadow-lg">
            <p className="text-center text-content1">{t("cancelOrderDesc")}</p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="contained"
                className="bg-gray-300 text-content2 text-primary"
                size="large"
                fullWidth
                onClick={handleClose}
              >
                {t("back")}
              </Button>
              <Button
                variant="contained"
                className="bg-red-500 text-content2"
                size="large"
                fullWidth
                onClick={onCancelOrder}
              >
                {t("iWantCancel")}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderStatus;
