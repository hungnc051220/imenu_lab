import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineQrcode } from "react-icons/ai";
import { BsCash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { callStaff, createQrCode, getDeepLink, getOrderDetail } from "../api";
import { Loading, NavigationBar } from "../components";
import { icons, images } from "../constants";
import { classNames, formatMoney } from "../utils/commonFunctions";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import { clearOrder } from "../features/cart/cartSlice";

const formatTime = (time) => {
  console.log(time);
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  return minutes + ":" + seconds;
};

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const branchId = params.get("branch_id");

  const storeData = useSelector((state) => state.store.storeData);
  const table = useSelector((state) => state.table);
  const { orderId, statusPayment } = useSelector((state) => state.cart);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("QR-CODE");
  const [qrCode, setQrCode] = useState(null);
  const [loadingCallStaff, setLoadingCallStaff] = useState(false);
  const [countDown, setCountDown] = useState(15);
  const [hrefQr, setHrefQr] = useState("");
  const [deepLink, setDeepLink] = useState("");
  const timeId = useRef();

  useEffect(() => {
    timeId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timeId.current);
  }, []);

  useEffect(() => {
    if (countDown <= 0) clearInterval(timeId.current);
  }, [countDown]);

  const downloadFile = async () => {
    if (!(hrefQr instanceof Blob)) return;

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(hrefQr);
    link.download = "qr.png";
    link.click();
  };

  const downloadImage = () => {
    console.log(hrefQr);
    //fileDownload(res.data, "qr-code.png");
    // saveAs(hrefQr, 'qr-code.jpg') // Put your image url here.
  };

  const fetchQR = async (orderCode, retries) => {
    try {
      const response = await createQrCode({
        branchId,
        orderCode,
        notice: `Thanh toan`,
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (retries > 0) {
        return fetchQR(orderCode, retries - 1);
      }
      console.log(error);
    }
  };

  const fetchDeeplink = async (orderCode) => {
    try {
      const response = await getDeepLink(orderCode);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const response = await getOrderDetail(orderId);
        const orderData = response.data.data;
        if (orderData.status === "WAITING") {
          navigate(
            {
              pathname: "/",
              search: `?branch_id=${branchId}`,
            },
            { replace: true }
          );
        }
        if (orderData.status === "COMPLETED") {
          dispatch(clearOrder());
          navigate(
            {
              pathname: "/",
              search: `?branch_id=${branchId}`,
            },
            { replace: true }
          );
        }
        setOrder(orderData);

        const response2 = await fetchQR(response.data.data.code, 2);
        var reader = new window.FileReader();
        reader.readAsDataURL(response2.data);
        reader.onload = function () {
          var imageDataUrl = reader.result;
          setQrCode(imageDataUrl);
        };
        setHrefQr(response2.data);

        const response3 = await fetchDeeplink(response.data.data.code);
        setDeepLink(response3?.data?.oneLink);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, []);

  useEffect(() => {
    if (statusPayment) {
      navigate(
        {
          pathname: "/order-success",
          search: `?branch_id=${storeData?.id}`,
        },
        { replace: true }
      );
    }
  }, [statusPayment]);

  const onCallStaff = async () => {
    try {
      setLoadingCallStaff(true);
      await callStaff({
        branchId: storeData?.id,
        floorId: table.floorId,
        tableId: table.tableId,
        content: t("paymentRequest"),
        orderId,
      });
      toast.success(t("submitRequestSuccessfully"));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCallStaff(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!loading && order) {
    return (
      <div className="bg-white">
        <NavigationBar title="checkout" />
        {/* {formatTime(countDown)} */}
        <div className="mt-4 text-center">
          <div className="mb-6 flex items-center justify-center">
            <div
              className={classNames(
                paymentType === "QR-CODE"
                  ? "bg-primary text-white"
                  : "text-primary",
                "flex items-center  rounded-lg border  border-gray-200 py-2 px-4 text-content2"
              )}
              onClick={() => setPaymentType("QR-CODE")}
            >
              <AiOutlineQrcode />
              <p className="ml-1">{t("qrCode")}</p>
            </div>
            <div
              className={classNames(
                paymentType === "CASH"
                  ? "bg-primary text-white"
                  : "text-primary",
                "ml-3 flex  items-center rounded-lg  border border-gray-200 py-2 px-4 text-content2"
              )}
              onClick={() => setPaymentType("CASH")}
            >
              <BsCash />
              <p className="ml-1">{t("cash")}</p>
            </div>
          </div>
          {qrCode && (
            <>
              <img
                src={paymentType === "CASH" ? images.cash : qrCode}
                alt="cash"
                className="mx-auto h-[230px] w-auto"
              />
              {paymentType === "QR-CODE" && (
                <a
                  className="mb-2 block text-blue-500 underline"
                  onClick={downloadFile}
                >
                  {t("downloadQR")}
                </a>
              )}
            </>
          )}

          {paymentType !== "CASH" && (
            <a
              variant="contained"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-800 py-2 px-3 text-sm text-content2 text-white"
              href={deepLink}
            >
              <img src={icons.logo} alt="logo" className="mr-1 h-4 w-4" />
              {t("openAppMB")}
              <img src={icons.send} alt="send" className="ml-1 h-2 w-2" />
            </a>
          )}

          <h2 className="mt-8 text-heading2">
            {paymentType === "CASH" ? t("paymentInCash") : t("paymentByQr")}
          </h2>
          {paymentType === "CASH" ? (
            <p className="mt-2 px-[10%] text-content1">
              {t("paymentCashDesc")}
            </p>
          ) : (
            <p className="mt-2 px-[10%] text-content1">{t("paymentQrDesc")}</p>
          )}
        </div>

        <div className="mt-8 mb-4 px-4">
          <div className="mb-5 rounded-lg border border-fade-gray bg-[#F3F3F3] px-4 pt-4">
            <div className="pb-4">
              <div className="flex items-center justify-between">
                <p className="text-content4">{t("unitPrice")}:</p>
                <h2 className="text-button1">
                  {formatMoney(order.totalNetPrice)}
                  <span className="text-sm">₫</span>
                </h2>
              </div>
              {/* <div className="mt-3 flex items-center justify-between">
                <p className="text-content4">{t("vat10")}:</p>
                <h2 className="text-button1">
                  {formatMoney(order?.totalNetPrice * order?.vat / 100)}
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
          {paymentType === "CASH" && (
            <LoadingButton
              variant="contained"
              size="large"
              className="mb-3"
              fullWidth
              loading={loadingCallStaff}
              onClick={onCallStaff}
            >
              {t("callStaff")}
            </LoadingButton>
          )}
          <LoadingButton
            variant="outlined"
            size="large"
            className="border border-orange-500 text-orange-500"
            fullWidth
            onClick={() =>
              navigate(
                {
                  pathname: "/order-status",
                  search: `?branch_id=${storeData?.id}`,
                },
                { replace: true }
              )
            }
          >
            {t("viewOrderStatus")}
          </LoadingButton>
        </div>
      </div>
    );
  }
};

export default Payment;
