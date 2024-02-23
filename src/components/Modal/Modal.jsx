import React from "react";
import { BsXCircle } from "react-icons/bs";

import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  const onWrapperClose = (event) => {
    if (event.target.className === css.modalWrapper) {
      onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div className={css.modal}>
          <div className={css.modalWrapper} onClick={onWrapperClose}>
            <div className={css.modalContent}>
              <button className={css.modalCloseBtn} onClick={() => onClose()}>
                <BsXCircle />
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
