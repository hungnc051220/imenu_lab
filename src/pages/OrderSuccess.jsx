import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderDetail } from "../api";
import { Loading } from "../components";
import { icons } from "../constants";
import { formatMoney } from "../utils/commonFunctions";
import Button from "@mui/material/Button";
import {
  setStatusOrder,
  setStatusPayment,
  setOrderId,
  setOrderCode,
  clearOrder,
} from "../features/cart/cartSlice";
import { useSearchParams } from "react-router-dom";

const OrderSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const branchId = params.get("branch_id");
  const storeData = useSelector((state) => state.store.storeData);
  const { orderId } = useSelector((state) => state.cart);

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const response = await getOrderDetail(orderId);
        setOrder(response.data.data);
        const status = response.data.data.status;
        if (status === "COMPLETED") {
          dispatch(clearOrder());
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate(
          {
            pathname: "/",
            search: `?branch_id=${branchId}`,
          },
          { replace: true }
        );
      }
    };

    fetchOrderDetail();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen items-start justify-center">
      {/* <NavigationBar title="payment"/> */}

      <div className="w-full p-4">
        <div className="rounded-[10px] border border-fade-gray bg-gray-100">
          <div className="flex flex-col items-center py-8">
            <img src={icons.success} alt="success" className="h-20 w-20" />
            <h3 className="mt-5 text-heading3">{t("paymentSuccess")}</h3>
            <span className="mt-3 px-[10%] text-center text-content2">
              {t("paymentSuccessDesc")}
            </span>
          </div>

          <div className="space-y-3 border-y border-fade-gray py-5 px-4">
            <div className="flex justify-between">
              <p className="text-content4 text-dark-gray">{t("orderDate")}:</p>
              <p className="text-content4">
                {dayjs(order?.logs?.[0].actionDatetime).format(
                  "HH:mm DD/MM/YYYY"
                )}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-content4 text-dark-gray">{t("paymentType")}</p>
              <p className="text-content4">
                {t(order?.paymentType?.toLowerCase())}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-content4 text-dark-gray">
                {t("numberOfDishes")}:
              </p>
              <p className="text-content4">
                {order?.foods?.reduce(
                  (total, item) => (total += item.quantity),
                  0
                )}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-content4 text-dark-gray">
                {t("promotion")} (%):
              </p>
              <p className="text-content4">{t("none")}</p>
            </div>
          </div>

          <div className="mb-5 px-4 pt-4">
            <div className="pb-4">
              <div className="flex items-center justify-between">
                <p className="text-content4 text-dark-gray">
                  {t("unitPrice")}:
                </p>
                <h2 className="text-button1">
                  {formatMoney(order?.totalNetPrice)}
                  <span className="text-sm">₫</span>
                </h2>
              </div>
              {/* <div className="mt-3 flex items-center justify-between">
                <p className="text-content4 text-dark-gray">{t("vat10")}:</p>
                <h2 className="text-button1">
                  {formatMoney((order?.totalNetPrice * 1) / 10)}
                </h2>
              </div> */}
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-second py-3">
              <p className="text-content4 text-dark-gray">
                {t("totalInvoice")}:
              </p>
              <h2 className="text-heading2">
                {formatMoney(order?.totalPrice)}
                <span className="text-sm">₫</span>
              </h2>
            </div>
          </div>

          <div className="border-t border-fade-gray pt-5 pb-3 text-center">
            <p className="mb-2 text-supplement">{t("orderCode")}</p>
            <span className="rounded-3xl bg-primary py-1 px-4 text-content3 text-white">
              {order?.code}
            </span>
            <p className="mt-8 text-supplement text-second">{t("thankYou")}</p>
          </div>
        </div>
        <Button
          variant="contained"
          className="mt-4"
          fullWidth
          size="large"
          onClick={() => {
            navigate(
              {
                pathname: "/",
                search: `?branch_id=${storeData?.id}`,
              },
              { replace: true }
            );
          }}
        >
          {t("backToHome")}
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
