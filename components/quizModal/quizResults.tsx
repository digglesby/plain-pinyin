import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { Syllable } from "../data/syllables"
import { Context } from "../state/stateContext"
import AudioPlayer from "../audioPlayer/audioPlayer"
import ConfettiExplosion from "react-confetti-explosion"

type Props = {
    sounds: Syllable[],
    answers: Syllable[]
}

const QuizResults = (props: Props) => {
    const [isExploding, setIsExploding] = useState(false);

    const correct = useMemo(() => {
        return props.answers.reduce<number>((prev, answer, i) => {
            if (answer.pinyin_normalized === props.sounds[i].pinyin_normalized) {
                return prev + 1
            }

            return prev
        }, 0);
    }, [props.answers])

    useEffect(() => {
        if (correct === props.sounds.length) {
            setIsExploding(true)
        }
    },[])

    return (
        <div className="quiz-results">
            {isExploding && <ConfettiExplosion 
                zIndex={11} 
                onComplete={() => setIsExploding(false)}
                duration={4400}
            />}
            <h2>
                {correct}/{props.sounds.length}
            </h2>

            <table className="results">
                <tbody>
                {
                    props.answers.map((answer, i) => {
                        const isCorrect = (answer.pinyin_normalized === props.sounds[i].pinyin_normalized)

                        return (
                            <tr className={`${(isCorrect) ? 'correct' : 'incorrect'}`} key={i}>
                                <td>
                                    { isCorrect ? (
                                        <span className="material-symbols-outlined">check_circle</span>
                                    ) : (
                                        <span className="material-symbols-outlined">cancel</span>
                                    )}
                                </td>
                                <td>
                                    {(!isCorrect) ? <span>{answer.pinyin}</span> : null}
                                    {props.sounds[i].pinyin}
                                </td>
                                <td>
                                <AudioPlayer audioTrack={`/sounds/${props.sounds[i].pinyin_normalized}/${props.sounds[i].file_names[0]}`}/>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            
        </div>
    )

}

export default QuizResults