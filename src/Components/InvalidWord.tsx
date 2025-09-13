import {useEffect, useRef} from "react";

type Props = {
    isInvalid: boolean;
    close: () => void;
}

const InvalidWord = ({isInvalid, close}: Props) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>();

    useEffect(() => {
        if(isInvalid) {
            timeoutRef.current = setTimeout(() => {
                close();
            }, 2500);
        }

        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, [isInvalid]);

    return <div className={`invalid-word${isInvalid ? " active" : ""}`}>
        <p>Данного слова нет в словаре!</p>
    </div>
}

export default InvalidWord;