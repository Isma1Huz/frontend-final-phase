import "./App.css";
import RecipeRoom from "./RecipeRoom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RecipePage from "./Pages/RecipePage/RecipePage";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
