import { Consonant } from "./consonants"
import { Tone } from "./tones"
import { Vowel } from "./vowels"

export type Syllable = {
    consonant: Consonant
    vowel: Vowel,
    tone: Tone,
    pinyin: string,
    pinyin_normalized: string,
    simplified_character: string,
    traditional_character: string,
    file_names: string[]
}

export type SyllableGroup = {
    consonant: Consonant
    vowel: Vowel,
    pinyin: string,
    pinyin_normalized: string,
    syllables: Syllable[]
}

function JsonToSylable(data: any): Syllable {
    return {
        consonant: Consonant[data.consonant],
        vowel: Vowel[data.vowel],
        tone: Vowel[data.tone],
        pinyin: data.pinyin,
        pinyin_normalized: data.pinyin_normalized,
        simplified_character: data.simplified_character,
        traditional_character: data.traditional_character,
        file_names: data.file_names
    }
}