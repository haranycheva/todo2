import { GlobalStyled } from "GlobalStyle.style";
import { Link, Route, Routes } from "react-router-dom";
import CreateTodo from "pages/CreateTodo";
import Todo from "pages/Todo";
import TodoDetails from "pages/TodoDetails";
import { Toaster } from "react-hot-toast";
import { Layout } from "Layout/Layout";
import Home from "pages/Home";

export function App() {
  return (
    <>
      <GlobalStyled />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="createTodo" element={<CreateTodo />} />
          <Route path="todo" element={<Todo />} />
          <Route path="todo/:todoId" element={<TodoDetails />} />
          <Route path="*" element={<div>404 ERROR</div>} />
        </Route>
      </Routes>
    </>
  );
}
