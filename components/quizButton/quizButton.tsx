import { useContext } from "react";
import { Context } from "../state/stateContext";
import { Syllable } from "../data/syllables";

const QuizButton = () => {
    const {syllables} = useContext(Context).syllables;
    const {setSounds} = useContext(Context).quiz;

    const startQuiz = () => {

        const questionCount = 10
        const sounds: Syllable[] = []

        for (let i = 0; i < questionCount; i++) {
            let syllable: Syllable = null

            while (
                (syllable == null) || 
                sounds.some(
                    (a: Syllable) => {
                        return a.pinyin_normalized == syllable.pinyin_normalized
                    }
                )
            ){
                syllable = syllables.syllableArray[Math.floor(syllables.syllableArray.length * Math.random())]
            }

            sounds.push(syllable)
        }

        setSounds(sounds)
    }

    return (
        <button
            onClick={startQuiz}
            className="quiz"
        >
            Quiz Me
        </button>
    )
}

export default QuizButton