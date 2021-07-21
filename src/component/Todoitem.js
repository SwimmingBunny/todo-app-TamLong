import React from "react";
import ReactDOM from "react-dom";
import { Button, Input } from "antd";
import Animate from "rc-animate";
import "../Todoapp.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faCheck,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fab, faCheckSquare, faCoffee, faCheck, faEraser);

const TodoItem = (props) => {
  const checkIsDone = props.isDone;
  const [editItem, setEditItem] = React.useState(props.initValue);
  return (
    <div className="body__item">
      {!props.isEdit ? (
        <p
          className={checkIsDone ? "body__item-text--done" : "body__item-text"}
        >
          {props.it}
        </p>
      ) : (
        <Input value={editItem} onChange={(e) => setEditItem(e.target.value)} />
      )}

      <div className="body__item-btn">
        {!props.isEdit ? (
          <>
            <Button
              className={
                checkIsDone ? "body__item-icon--done" : "body__item-icon"
              }
              onClick={props.handleIsDone}
              type="primary"
            >
              <FontAwesomeIcon icon="check" />
            </Button>
            <Button
              className="body__item-clear"
              onClick={props.handleClear}
              type="primary"
            >
              <FontAwesomeIcon icon="eraser" />
            </Button>
            <Button onClick={props.onEdit} type="primary">
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button
              type="primary"
              onClick={() => {
                props.onCancel();
                setEditItem(props.initValue);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                props.onSave(editItem);
              }}
            >
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default TodoItem;
