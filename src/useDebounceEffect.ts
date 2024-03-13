import { useEffect, DependencyList } from "react";

export function useDebounceEffect(
    fn: () => void,
    waitTime: number,
    deps?: DependencyList
) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn(); // 여기를 변경했습니다.
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
        // 아래의 deps는 useEffect의 의존성 배열을 정의하며, fn이 변경될 때마다 효과를 재실행합니다.
    }, [fn, ...(deps || [])]); // fn 및 deps가 변경될 때만 효과를 재실행합니다.
}
