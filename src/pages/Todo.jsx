import { FilterForm } from "FilterForm/FilterForm";
import { ListToDo } from "ListToDo/ListToDo";
import { Loader } from "Loader/Loader";
import { ModalForDelete } from "ModalForDelete/ModalForDelete";
import { PresentationBox } from "PresentationBox/PresentationBox";
import { deleteToDo, getToDo } from "fetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { chandeTodoArr } from "../redux/actions";
import { getTodoArr } from "../redux/selector";

function Todo() {
  const todoList = useSelector(getTodoArr);
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(
    localStorage.getItem("selected")
      ? JSON.parse(localStorage.getItem("selected"))
      : null
  );
  const [deleteEl, setDeleteEl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const[params] = useSearchParams();
  const level = params.get(`level`) ?? "all";
  const topic = params.get(`topic`) ?? "";

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getToDo();
        dispatch(chandeTodoArr(data));
      } catch (error) {
        console.log("err:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  const toggleDeleteModal = (id) => {
    setDeleteEl(!showDeleteModal ? id : null);
    setShowDeleteModal((showDeleteModal) => !showDeleteModal);
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const dataDel = await deleteToDo(deleteEl);
      dispatch(chandeTodoArr(todoList.filter((el) => el.id !== dataDel.id)))
      console.log(todoList.filter((el) => el.id !== dataDel.id));
      setSelected((selected) => (selected?.id === dataDel.id ? "" : selected));
      toast.success("Success 👻");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      toggleDeleteModal();
    }
  };
  const handleClick = (e, id, title, description) => {
    if (e.target.nodeName === "BUTTON") {
      return;
    }
    setSelected({ id, title, description });
  };
  const toFilter = ( list) => {
    if (level === "all") {
      return list.filter((item) =>
        item.title.toLowerCase().includes(topic.toLowerCase())
      );
    }
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(topic.toLowerCase()) &&
        item.level === level
    );
  };
  return (
    <>
      <FilterForm/>
      {error && <p>Ooooooooooops.... Something went wrong.....</p>}
      {isLoading && <Loader />}
      {todoList.length > 0 && (
        <ListToDo
          list={toFilter(todoList)}
          onDelete={toggleDeleteModal}
          selected={selected}
          onClick={handleClick}
        />
      )}
      <PresentationBox
        selected={
          selected || {
            title: "You selected nothing",
            description: "...",
          }
        }
      />
      {showDeleteModal && (
        <ModalForDelete onClose={toggleDeleteModal} onDelete={handleDelete} />
      )}
    </>
  );
}
export default Todo;
