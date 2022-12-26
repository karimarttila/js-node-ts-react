import React from "react";
import Header from "./header";

const landing = (
  <div className="App">
    <div>
      <Header />
      <div className="p-4">
        <p className="text-left p-4">
          This is a demo webstore built for learning the following technologies:
        </p>
        <div className="p-4">
          <p className="text-left font-bold">Backend:</p>
          <ul className="list-disc list-inside">
            <li>Javascript</li>
            <li>Node</li>
          </ul>
        </div>
        <div className="p-4">
          <p className="text-left font-bold">Frontend:</p>
          <ul className="list-disc list-inside">
            <li>Typescript</li>
            <li>React</li>
            <li>Redux</li>
            <li>Tailwind</li>
          </ul>
        </div>
      </div>
      <div className="p-4 text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Enter Webstore!
        </button>
      </div>
    </div>
  </div>
);

function App() {
  return landing;
}

export default App;
