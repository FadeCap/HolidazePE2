import Layout from "./components/Layout";
import Venues from "./Components/API/Venues";


function App() {
  return (
    <Layout>
      <Venues />
      {/* Your main content goes here */}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Welcome to Holidaze</h1>
        <p>Explore the best holiday destinations!</p>
      </div>
    </Layout>
  );
}

export default App;
