import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  calculateTotalItemsWithId, decreaseCart,
  removeFromCart
} from "../features/cart/cartSlice";

const ButtonsChangeQuantity = ({ food }) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) =>
    calculateTotalItemsWithId(state, food.id)
  );

  const handleDecrease = (food) => {
    if (quantity > 1) dispatch(decreaseCart(food));
    else dispatch(removeFromCart(food.id));
  };

  return (
    <div className="flex gap-2 justify-center items-center h-full">
      {quantity > 0 && (
        <>
          <button
            className="rounded-full border h-6 w-6 flex items-center justify-center bg-gray-300"
            onClick={() => handleDecrease(food)}
          >
            <AiOutlineMinus className="text-white" size={14} />
          </button>
          <span className="w-5 text-center text-button1">{quantity}</span>
        </>
      )}
      <button
        className="rounded-full bg-primary h-6 w-6 flex items-center justify-center"
        onClick={() => dispatch(addToCart(food))}
      >
        <AiOutlinePlus className="text-white" size={14} />
      </button>
    </div>
  );
};

export default ButtonsChangeQuantity;
