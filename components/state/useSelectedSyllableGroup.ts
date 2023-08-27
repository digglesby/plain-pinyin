import { useEffect, useState } from "react"
import { SyllableData, SyllableGroup } from "../data/syllables"
import { Consonant } from "../data/consonants"
import { Vowel } from "../data/vowels"

const parsePinyin = (text: string): [Vowel, Consonant] | [null, null] => {

    const consonant = Object.values(Consonant)
        .filter((val) => { return text.startsWith(val) })
        .sort((a, b) => b.length - a.length)[0]

    if (!consonant) {
        return [null, null]
    }

    const vowel = Object.values(Vowel)
        .find((val) => { return text.substring(consonant.length) === val })

    if (!vowel) {
        return [null, null]
    }

    return [vowel, consonant]
}

const useSyllables = (syllableData: SyllableData): [
    SyllableGroup,
    (v: SyllableGroup) => void
] => {
    const [syllableGroupPinyin, setSyllableGroupPinyin] = useState<string | undefined>()
    const [selectedSyllableGroup, setSelectedSyllableGroup] = useState<SyllableGroup | undefined>()

    useEffect(() => {
        if (window.location.hash) {
            setSyllableGroupPinyin(window.location.hash.substring(1))
        }
    },[])

    useEffect(() => {

        if ((!syllableData) || (syllableData.syllableArray.length === 0)) return

        if (!syllableGroupPinyin) {
            setSelectedSyllableGroup(undefined)

            const uri = window.location.toString();
 
            if (uri.indexOf("#") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("#"));
 
                window.history.replaceState({}, document.title, clean_uri);
            }
            
            return
        }

        const [vowel, consonant] = parsePinyin(syllableGroupPinyin)
        const syllableGroup = ((vowel) && (consonant)) ? syllableData.syllableGroupMap[vowel][consonant] : undefined

        window.location.hash = syllableGroupPinyin ?? ''

        if (syllableGroup) setSelectedSyllableGroup(syllableGroup)
    },[JSON.stringify(syllableData), syllableGroupPinyin])

    return [selectedSyllableGroup, (s: SyllableGroup | string | undefined) => {

        if (s === undefined) {
            setSyllableGroupPinyin(undefined)
            return
        }

        if (typeof(s) == 'string') {
            setSyllableGroupPinyin(s)
            return
        }

        setSyllableGroupPinyin(s ? s.pinyin_normalized : undefined)
    }]
}

export default useSyllables