import React from "react";
import { connect } from "react-redux";
import { remove } from "../store";

function ToDo({ text, onBtnClick }) {
  return (
    <li>
      {text}
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onBtnClick: () => dispatch(remove(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(ToDo);
