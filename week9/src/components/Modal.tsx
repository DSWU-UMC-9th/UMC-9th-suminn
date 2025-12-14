import { useCartActions } from "../hooks/useCartStore";
import { useModalActios } from "../hooks/useModalStore";

const Modal = () => {
  const { clearCart } = useCartActions();
  const { closeModal } = useModalActios();

  const handleClickNo = () => {
    closeModal();
  };

  const handleClickYes = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col items-center justify-center gap-4">
        <p className="font-bold text-xl">삭제하시겠습니까?</p>

        <div className="flex justify-between w-full gap-3">
          <button
            onClick={handleClickNo}
            className="w-1/2 text-center bg-gray-300 cursor-pointer rounded-sm py-2"
          >
            아니오
          </button>
          <button
            onClick={handleClickYes}
            className="w-1/2 text-center bg-gray-800 cursor-pointer text-white rounded-sm"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;