import React from "react";
import "./App.css";

function App() {
    const testModule = { test: "test" };
    window.PasongTest = testModule;

    return (
        <div className="App">
            <div>테스트</div>
        </div>
    );
}

export default App;
