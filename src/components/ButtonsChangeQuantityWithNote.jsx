import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const ButtonsChangeQuantityWithNote = ({ count, setCount }) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        className="rounded-full border h-6 w-6 flex items-center justify-center bg-gray-300"
        onClick={() => setCount((prev) => prev - 1)}
        disabled={count === 1}
      >
        <AiOutlineMinus className="text-white" size={14}/>
      </button>
      <span className="w-5 text-center">{count}</span>

      <button
        className="rounded-full bg-primary h-6 w-6 flex items-center justify-center"
        onClick={() => setCount((prev) => prev + 1)}
      >
        <AiOutlinePlus className="text-white" size={14}/>
      </button>
    </div>
  );
};

export default ButtonsChangeQuantityWithNote;
