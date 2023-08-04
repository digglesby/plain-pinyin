import { useContext } from "react";
import { Context } from "../state/stateContext";

const PickRandomButton = () => {
    const {syllables} = useContext(Context);

    const pickRandom = () => {
        if (syllables.syllables.length == 0) {
            return
        }

        const rand = syllables.syllables[Math.floor(syllables.syllables.length * Math.random())]
        syllables.setSelectedSyllableGroup(`${rand.consonant}${rand.vowel}`)
    }

    return (
        <button onClick={pickRandom}>
            Pick Random
        </button>
    )
}

export default PickRandomButton