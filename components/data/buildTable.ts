import { Consonant } from "./consonants"
import formatPinyin from "./formatPinyin"
import { Syllable, SyllableGroup } from "./syllables"
import { Vowel } from "./vowels"

export type TableData = (SyllableGroup | Consonant | Vowel | null)[][]

const buildTable = (syllables: Syllable[]) => {

    const tbl = []

    const vowels = Object.values(Vowel)
    const consonants = Object.values(Consonant)

    tbl.push([
        null,
        ...vowels.map((val) => {
            return val.replace('uu', 'ü')
        })
    ])

    for (const consonant of consonants) {
        const row = []

        row.push(consonant)

        for (const vowel of vowels) {

            const syllableList = syllables.filter((syllable) => {
                return (syllable.vowel == vowel) && (syllable.consonant == consonant)
            })

            if (syllableList.length == 0) {
                row.push(null)
                continue
            }

            const syllableGroup: SyllableGroup = {
                consonant: consonant,
                vowel: vowel,
                syllables: syllableList,
                pinyin: formatPinyin(vowel, consonant, 0),
                pinyin_normalized: syllableList[0].pinyin_normalized.slice(0,-1)
            }

            row.push(syllableGroup)
        }

        tbl.push(row)
    }

    return tbl
}

export default buildTable