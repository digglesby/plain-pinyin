import { Consonant } from "./consonants"
import formatPinyin from "./formatPinyin"
import { Syllable, SyllableData, SyllableGroup } from "./syllables"
import { Vowel } from "./vowels"

export type TableData = (SyllableGroup | Consonant | Vowel | null)[][]

const buildTable = (syllables: SyllableData) => {

    const tbl = []

    const vowels = Object.values(Vowel)
    const consonants = Object.values(Consonant)

    tbl.push([
        null,
        ...consonants.map((val) => {
            return val.replace('uu', 'ü')
        })
    ])

    for (const vowel of vowels) {
        const row = []

        row.push(vowel.replace('uu', 'ü'))

        for (const consonant of consonants) {

            if ((!syllables.syllableGroupMap[vowel]) || (!syllables.syllableGroupMap[vowel][consonant])) {
                row.push(null);
                continue
            }

            row.push(syllables.syllableGroupMap[vowel][consonant])
        }

        tbl.push(row)
    }

    return tbl
}

export default buildTable