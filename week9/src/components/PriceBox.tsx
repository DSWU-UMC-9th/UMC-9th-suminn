import { useCartInfo } from "../hooks/useCartStore";
import { useModalActios, useModalInfo } from "../hooks/useModalStore";

import Modal from "./Modal";

const PriceBox = () => {
  const { total } = useCartInfo();
  const isOpen = useModalInfo();
  const { openModal } = useModalActios();

  const handleInitializeCart = () => {
    openModal();
  };

  return (
    <div className="p-12 flex justify-between items-center">
      <button
        onClick={handleInitializeCart}
        className="border p-3 rounded-md cursor-pointer bg-gray-800 text-white "
      >
        장바구니 초기화
      </button>

      <div>총 가격: {total}원</div>

      {isOpen && <Modal />}
    </div>
  );
};

export default PriceBox;