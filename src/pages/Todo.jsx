import { FilterForm } from "FilterForm/FilterForm";
import { ListToDo } from "ListToDo/ListToDo";
import { Loader } from "Loader/Loader";
import { ModalForDelete } from "ModalForDelete/ModalForDelete";
import { PresentationBox } from "PresentationBox/PresentationBox";
import { deleteToDo, getToDo } from "fetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Todo() {
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({ title: "", level: "all" });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(
    localStorage.getItem("selected")
      ? JSON.parse(localStorage.getItem("selected"))
      : null
  );
  const [deleteEl, setDeleteEl] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      setList((list) => list.filter((el) => el.id !== dataDel.id));
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
        <ModalForDelete onClose={toggleDeleteModal} onDelete={handleDelete} />
      )}
    </>
  );
}
export default Todo;
