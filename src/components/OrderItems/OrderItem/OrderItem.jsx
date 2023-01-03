import { AiOutlineCloseCircle } from "react-icons/ai";
import { formatMoney } from "../../../utils/commonFunctions";
import { useDispatch } from 'react-redux';
import { removeFromCart } from "../../../features/cart/cartSlice";

const OrderItem = ({ orderItem }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = () => dispatch(removeFromCart(orderItem));

  return (
    <li
      key={orderItem.id}
      className="relative bg-white py-5 px-4 hover:bg-gray-50"
    >
      <div className="flex justify-between items-center space-x-3">
        <p className="text-gray-500 w-5">{orderItem.quantity}x</p>
        <div className="flex-1">
          <p className="font-semibold text-gray-700">{orderItem.text}</p>
          {orderItem.note && <p className="text-gray-700 text-sm">Ghi chú: {orderItem.note}</p>}
        </div>
        <p className="text-gray-500">
          {formatMoney(orderItem.quantity * orderItem.price)}₫
        </p>
        <div onClick={removeFromCartHandler}>
          <AiOutlineCloseCircle
            color="gray"
            size={20}
          />
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
