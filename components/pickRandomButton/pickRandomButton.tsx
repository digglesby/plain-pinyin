import { useContext } from "react";
import { Context } from "../state/stateContext";

const PickRandomButton = () => {
    const {syllables, setSelectedSyllableGroup} = useContext(Context).syllables;

    const pickRandom = () => {

        if (syllables.syllableArray.length == 0) {
            return
        }

        const syllable = syllables.syllableArray[Math.floor(syllables.syllableArray.length * Math.random())]

        setSelectedSyllableGroup(syllables.syllableGroupMap[syllable.vowel][syllable.consonant])
    }

    return (
        <button onClick={pickRandom}>
            Pick Random
        </button>
    )
}

export default PickRandomButton