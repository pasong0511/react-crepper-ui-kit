import React, { useState } from "react";
import "./App.css";

import useStore from "./store/store";

function App() {
    const [viewerName, setViewerName] = useState<string>("");

    // 이 코드에서는 addViewer, setActiveViewer, removeViewer 직접 호출 대신
    //dispatch 함수를 사용하여 액션을 처리합니다.
    //각 버튼의 이벤트 핸들러 내에서 dispatch 함수를 호출하고,
    //액션 타입과 필요한 데이터를 객체 형태로 전달합니다.
    //이 방식을 통해 상태 업데이트 로직을 스토어로 중앙집중화할 수 있으며,
    // 컴포넌트는 단순히 액션을 디스패치하는 역할만 담당하게 됩니다.
    const dispatch = useStore((state) => state.dispatch);
    const viewers = useStore((state) => state.viewers);

    const handleAddViewer = () => {
        dispatch({
            type: "ADD_VIEWER",
            viewer: { id: viewers.length + 1, name: viewerName },
        });
        setViewerName("");
    };

    const handleSetActiveViewer = (id: number) => {
        dispatch({ type: "SET_ACTIVE_VIEWER", id });
    };

    const handleRemoveViewer = (id: number) => {
        dispatch({ type: "REMOVE_VIEWER", id });
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
                        onClick={() => handleSetActiveViewer(viewer.id)}
                    >
                        {viewer.name}{" "}
                        <button onClick={() => handleRemoveViewer(viewer.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
