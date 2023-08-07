import { Vowel } from "../components/data/vowels";
import { Consonant } from "../components/data/consonants";
import { Syllable } from "../components/data/syllables";
import * as fs from 'fs'
import { exit } from "node:process";
import path from "path";
import { Tone } from "../components/data/tones";
import formatPinyin from "../components/data/formatPinyin";
import characterLookupTrad from './characterLookupTrad.json'
import characterLookupSimp from './characterLookupSimp.json'

//We're gonna read backwards from sounds because it's already defined
//and I'm lazy
const soundsDir = 'public/sounds'
const dataDir = 'public/data'

const getToneForPinyin = (pinyin: string): Tone => {
    const toneNum = parseInt(pinyin.slice(-1))
    return toneNum
}

const parseNormalizedPinyin = (normalizedPinyin: string): [Vowel, Consonant] => {
    const pinyin = normalizedPinyin.slice(0, -1)

    const noneMap: {[key: string]: Vowel} = {
        'a': Vowel.A,
        'ai': Vowel.Ai,
        'ao': Vowel.Ao,
        'an': Vowel.An,
        'ang': Vowel.Ang,
        'o': Vowel.O,
        'ou': Vowel.Ou,
        'e': Vowel.E,
        'ei': Vowel.Ei,
        'en': Vowel.En,
        'eng': Vowel.Eng,
        'er': Vowel.Er,
    }
    
    //Pinyin has no consonant, no need to check for one
    if (noneMap.hasOwnProperty(pinyin)) {
        return [noneMap[pinyin], Consonant.None]
    }

    const keys = Object.keys(Consonant)
    keys.sort((a,b) => b.length - a.length)
    
    for (const key of keys) {
        if (pinyin.startsWith(Consonant[key])) {
            const consonant: Consonant = Consonant[key]

            let secondHalf = pinyin.substring(consonant.length)

            //ü edge cases
            const uuConsonants = [
                Consonant.J,
                Consonant.Q,
                Consonant.X,
                Consonant.Y,
            ]

            if (uuConsonants.includes(consonant)) {
                switch (secondHalf){
                    case 'u':
                        secondHalf = Vowel.UU
                        break;
                    case 'ue':
                        secondHalf = Vowel.UUe
                        break;
                    case 'uan':
                        secondHalf = Vowel.UUan
                        break;
                    case 'un':
                        secondHalf = Vowel.UUn
                }
            }


            if (!Object.values(Vowel).includes(secondHalf as Vowel)) {
                throw new Error(`Can't find vowel for ${pinyin}, ${consonant}, ${secondHalf}!`)
            }

            return [secondHalf as Vowel, consonant]
        }
    }

}

const getExampleSimpCharacter = (normalizedPinyin: string) => {
    
    if (characterLookupSimp.hasOwnProperty(normalizedPinyin)){
        return characterLookupSimp[normalizedPinyin]
    }

    return ''
}

const getExampleTradCharacter = (normalizedPinyin: string) => {

    if (characterLookupTrad.hasOwnProperty(normalizedPinyin)){
        return characterLookupTrad[normalizedPinyin]
    }

    return ''
}


const getSyllableForPinyin = (
    pinyin: string, 
    soundFiles: string[]
): Syllable => {
    const tone = getToneForPinyin(pinyin)
    const [vowel, consonant] = parseNormalizedPinyin(pinyin)
    return {
        // @ts-ignore This should always match the consonant/verb/tone syntax
        pinyin_normalized: pinyin,
        tone: tone,
        pinyin: formatPinyin(vowel, consonant, tone),
        vowel: vowel,
        consonant: consonant,
        simplified_character: getExampleSimpCharacter(pinyin),
        traditional_character: getExampleTradCharacter(pinyin),
        file_names: soundFiles
    }
}


try {
    const syllableArray = []

    fs.readdir(soundsDir, (err, dirs) => {
        if (err) throw err

        for (const dir of dirs) {

            const soundFiles = fs.readdirSync(path.join(soundsDir, dir))
            const syllable = getSyllableForPinyin(dir, soundFiles)
            syllableArray.push(syllable)
        }

        const syllableData = Buffer.from(JSON.stringify(syllableArray), 'utf-8')

        fs.writeFile(path.join(dataDir, 'syllables.json'), syllableData, (err) => {
            if (err) throw err
            console.log(`Wrote ${syllableData.byteLength} bytes, ${syllableArray.length} syllables`)
        })
    })

} catch (err) {
    console.error(err)
    exit(1)
}