import { GlobalStyled } from "GlobalStyle.style";
import { ListToDo } from "ListToDo/ListToDo";
import { FormToDo } from "FormToDo/FormToDo";
import {useEffect } from "react";
import { Modal } from "Modal/Modal";
import { PresentationBox } from "PresentationBox/PresentationBox";
import { ModalForDelete } from "ModalForDelete/ModalForDelete";
import { deleteToDo, postToDo, getToDo } from "fetch";
import { Loader } from "Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { FilterForm } from "FilterForm/FilterForm";
import { useState } from "react";

export function App() {
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({ title: "", level: "all" });
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEl, setDeleteEl] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(localStorage.getItem("selected")
    ? JSON.parse(localStorage.getItem("selected"))
    : null)
    
    useEffect(() => {
      const fetch = async () => {
        setLoading(true);
        try {
          const data = await getToDo();
          setList(data);
        } catch (error) {
          console.log("err:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }, []);

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected])

  const handleAddItem = async (item) => {
    setLoading(true)
    setError(null)
    try {
      const dataAdd = await postToDo(item);
      setList(( list ) => ([...list, dataAdd]));
      toast.success("Success 👻");
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  };
  const toggleDeleteModal = (id) => {
    setDeleteEl(!showDeleteModal ? id : null)
    setShowDeleteModal((showDeleteModal) => !showDeleteModal);
  };
  const handleDelete = async () => {
    setLoading(true)
    setError(null)
    try {
      const dataDel = await deleteToDo(deleteEl);
      setList((list) => list.filter((el) => el.id !== dataDel.id))
      setSelected((selected) => selected?.id === dataDel.id ? "" : selected)
      toast.success("Success 👻");
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
      toggleDeleteModal();
    }
  };
  const toggleModal = () => {
    setShowModal(( showModal) => !showModal);
  };
  const handleClick = (e, id, title, description) => {
    if (e.target.nodeName === "BUTTON") {
      return;
    }
    setSelected({ id, title, description });
  };
  const handleFilterChange = (filterName, filterValue) => {
    setFilters((filters) => ({ ...filters, [filterName]: filterValue }));
  };
  const toFilter = (filters, list) => {
    if (filters.level === "all") {
      return list.filter((item) =>
        item.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        item.level === filters.level
    );
  };
    return (
      <>
        <GlobalStyled />
        <Toaster position="top-center" reverseOrder={false} />
        <button type="button" onClick={toggleModal}>
          open
        </button>
        <FormToDo onAdd={handleAddItem}></FormToDo>
        <FilterForm
          onFilterChange={handleFilterChange}
          valueTitle={filters.title}
          valueLevel={filters.level}
        />
        {error && <p>Ooooooooooops.... Something went wrong.....</p>}
        {isLoading && <Loader />}
        {list.length > 0 && (
          <ListToDo
            list={toFilter(filters, list)}
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
          <ModalForDelete
            onClose={toggleDeleteModal}
            onDelete={handleDelete}
          />
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <h1>dsfhhjdfshjdsfh</h1>
            <p></p>
          </Modal>
        )}
      </>
    );
}
