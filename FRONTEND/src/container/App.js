import { Outlet } from "react-router-dom";
import NavBar from "../components/Common/NavBar";
import { loadLogin } from "../resources/login/loginSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
export default App;
