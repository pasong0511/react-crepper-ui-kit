//stote.ts

import { create } from "zustand";

export interface ITodo {
    id: string;
    message: string;
}

type TodoActionType =
    | { type: "ADD_TODO"; todo: ITodo }
    | { type: "REMOVE_TODO"; id: string };

interface ITodoList {
    todos: ITodo[];
    dispatch: (action: TodoActionType) => void;
}

// ADD_TODO 액션에 대한 처리 로직
function addTodo(state: ITodoList, action: { todo: ITodo }): ITodoList {
    return { ...state, todos: [...state.todos, action.todo] };
}

// REMOVE_TODO 액션에 대한 처리 로직
function removeTodo(state: ITodoList, action: { id: string }): ITodoList {
    return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
    };
}

class TodoStore {
    private useStore = create<ITodoList>((set) => ({
        todos: [],
        dispatch: (action) => {
            set((state) => {
                switch (action.type) {
                    case "ADD_TODO":
                        return addTodo(state, action);
                    case "REMOVE_TODO":
                        return removeTodo(state, action);
                    default:
                        return state;
                }
            });
        },
    }));

    get state() {
        return this.useStore.getState();
    }

    subscribe(listener: (state: any) => void) {
        return this.useStore.subscribe(listener);
    }

    dispatch(action: TodoActionType) {
        this.useStore.getState().dispatch(action);
    }
}

const todoStore = new TodoStore();
export default todoStore;
