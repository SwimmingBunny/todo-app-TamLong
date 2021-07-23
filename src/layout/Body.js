import React from "react";
import { DatePicker, Button, message, Input, Pagination } from "antd";
import "antd/dist/antd.css";
// ReactDOM.render(<DatePicker />, mountNode);
import Todoitem from "../component/Todoitem";
import "../Todoapp.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fab, faPlus, faTrash);
const Body = () => {
  const taskList = "tasklisk";
  const [date, setDate] = React.useState(null);
  const [value, setValue] = React.useState("");
  const [listItem, setListItem] = React.useState([]);
  const [getName, setGetName] = React.useState("");
  const [confirmName, setConfirmName] = React.useState("");
  const [editingItem, setEditingItem] = React.useState(-1);
  const [hanleDone, setHandleDone] = React.useState("");
  const STATUS = { DONE: "done", ALL: "all", UNDONE: "undone" };

  const [currentPage, setCurrentPage] = React.useState(1);
  const PAGE_SIZE = 8;

  const handleChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setDate(value);
  };

  React.useEffect(() => {
    const list = localStorage.getItem(taskList);
    if (list) {
      setListItem(JSON.parse(list));
    }
  }, []);
  const showData = () =>
    listItem
      .filter((vl) => {
        switch (hanleDone) {
          case STATUS.DONE:
            return vl.isDone;

          case STATUS.UNDONE:
            return !vl.isDone;
          default:
            return true;
        }
      })
      .splice((currentPage - 1) * PAGE_SIZE)
      .splice(0, PAGE_SIZE)
      .map((item, index) => {
        return (
          <Todoitem
            it={item.item}
            key={index}
            isDone={item.isDone}
            handleIsDone={() => handleCheckItem(index)}
            handleClear={() => handleClearItem(index)}
            initValue={item.item}
            isEdit={editingItem === index}
            onEdit={() => {
              setEditingItem(index);
            }}
            onCancel={() => {
              setEditingItem(-1);
            }}
            onSave={(newValue) => {
              const newList = listItem.map((vl, idx) => {
                if (idx === index) {
                  vl.item = newValue;
                }
                return vl;
              });
              localStorage.setItem(taskList, JSON.stringify(newList));
              setListItem(newList);
              setEditingItem(-1);
            }}
          />
        );
      });
  console.log((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const handleListData = () => {
    if (value === "") {
      alert("Please add task");
    } else {
      const list = [{ item: value, isDone: false }, ...listItem];
      localStorage.setItem(taskList, JSON.stringify(list));
      setListItem(list);
      setValue("");
    }
  };
  const handleCheckItem = (i) => {
    const confirmDoneItem = window.confirm("Are you sure this task done ?");
    if (confirmDoneItem) {
      const afterCheck = listItem.map((vl, idx) => {
        if (i === idx) {
          vl.isDone = !vl.isDone;
        }
        return vl;
      });
      localStorage.setItem(taskList, JSON.stringify(afterCheck));
      setListItem(afterCheck);
    }
  };
  const handleClearItem = (c) => {
    const confirmClearItem = window.confirm("Are you sure to clear this task");
    if (confirmClearItem) {
      listItem.splice(c, 1);
      localStorage.setItem(taskList, JSON.stringify(listItem));
      setListItem([...listItem]);
      setCurrentPage(0);
    }
  };
  const handleClearData = () => {
    if (listItem.length === 0) {
      alert("Please add task");
    } else {
      const confirmClear = window.confirm("Are you sure to clear all task?");
      if (confirmClear) {
        localStorage.removeItem(taskList);
        setListItem([]);
      }
    }
  };
  const handleUserName = () => {
    if (getName === "") {
      alert("Please Add Your Name");
    } else {
      setConfirmName(getName);
      setGetName("");
    }
  };

  return (
    <>
      <div className="body__header">
        <div className="body__header-user">
          <div className="body__header-input">
            <Input
              value={getName}
              id="getname"
              onChange={(e) => {
                setGetName(e.target.value);
              }}
              placeholder="Enter your Username "
            />
            <Button id="edit" onClick={handleUserName} type="primary">
              {confirmName ? "Edit" : "Confirm"}
            </Button>
          </div>

          <p id="username">{confirmName}</p>
        </div>
        <div className="body__header-date">
          <DatePicker onChange={handleChange} />
          <div style={{ marginTop: 16 }}>
            Selected Date: {date ? date.format("DD-MM-YYYY") : ""}
          </div>
        </div>
      </div>
      <div className="body__task">
        <Input
          className="body__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add your task"
        />
        <Button className="body__btn" onClick={handleListData} type="primary">
          <FontAwesomeIcon icon="plus" />
        </Button>
        <Button className="body__btn" onClick={handleClearData} type="primary">
          <FontAwesomeIcon icon="trash" />
        </Button>
        <div>
          <Button
            onClick={() => {
              setHandleDone(STATUS.ALL);
            }}
            type="primary"
          >
            Show All task
          </Button>
          <Button
            onClick={() => {
              setHandleDone(STATUS.UNDONE);
            }}
            type="primary"
            className="undone"
          >
            Show Undone task
          </Button>
          <Button
            onClick={() => {
              setHandleDone(STATUS.DONE);
            }}
            type="primary"
          >
            Show Done task
          </Button>
        </div>
      </div>
      <div className="body__list">{showData()}</div>
      <Pagination
        pageSize={PAGE_SIZE}
        current={currentPage}
        total={listItem.length}
        onChange={(page) => {
          setCurrentPage(page);
        }}
      />
      ;
    </>
  );
};
export default Body;
