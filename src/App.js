import { GlobalStyled } from "GlobalStyle.style";
import { Link, Route, Routes } from "react-router-dom";
import CreateTodo from "pages/CreateTodo";
import Todo from "pages/Todo";
import TodoDetails from "pages/TodoDetails";
import { Toaster } from "react-hot-toast";
import { Layout } from "Layout/Layout";
// import { Suspense, lazy } from "react";
import Home from "pages/Home";

// const Home = lazy(() =>import('./pages/Home'))
// <Suspense fallback={Home}> нада юзать тока експорт дефолт, бо всьо полетить нахуй, бо лезі шукає саме дефол 
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
