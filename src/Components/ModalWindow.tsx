import {useEffect, useRef} from "react";

type Props = {
    isOpened: boolean;
    close: () => void;
    children: React.ReactNode;
}

const ModalWindow = ({isOpened, close, children}: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    return <div onClick={close} className={`modal${isOpened ? " opened" : ""}`}>
        <div onClick={(e) => e.stopPropagation()} ref={modalRef} className="modal__inner">
            <button className="modal__close" aria-label="Закрыть окно" onClick={close}>
                <img src={`${process.env.PUBLIC_URL}/close.svg`} alt="" />
            </button>
            {children}
        </div>
    </div>
}

export default ModalWindow;