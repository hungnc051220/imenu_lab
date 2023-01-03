import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../components";
import Button from "@mui/material/Button";
import { images } from "../constants";
import Modal from "@mui/material/Modal";
import { cancelOrder } from "../api";
import toast from "react-hot-toast";
import { clearOrder } from "../features/cart/cartSlice";

const WaitingOrder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storeData } = useSelector((state) => state.store);
  const { orderId, orderCode, statusOrder } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (statusOrder) {
      const orderData = {
        orderId,
        orderCode,
        orderStatus: true,
        paymentStatus: false,
      }
      localStorage.setItem("orderData", JSON.stringify(orderData));
      navigate(
        {
          pathname: "/payment",
          search: `?branch_id=${storeData?.id}`,
        },
        { replace: true }
      );
    }
  }, [statusOrder]);

  const onCancelOrder = async () => {
    try {
      await cancelOrder({
        orderId,
        reason: "KH tự huỷ đơn",
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

  return (
    <div className="flex h-screen flex-col">
      <NavigationBar title="waitingOrder" hasBack={false} />
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <img
          src={images.waitingOrder}
          alt="image"
          className="mx-auto h-[230px] w-auto"
        />

        <div className="mt-8 flex items-center justify-center">
          <svg
            aria-hidden="true"
            className="mr-3 h-4 w-4 animate-spin fill-dark-orange text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <h2 className="text-heading2">{t("requestConfirmation")}</h2>
        </div>

        <p className="mt-4 px-12 text-center">{t("waitingOrderDesc")}</p>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          className="mt-6 h-[55px] border-red-500 text-red-500"
          onClick={handleOpen}
        >
          {t("cancelRequest")}
        </Button>

        <Button
          variant="contained"
          size="large"
          fullWidth
          className="mt-3 h-[55px]"
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
      </div>

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

export default WaitingOrder;
