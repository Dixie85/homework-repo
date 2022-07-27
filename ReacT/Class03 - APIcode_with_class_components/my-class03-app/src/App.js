import Header from './Layout/Header/Header';
import './App.css';
import Footer from './Layout/Footer/Footer';
import PlanetsPage from './Pages/PlanetsPage/PlanetsPage';

function App() {
  const navbarLinkData = ["Home", "People", "Planets", "Stars"];
  const headerTitle = "STAR WARS TOURS"
  return (
    <div className="App">
      <Header navbarLinkData={navbarLinkData} headerTitle = {headerTitle} />
      <main>
        {/* < PeoplePage /> */}
        <PlanetsPage />
      </main>
      <Footer>
        <p>Your best experience provided by</p>
      </Footer>
      
    </div>
  );
}

export default App;
