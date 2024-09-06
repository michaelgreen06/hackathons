import "./App.css";
import BalanceDisplay from "./Components/gptTotals";
import SignMe from "./Components/SP";

function App() {
  return (
    <div>
      <SignMe />
      <BalanceDisplay />
    </div>
  );
}

export default App;
