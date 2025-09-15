import {useEffect, useState} from "react";
import ModalWindow from "./ModalWindow";

type Props = {
    isWon: boolean;
};

const GameWon = ({isWon}: Props) => {
    const [isOpened, setOpened] = useState(isWon);

    useEffect(() => {
        setOpened(isWon);
    }, [isWon]);

    return <ModalWindow isOpened={isOpened} close={() => setOpened(false)}>
        <div className="win-modal">
            <p className="win-modal__emoji">🎉</p>
            <p className="win-modal__text">Вы угадали слово!</p>
            <button onClick={() => window.location.reload()}>Новая игра</button>
        </div>
    </ModalWindow>;
}

export default GameWon;