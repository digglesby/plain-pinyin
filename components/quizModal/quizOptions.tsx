import { useContext } from "react"
import { Syllable } from "../data/syllables"
import { Context } from "../state/stateContext"
import AudioPlayer from "../audioPlayer/audioPlayer"

type Props = {
    index: number,
    questionCount: number,
    sound: Syllable, 
    options: Syllable[],
    answerQuestion: (i: number, v: Syllable) => boolean
}

const QuizOptions = (props: Props) => {
    const {settings} = useContext(Context);

    const optionButtons = props.options.map((option) => {
        const char = (settings.useTrad) ? option.traditional_character : option.simplified_character

        return (
            <button 
                key={`${props.index}${option.pinyin_normalized}`} 
                onClick={() => { props.answerQuestion(props.index, option) }}
            >
                {option.pinyin}<span>{(char == '') ? '\u3000' : char}</span>
            </button>

        )
    })

    if (optionButtons.length > 4) {
        console.error(props)
    }

    return (
        <div className="quiz-wrapper">
            <p className="progress">{props.index + 1}/{props.questionCount}</p>
            <AudioPlayer audioTrack={`/sounds/${props.sound.pinyin_normalized}/${props.sound.file_names[0]}`}/>
            <div className='quiz-options'>
                {optionButtons}
            </div>
        </div>


    )
}

export default QuizOptions