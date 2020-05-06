import React from "react";
import { getContentType, getModalData, hideModal, isShowModal, showModal } from "../../reducers/ModalReducer";
import { connect } from 'react-redux'; 

function ModalComponent({isShow, contentType, modalData, hideModal}) {
  if (isShow) {
    switch (contentType) {
      case "IMAGE":
        // TODO
        break;
      default:
        throw new Error("Unsupport show modal");
    }
  } else {
    return <></>;
  }
}

const mapStateToProps = (state, props) => {
  return {
    isShow: isShowModal(state),
    data: getModalData(state),
    contentType: getContentType(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (contentType, data) => dispatch(showModal(contentType, data)),
  hideModal: () => dispatch(hideModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
