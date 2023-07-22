import { Consonant } from "./consonants"
import { Tone } from "./tones"
import { Vowel } from "./vowels"


const formatPinyin = (vowel: Vowel, consonant: Consonant, tone: Tone | 0): string => {
    
    const vowelLetterToneMap = {
        a: ['a','ā','á','ǎ','à'],
        e: ['e','ē','é','ě','è'],
        i: ['i','ī','í','ǐ','ì'],
        o: ['o','ō','ó','ǒ','ò'],
        u: ['u','ū','ú','ǔ','ù'],
        uu: ['ü','ǖ','ǘ','ǚ','ǜ'],
    }

    let pinyin: string = vowel
    
    switch (vowel) {
        case Vowel.UU:
            if ((consonant == Consonant.L) || (consonant == Consonant.N)) {
                pinyin = pinyin.replace('uu',vowelLetterToneMap.uu[tone])
                break
            }
        case Vowel.UUe:
        case Vowel.UUan:
        case Vowel.UUn:
            pinyin = pinyin.replace('uu','u')
            break
    }

    switch (vowel) {
        case Vowel.A:
        case Vowel.Ai:
        case Vowel.Ao:
        case Vowel.An:
        case Vowel.Ang:
        case Vowel.Ia:
        case Vowel.Iao:
        case Vowel.Ian:
        case Vowel.Iang:
        case Vowel.Ua:
        case Vowel.Uai:
        case Vowel.Uan:
        case Vowel.Uang:
        case Vowel.UUan:
            pinyin = pinyin.replace('a',vowelLetterToneMap.a[tone])
            break
        case Vowel.E:
        case Vowel.Ei:
        case Vowel.En:
        case Vowel.Eng:
        case Vowel.Er:
        case Vowel.Ie:
        case Vowel.UUe:
            pinyin = pinyin.replace('e',vowelLetterToneMap.e[tone])
            break
        case Vowel.I:
        case Vowel.In:
        case Vowel.Ing:
        case Vowel.Ui:
            pinyin = pinyin.replace('i',vowelLetterToneMap.i[tone])
            break
        case Vowel.O:
        case Vowel.Ong:
        case Vowel.Ou:
        case Vowel.Iong:
        case Vowel.Uo:
            pinyin = pinyin.replace('o',vowelLetterToneMap.o[tone])
            break
        case Vowel.U:
        case Vowel.Iu:
        case Vowel.Un:
            pinyin = pinyin.replace('u',vowelLetterToneMap.u[tone])
            break
    }

    pinyin = `${(consonant != Consonant.None) ? consonant : ''}${pinyin}`
    return pinyin
}

export default formatPinyin