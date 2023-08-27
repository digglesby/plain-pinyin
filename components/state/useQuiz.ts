import { useEffect, useState } from 'react';
import { Syllable, SyllableData } from '../data/syllables';

const useSettings = (syllables: SyllableData): [
    Syllable[] | undefined, 
    Syllable[][] | undefined, 
    Syllable[] | undefined, 
    (v: Syllable[] | undefined) => void,
    (i: number, v: Syllable) => boolean
] => {
  const [sounds, setSounds] = useState<Syllable[]>()
  const [options, setOptions] = useState<Syllable[][]>()
  const [answers, setAnswers] = useState<Syllable[]>()

  const setQuizSounds = (quizSounds: Syllable[] | undefined) => {

    if (!quizSounds) {
        setSounds(undefined)
        setOptions(undefined)
        setAnswers(undefined)
        return
    }

    setSounds(quizSounds)
    const quizOptions = []

    for (let i = 0; i < quizSounds.length; i++) {
        const correctSound = quizSounds[i];
        const soundOptions = [correctSound]

        const possibleSylablePool = syllables.syllableArray.filter((syl) => {
            return (correctSound.pinyin_normalized !== syl.pinyin_normalized)
        }).sort(() => 0.5 - Math.random())

        const similarConsonantPool = possibleSylablePool.filter((syl) => {
            return syl.pinyin_normalized.startsWith(correctSound.consonant[0])
        }).sort(() => 0.5 - Math.random())

        const similarTonePool = similarConsonantPool.filter((syl) => {
            return syl.tone === correctSound.tone
        }).sort(() => 0.5 - Math.random())

        const similarVowelPool = similarConsonantPool.filter((syl) => {
            return syl.vowel === correctSound.vowel
        }).sort(() => 0.5 - Math.random())

        while (soundOptions.length < 4) {
            const rnd = Math.floor(Math.random()*4)
            let sound:Syllable

            switch(rnd) {
                case 0:
                    if (similarConsonantPool.length > 0) sound = similarConsonantPool.pop()
                    break;
                case 1:
                    if (similarTonePool.length > 0) sound = similarTonePool.pop()
                    break;
                case 2:
                    if (similarVowelPool.length > 0) sound = similarVowelPool.pop()
                    break;
                case 3:
                    if (possibleSylablePool.length > 0) sound = possibleSylablePool.pop()
                    break;
            }

            if (!soundOptions.some((opt) => { return (opt.pinyin_normalized === sound.pinyin_normalized) })) {
                soundOptions.push(sound)
            }
        }

        quizOptions.push(soundOptions.sort(() => 0.5 - Math.random()))
    }

    setOptions(quizOptions)
    setAnswers([])
  }

  const answerQuestion = (i: number, syllable: Syllable) => {
    const quizAnswers = [...answers]

    quizAnswers[i] = syllable

    setAnswers(quizAnswers)

    return (syllable.pinyin_normalized === sounds[i].pinyin_normalized)
  }

  return [sounds, options, answers, setQuizSounds, answerQuestion]
}

export default useSettings