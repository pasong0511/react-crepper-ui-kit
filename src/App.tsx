import React, { useState } from "react";
import "./App.css";

import useStore from "./store/store";

function App() {
    const [viewerName, setViewerName] = useState<string>("");

    const addViewer = useStore((state) => state.addViewer);
    const viewers = useStore((state) => state.viewers);
    const setActiveViewer = useStore((state) => state.setActiveViewer);
    const removeViewer = useStore((state) => state.removeViewer);

    const handleAddViewer = () => {
        addViewer({ id: viewers.length + 1, name: viewerName });
        setViewerName("");
    };

    return (
        <div>
            <input
                value={viewerName}
                onChange={(e) => setViewerName(e.target.value)}
                placeholder="Enter viewer name"
            />
            <button onClick={handleAddViewer}>Add Viewer</button>
            <ul>
                {viewers.map((viewer) => (
                    <li
                        key={viewer.id}
                        onClick={() => setActiveViewer(viewer.id)}
                    >
                        {viewer.name}{" "}
                        <button onClick={() => removeViewer(viewer.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
