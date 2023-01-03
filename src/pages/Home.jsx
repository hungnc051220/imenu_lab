import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  AiFillInfoCircle,
  AiOutlineInfoCircle,
  AiOutlineWifi,
} from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CallStaff,
  Feedback,
  Loading,
  Navbar,
  PromotionCard,
} from "../components";
import { icons, images } from "../constants";
import { MdNotifications } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { setTable } from "../features/table/tableSlice";
import _ from "lodash";
import { classNames } from "../utils/commonFunctions";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { storeData, loading, error } = useSelector((state) => state.store);
  const table = useSelector((state) => state.table);
  const { orderId, statusOrder, message } = useSelector((state) => state.cart);

  const [openCallPayment, setOpenCallPayment] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");
  const [feature, setFeature] = useState(0);
  const [open, setOpen] = useState(false);
  const [openSelectTable, setOpenSelectTable] = useState(false);
  const [successType, setSuccessType] = useState(null);

  const [selectedFloor, setSelectedFloor] = useState({});
  const [selectedTable, setSelectedTable] = useState({});
  const [listTable, setListTable] = useState([]);

  useEffect(() => {
    if (_.isEmpty(table)) {
      setOpenSelectTable(true);
    }
  }, [table]);

  const onSelectedSitting = () => {
    if (_.isEmpty(selectedTable)) {
      toast.error("Vui lòng chọn bàn trước khi sử dụng dịch vụ!", {
        id: "sitting",
      });
      return;
    }
    dispatch(
      setTable({
        floorId: selectedTable.floorId,
        floorName: selectedTable.floorName,
        tableId: selectedTable.id,
        tableName: selectedTable.name,
      })
    );
    setOpenSelectTable(false);
  };

  const handleClose = () => setOpen(false);

  const renderBanner = () => {
    return (
      <div className="relative flex h-[325px] items-center justify-center sm:h-[375px]">
        <img
          src={images.banner}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative w-[90%] text-center">
          <h1 className="text-heading1 text-white">
            {t("welcomeTitle")}
            <br /> {storeData?.companyName}
          </h1>
          <p className="mt-1 px-8 text-content1 text-white sm:px-12">
            {t("welcomeDesc")}
          </p>
          <button
            className="mt-6 rounded-lg bg-white py-[10px] px-8 text-button1 shadow-lg"
            onClick={() =>
              navigate({
                pathname: "/menu",
                search: `?branch_id=${storeData?.id}`,
              })
            }
          >
            {t("viewMenuNow")}
          </button>
        </div>
      </div>
    );
  };

  const renderFloor = () => {
    return (
      <div className="bg-[#252525] py-4">
        <div className="flex items-center justify-center">
          <AiOutlineInfoCircle color="white" size={15} />
          <p className="ml-2 text-content3 text-white">
            {t("youAreSittingAt")}
            <span className="ml-2 rounded-lg border border-white py-1 px-2 text-button3">
              {table?.floorName} - {table?.tableName}
            </span>
          </p>
          <Button
            variant="contained"
            className="bg-orange-500 text-sm font-medium ml-2 rounded-lg"
            size="small"
            onClick={() => {
              if(orderId){
                toast.error(t("errorChangeTable"));
                return;
              }
              setOpenSelectTable(true);
            }}
          >
            Đổi bàn
          </Button>
        </div>
      </div>
    );
  };

  const renderWifi = () => {
    return (
      <div className="bg-[#47CA55] py-4">
        <div className="flex items-center justify-center">
          <AiOutlineWifi color="white" size={15} />
          <p className="ml-2 text-content3 text-white">
            {t("wifi")}
            <span className="rounded-lg text-button3">
              Innoverse/cucwifinao
            </span>
          </p>
        </div>
      </div>
    );
  };

  const renderFeatures = () => {
    return (
      <div className="py-4 px-6">
        <p className="text-center text-content1 text-second">
          {t("youAreWanting")}
        </p>
        <div className="mt-2">
          {/* Go to Menu */}
          <div
            className="flex items-center justify-between border-b border-gray-200 py-4"
            onClick={() =>
              navigate({
                pathname: "/menu",
                search: `?branch_id=${storeData?.id}`,
              })
            }
          >
            <div className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#B1B1B1] bg-gray-200 sm:h-8 sm:w-8">
              <img src={icons.menu} className="h-4 w-4" />
            </div>
            <p className="mb-1 flex-1 text-heading3">{t("viewMenu")}</p>
            <HiChevronRight size={17} />
          </div>

          {/* Call order */}
          <div
            className="flex items-center justify-between border-b border-gray-200 py-4"
            onClick={() => {
              if (!orderId)
                return toast.error(t("paymentWarning"), {
                  id: "checkout",
                });
              if (!statusOrder)
                return toast.error(t("paymentWarning"), {
                  id: "checkout",
                });
              navigate({
                pathname: "/payment",
                search: `?branch_id=${storeData?.id}`,
              });
            }}
          >
            <div className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#B1B1B1] bg-gray-200 sm:h-8 sm:w-8">
              <img src={icons.wallet} />
            </div>
            <p className="mb-1 flex-1 text-heading3">{t("payment")}</p>
            <HiChevronRight size={17} />
          </div>

          {/* Call staff */}
          <div
            className="flex items-center justify-between border-b border-gray-200 py-4"
            onClick={() => {
              setFeature(1);
              setOpenCallPayment(true);
            }}
          >
            <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full border border-[#B1B1B1] bg-gray-200 sm:h-8 sm:w-8">
              <img src={icons.profile} />
            </div>
            <p className="mb-1 flex-1 text-heading3">{t("callStaff")}</p>
            <HiChevronRight size={17} />
          </div>

          {/* Feedback */}
          <div
            className="flex items-center justify-between border-b border-gray-200 py-4"
            onClick={() => {
              setFeature(2);
              setOpenCallPayment(true);
            }}
          >
            <div className="mr-4 flex h-7 w-7 items-center justify-center rounded-full border border-[#B1B1B1] bg-gray-200 sm:h-8 sm:w-8">
              <img src={icons.star} />
            </div>
            <p className="mb-1 flex-1 text-heading3">{t("evaluate")}</p>
            <HiChevronRight size={17} />
          </div>

          {/* Popup features */}
          <Drawer
            anchor="bottom"
            PaperProps={{
              elevation: 0,
              style: { backgroundColor: "transparent" },
            }}
            open={openCallPayment}
            onClose={() => setOpenCallPayment(false)}
          >
            <div className="rounded-t-[30px] bg-white px-4 pt-2 pb-4">
              <div className="mx-auto mb-1 h-1 w-[130px] rounded-full bg-gray-300"></div>
              <div className="text-right">
                <button
                  className="text-button3 text-dark-gray"
                  onClick={() => setOpenCallPayment(false)}
                >
                  {t("cancel")}
                </button>
              </div>
              {renderFeatureContent()}
            </div>
          </Drawer>
        </div>
      </div>
    );
  };

  const renderFeatureContent = () => {
    switch (feature) {
      case 1:
        return (
          <CallStaff
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            setOpenCallPayment={setOpenCallPayment}
            setSuccessType={setSuccessType}
            setOpen={setOpen}
          />
        );
      case 2:
        return (
          <Feedback
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            setOpenCallPayment={setOpenCallPayment}
            setSuccessType={setSuccessType}
            setOpen={setOpen}
          />
        );

      default:
        break;
    }
  };

  const renderBestSeller = () => {
    return (
      <div className="mt-4">
        <div className="flex justify-between px-4">
          <p className="text-heading3">{t("bestSeller")}</p>
          <div className="flex items-center justify-center">
            <p className="text-content2">{t("viewAll")}</p>
            <HiChevronRight size={16} color="gray" className="mt-1" />
          </div>
        </div>

        <div className="categories-container mt-5 flex items-center gap-3 overflow-y-hidden overflow-x-scroll px-4 pb-4">
          <PromotionCard />
          <PromotionCard />
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="mx-auto w-[80%] pt-4 pb-8 text-center">
        <p className="px-12 text-heading3">{t("promotionTitle")}</p>
        <p className="mt-2 px-8 text-content3">{t("promotionDesc")}</p>

        <div className="mt-4 flex px-8">
          <input
            type="text"
            placeholder={t("yourEmail")}
            className="block h-[38px] w-full min-w-0 flex-1 rounded-none rounded-l-[10px] border border-r-0 border-gray-300 px-4 text-supplement placeholder-gray-300 sm:text-sm"
          />
          <button className="inline-flex h-[38px] items-center rounded-r-[10px] border border-l-0 border-black bg-black px-5 text-supplement font-bold text-white">
            {t("send")}
          </button>
        </div>
      </div>
    );
  };

  const renderOrderInfo = () => {
    return (
      <div
        className="fixed bottom-7 right-4 z-10 flex items-center"
        onClick={() =>
          navigate({
            pathname: "/order-status",
            search: `?branch_id=${storeData?.id}`,
          })
        }
      >
        {orderId && (
          <div
            className={classNames(
              !statusOrder ? "bg-dark-orange" : "bg-blue-600",
              "mr-2 ml-6 py-2 flex items-center justify-center px-4 text-content2 rounded-lg text-white"
            )}
          >
            {t(message)}
          </div>
        )}
        <div className="relative">
          {message && (
            <div
              className={classNames(
                !statusOrder ? "bg-dark-orange" : "bg-blue-600",
                "absolute -inset-0.5 bg-dark-orange blur rounded-full opacity-75"
              )}
            ></div>
          )}
          <button
            className={classNames(
              !statusOrder ? "bg-dark-orange" : "bg-blue-600",
              "relative flex h-12 min-w-[48px] items-center justify-center rounded-full shadow-xl"
            )}
          >
            <MdNotifications color="white" size={24} />
          </button>
        </div>
      </div>
    );
  };

  if (error) {
    throw new Response("", {
      error: 404,
      statusText: "Chi nhánh không tồn tại",
    });
  }

  return (
    <>
      <Navbar />
      {renderBanner()}
      {renderFloor()}
      {/* {renderWifi()} */}
      {renderFeatures()}
      {/* {renderBestSeller()} */}
      {renderFooter()}
      {renderOrderInfo()}

      <Modal
        open={openSelectTable}
        onClose={() => setOpenSelectTable(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="bg-white w-[90%] rounded-lg pt-6 pb-4 shadow-sm px-3">
            <p className="text-button1 text-center">
              Hãy chọn bàn bạn muốn ngồi:
            </p>
            <div className="grid grid-cols-1 gap-2 mt-4">
              <FormControl fullWidth size="small">
                <InputLabel>{t("location")}</InputLabel>
                <Select
                  value={selectedTable}
                  label={t("location")}
                  onChange={(e) => setSelectedTable(e.target.value)}
                >
                  {storeData?.tables?.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.floorName} - {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <Button
              className="mt-4"
              fullWidth
              variant="contained"
              onClick={onSelectedSitting}
            >
              {t("confirm")}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex h-full w-full items-center justify-center">
          {successType ? (
            <div className="flex w-5/6 flex-col items-center justify-center rounded-lg bg-white p-6">
              <img
                src={
                  successType === "feedback"
                    ? images.feedbackSuccess
                    : images.requestStaffSuccess
                }
                alt={successType}
              />
              <h4 className="mt-4 text-heading4">
                {successType === "feedback"
                  ? t("successfulEvaluation")
                  : t("submitRequestSuccessfully")}
              </h4>
              <p className="mt-2 text-center text-content3">
                {successType === "feedback"
                  ? t("successfulEvaluationDesc")
                  : t("submitRequestSuccessfullyDesc")}
              </p>
              <Button
                variant="contained"
                className="mt-4"
                fullWidth
                size="large"
                onClick={handleClose}
              >
                {t("completed")}
              </Button>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default Home;
