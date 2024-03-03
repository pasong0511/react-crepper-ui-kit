//App.ts

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import todoStore, { ITodo } from "./store/store";

function App() {
    const [value, setValue] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>(todoStore.state.todos);

    const handleChange = (e) => {
        const value = e.target.value;
        setValue(value);
    };

    const handleClickSave = () => {
        todoStore.dispatch({
            type: "ADD_TODO",
            todo: { id: uuidv4(), message: value },
        });
        setValue("");
    };

    const handleClickRemove = (id: string) => {
        todoStore.dispatch({
            type: "REMOVE_TODO",
            id: id,
        });
    };

    useEffect(() => {
        //subscribe 메소드는 스토어의 상태가 변경될 때마다 setTodos를 호출한다.
        const unsubscribe = todoStore.subscribe((state) => {
            setTodos(state.todos);
        });

        return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
    }, []);

    return (
        <div>
            <input
                value={value}
                onChange={handleChange}
                placeholder="Todo 입력"
            />
            <button onClick={handleClickSave}>저장</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} onClick={() => console.log()}>
                        {todo.message}{" "}
                        <button onClick={() => handleClickRemove(todo.id)}>
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
