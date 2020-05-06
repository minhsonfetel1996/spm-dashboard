import React from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getToastMessage,
  getToastTitle,
  hideToast,
  isShow,
  getToastContentType,
} from "../../reducers/GlobalToastReducer";
import "./toast.styles.css";

import STATUS from "../../reducers/constants/ToastStatus";

const getIcon = (contentType) => {
  switch (contentType) {
    case STATUS.SUCCESS:
      return (
        <span className="text-success">
          <i className="fa fas fa-check-circle" />
        </span>
      );
    case STATUS.ERROR:
      return (
        <span className="text-danger">
          <i className="fa fas fa-check-circle" />
        </span>
      );
    case STATUS.INFORMATION:
      return (
        <span>
          <i className="fa fas fa-info" />
        </span>
      );
    default:
      return null;
  }
};

function ToastComponent(props) {
  const { isShow, title, message, contentType } = props;
  return (
    <Toast
      className="global-toast top-right"
      show={!!isShow}
      onClose={() => props.hideToast()}
      delay={3000}
      autohide
    >
      <Toast.Header>
        {getIcon(contentType)}
        <strong className="pl-1 mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

const mapStateToProps = (state, props) => {
  return {
    isShow: isShow(state),
    title: getToastTitle(state),
    message: getToastMessage(state),
    contentType: getToastContentType(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  hideToast: () => dispatch(hideToast()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastComponent);
