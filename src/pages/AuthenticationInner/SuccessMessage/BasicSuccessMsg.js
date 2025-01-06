import React from "react";
import { Modal, ModalBody } from "reactstrap";

const BasicSuccessMsg = ({ show, onCloseClick }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="px-3 py-2 text-center">
        <div className="avatar-lg mx-auto mt-2">
          <div className="avatar-title bg-light text-success display-3 rounded-circle">
            <i className="ri-checkbox-circle-fill "></i>
          </div>
        </div>
        <div className="mt-1 pt-1">
          <h1>Success!</h1>

          <div className="mt-4">
            <button onClick={onCloseClick} className="btn btn-success w-100">
              Ok
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BasicSuccessMsg;
