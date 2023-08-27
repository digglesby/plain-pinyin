import { Syllable } from "../data/syllables"
import QuizOptions from "./quizOptions"
import QuizResults from "./quizResults"

type Props = {
    sounds: Syllable[], 
    options: Syllable[][], 
    answers: Syllable[],
    answerQuestion: (i: number, v: Syllable) => boolean
}

const Quiz = (props: Props) => {
    const index = props.answers.length
    const quizDone = (index === props.sounds.length)

    if (quizDone) {

        return (
            <QuizResults 
                sounds={props.sounds}
                answers={props.answers}
            />
        )

    } else {

        return (
            <QuizOptions 
                index={index}
                sound={props.sounds[index]}
                options={props.options[index]}
                questionCount={props.sounds.length}
                answerQuestion={props.answerQuestion}
            />
        )
    }

}

export default Quiz