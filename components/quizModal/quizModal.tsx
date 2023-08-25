import { useContext, useEffect, useRef } from "react"
import { Context } from "../state/stateContext"
import SettingControls from "../settings/settingsControls";
import Quiz from "./quiz";

const QuizModal = () => {

    const ref = useRef<HTMLDialogElement>();
    const {quiz} = useContext(Context)

    useEffect(() => {
        if (quiz.sounds) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [JSON.stringify(quiz.sounds)]);

    return (
        <dialog
            onClose={ () => quiz.setSounds(undefined) }
            ref={ref}
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
                    ref.current.close();
                }
            }}
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
    )
}

export default QuizModal