import {useEffect, useState} from "react";
import ModalWindow from "./ModalWindow";

type Props = {
    lostWord: string;
};

const GameLost = ({lostWord}: Props) => {
    const [isOpened, setOpened] = useState(lostWord !== "");

    useEffect(() => {
        setOpened(lostWord !== "");
    }, [lostWord]);

    return <ModalWindow isOpened={isOpened} close={() => setOpened(false)}>
        <div className="win-modal">
            <p className="win-modal__emoji">❌</p>
            <p className="win-modal__text">Вы проиграли! Отгадываемое слово: <b>{lostWord}</b></p>
            <button onClick={() => window.location.reload()}>Новая игра</button>
        </div>
    </ModalWindow>;
}

export default GameLost;