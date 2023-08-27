import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../state/stateContext"
import SettingControls from "../settings/settingsControls";
import Quiz from "./quiz";

const QuizModal = () => {
    const ref = useRef<HTMLDialogElement>();
    const {quiz} = useContext(Context);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (quiz.sounds) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [JSON.stringify(quiz.sounds)]);

    //I'd really love to use <dialog> as intended here
    //but the top layer sort order conflicts with the confettii effect
    //The top-layer spec has managed to make something worse than z-index bloat

    if (!isOpen) return null;

    return (
        <>
            <dialog
                open
                onClose={ () => quiz.setSounds(undefined) }
                ref={ref}
            >
                <div>
                    <button className="close-button" onClick={() => ref.current.close()}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    {
                        (quiz.sounds) ? (
                            <Quiz 
                                sounds={quiz.sounds}
                                options={quiz.options}
                                answers={quiz.answers}
                                answerQuestion={quiz.answerQuestion}
                            />
                        ): null
                    }
                    <SettingControls />
                </div>
            </dialog>
            <div 
                onClick={(e) => {

                    if (e.screenX === 0 && e.screenY === 0) {
                        // event not triggered from the screen.
                        e.preventDefault()
                        return
                    }

                    const dialogDimensions = ref.current.getBoundingClientRect();
                    if (
                        e.clientX < dialogDimensions.left ||
                        e.clientX > dialogDimensions.right ||
                        e.clientY < dialogDimensions.top ||
                        e.clientY > dialogDimensions.bottom
                    ) {
                        quiz.setSounds(undefined)
                    }
                }}
                className="dialog-backdrop"
            />
        </>

    )
}

export default QuizModal