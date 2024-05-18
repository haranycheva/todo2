import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="CreateTodo">create own todo</Link>
        </li>
        <li>
          <Link to="todo">todo list</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
