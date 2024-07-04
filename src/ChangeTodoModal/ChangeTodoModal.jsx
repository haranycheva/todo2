import { ModalBack, ModalWindow } from "Modal/Modal.styled";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTodoArr } from "../redux/selector";
import { ChangeTodoForm } from "changeTodoForm/ChangeTodoForm";
import { SelectTodo } from "./ChangeTodoModal.styled";

export function ChangeTodoModal({ onClose }) {
  const todoList = useSelector(selectTodoArr);
  const [selectedTodo, setSelectedTodo] = useState("");
  const handleClickBg = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <ModalBack onClick={handleClickBg}>
      <ModalWindow>
        <SelectTodo
          name="selectedTodo"
          value={selectedTodo}
          onChange={(e) => {
            setSelectedTodo(e.target.value);
          }}
        >
          <option key={0} value={""}>
            ...
          </option>
          {todoList.map((item) => {
            console.log(item);
            return (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            );
          })}
        </SelectTodo>
        {selectedTodo && (
          <ChangeTodoForm selectedItemId={selectedTodo} onClose={onClose} />
        )}
      </ModalWindow>
    </ModalBack>
  );
}
