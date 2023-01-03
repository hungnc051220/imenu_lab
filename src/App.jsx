import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import i18next from "i18next";
import cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { fetchStore } from "./features/store/storeSlice";
import { useScrollToTop } from "./utils/commonFunctions";
import { getOrderDetail } from "./api";
import {
  clearOrder,
  setMessage,
  setOrderCode,
  setOrderId,
  setStatusOrder,
  setStatusPayment,
  setUpdate,
} from "./features/cart/cartSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

let stompClient = null;

const App = () => {
  const currentLanguage = cookies.get("i18next") || "vi";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const { orderId, orderCode, statusOrder, statusPayment } = useSelector(
    (state) => state.cart
  );
  const storeData = useSelector((state) => state.store.storeData);

  const branchId = params.get("branch_id");

  useScrollToTop();

  useEffect(() => {
    dispatch(fetchStore({ branchId }));
  }, []);

  useEffect(() => {
    if (!orderCode) return;
    const socket = new SockJS(`${import.meta.env.VITE_BASE_URL}/ws`);
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      () => {
        console.log("subcribe...");
        stompClient.subscribe(`/device/${orderCode}`, (payload) => {
          var message = JSON.parse(payload.body);
          if (message.title === "order") {
            if (message.status === "false") {
              toast.error(t("orderDenied"));
              dispatch(clearOrder());
            } else {
              dispatch(setStatusOrder(true));
              dispatch(setMessage("orderConfirmMessage"));
            }
          }
          if (message.title === "payment") {
            if (statusPayment) return;
            if (message.status === "false") {
              dispatch(setStatusPayment(false));
            } else {
              dispatch(setStatusPayment(true));
              dispatch(setMessage(""));
              navigate({
                pathname: "/order-success",
                search: `?branch_id=${storeData?.id}`,
              });
            }
          }
          if (message.title === "food") {
            if (message.status === "false") {
              dispatch(setUpdate(false));
            } else {
              dispatch(setUpdate(true));
            }
          }
        });
      },
      (error) => {
        console.log("failed", error);
      }
    );
  }, [orderCode]);

  useEffect(() => {
    i18next.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    if (!orderId) return;
    const checkOrder = async () => {
      try {
        const response = await getOrderDetail(orderId);
        const orderDetail = response.data.data;
        dispatch(setOrderCode(orderDetail.code));
        if (orderDetail.status === "WAITING") {
          dispatch(setStatusOrder(false));
          dispatch(setMessage("orderWaitingMessage"));
        } else if (orderDetail.status === "CREATED") {
          dispatch(setStatusOrder(true));
          dispatch(setMessage("orderConfirmMessage"));
        } else if (orderDetail.status === "COMPLETED") {
          dispatch(clearOrder());
        } else {
          dispatch(clearOrder());
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkOrder();
  }, [orderId]);

  return (
    <div>
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
