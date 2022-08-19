import "./App.css";

import { SynthesizerBody } from "./components";

function App() {
  return (
    <main className="App">
      <section className="App__synthesizer-body">
        <SynthesizerBody octavesCount={3} startCents={300 - 12 * 100} />
      </section>
    </main>
  );
}

export default App;
