import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeRoom from "./RecipeRoom";

function App() {
  return (
    <div className="App">
      <RecipeRoom />
      <ToastContainer />
    </div>
  );
}

export default App;
