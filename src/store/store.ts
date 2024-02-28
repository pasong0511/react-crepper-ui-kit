import { create } from "zustand";

interface IViewer {
    id: number;
    name: string;
}

interface IViewerState {
    viewers: IViewer[];
    activeViewer?: number;

    addViewer: (viewer: IViewer) => void;
    removeViewer: (id: number) => void;
    setActiveViewer: (id: number) => void;
}

//set 함수는 상태를 업데이트하기 위해 사용되는 함수\
//Zustand 스토어를 생성할 때 create 함수에 전달되는 콜백 함수는 set 함수를 인자로 받음
//이 set 함수를 사용하여 스토어의 상태를 동기적으로 업데이트할 수 있음
const useStore = create<IViewerState>((set) => ({
    viewers: [],
    addViewer: (viewer) =>
        //viewer: addViewer() 매개변수로 넘겨주는 값
        set((state) => ({
            //prevState에 있는거랑, 새로 들어온 값이랑 합치기
            viewers: [...state.viewers, viewer],
        })),
    removeViewer: (id) =>
        set((state) => ({ viewers: state.viewers.filter((v) => v.id !== id) })),
    setActiveViewer: (id) => set(() => ({ activeViewer: id })),
}));

export default useStore;
