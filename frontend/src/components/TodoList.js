import axios from "axios";
import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
} from "react-icons/md";

function TodoList({ todos = [], setTodos }) {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);

  function handleClose() {
    setShow(false);
  }

  const handleDelete = (id) => {
    axios
      .delete(`/api/todos/${id}/`)
      .then(() => {
        const newTodos = todos.filter((t) => {
          return t.id !== id;
        });
        setTodos(newTodos);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  const handleUpdate = async (id, value) => {
    // console.log("is=s");
    return axios
      .patch(`/api/todos/${id}/`, value)
      .then((res) => {
        const { data } = res;
        const newTodos = todos.map((t) => {
          if (t.id === id) {
            console.log(data);
            return data;
          }
          return t;
        });
        setTodos(newTodos);
      })
      .catch(() => {
        alert("something is wrong");
      });
  };

  const renderListGroupItem = (t) => {
    return (
      <ListGroup.Item
        key={t.id}
        className="d-flex justify-content-between align-item-center"
      >
        <div className="d-flex justify-content-center">
          <span
            style={{
              margin: "12px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleUpdate(t.id, {
                competed: !t.competed,
              });
            }}
          >
            {t.competed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </span>
          <span>{t.name}</span>
        </div>
        <div>
          <MdEdit
            style={{
              cursor: "pointer",
              marginRight: "12px",
            }}
            onClick={() => {
              setRecord(t);
              setShow(true);
            }}
          />
          <MdDelete
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              handleDelete(t.id);
            }}
          />
        </div>
      </ListGroup.Item>
    );
  };

  const handleChange = (e) => {
    setRecord({
      ...record,
      name: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, {
      name: record.name,
    });
    handleClose();
  };

  return (
    <>
      <ListGroup>{todos.map(renderListGroupItem)}</ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            value={record ? record.name : ""}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodoList;
