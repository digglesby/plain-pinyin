import { Syllable } from "../data/syllables"
import AudioPlayer from "./audioPlayer"

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

        const correct = props.answers.reduce<number>((prev, answer, i) => {
            if (answer.pinyin_normalized === props.sounds[i].pinyin_normalized) {
                return prev + 1
            }

            return prev
        }, 0)

        return (
            <div className="quiz-wrapper">
                <h2>{correct}/{props.sounds.length}</h2>
                <ul>
                    {
                        props.answers.map((answer, i) => {
                            return (
                                <li>
                                    <span>{props.sounds[i].pinyin}</span> - {answer.pinyin}
                                </li>
                            )
                        })
                    }
                </ul>
                
            </div>
        )
    } else {

        const optionButtons = props.options[index].map((option) => {
            return (
                <button 
                    key={option.pinyin_normalized} 
                    onClick={() => { props.answerQuestion(index, option) }}
                >
                    {option.pinyin}
                </button>
            )
        })

        return (
            <div className="quiz-wrapper">
                <AudioPlayer audioTrack={`/sounds/${props.sounds[index].pinyin_normalized}/${props.sounds[index].file_names[0]}`}/>
                {optionButtons}
            </div>


        )
    }

}

export default Quiz