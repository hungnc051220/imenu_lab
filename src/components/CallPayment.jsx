import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const accounts = [
  { id: "cash", name: "Tiền mặt" },
  { id: "bankcard", name: "Thẻ ngân hàng" },
];

const CallPayment = ({ paymentType, setPaymentType }) => {
  const storeData = useSelector((state) => state.store.storeData);
  const navigate = useNavigate();
  
  return (
    <div>
      <p className="text-center text-heading3 mt-2">
        Chọn phương thức thanh toán
      </p>

      <div className="mt-2">
        {accounts.map((account, accountIdx) => (
          <div
            key={accountIdx}
            className="relative flex items-start py-4 border-b border-gray-200"
          >
            <div className="min-w-0 flex-1">
              <label
                htmlFor={`account-${account.id}`}
                className={`${
                  paymentType === account.id ? "text-primary" : "text-second"
                } text-heading4`}
              >
                {account.name}
              </label>
            </div>
            <div className="ml-3 flex h-5 items-center justify-center">
              <input
                id={`account-${account.id}`}
                aria-describedby={`account-${account.id}-description`}
                name="account"
                type="radio"
                value={account.id}
                defaultChecked={account.id === paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="h-5 w-5 border-gray-300 accent-black"
              />
            </div>
          </div>
        ))}

        <button
          className="bg-black text-button1 text-white w-full py-3 rounded-lg my-5"
          onClick={() =>
            navigate({
              pathname: "/payment",
              search: `?branch_id=${storeData?.id}&paymentType=${paymentType}`,
            })
          }
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default CallPayment;
