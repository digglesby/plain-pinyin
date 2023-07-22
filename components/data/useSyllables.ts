import { useEffect, useState } from "react"
import { Syllable } from "./syllables"
import axios from "axios"
import { Consonant } from "./consonants"
import { Vowel } from "./vowels"

let fetching = false
let cachedSyllables: Syllable[] | null = null

const useSyllables = (): [
    Boolean, 
    Error | undefined, 
    Syllable[] | 
    null, () => void
] => {
    const [err, setErr] = useState<Error | undefined>()
    const [loading, setLoading] = useState<Boolean>(fetching)
    const [syllables, setSyllables] = useState<Syllable[]>(cachedSyllables)

    const reload = async () => {
        setLoading(true)
        setErr(undefined)
        setSyllables([])
        fetching == true

        try {
            const data = await axios.get('/data/syllables.json')
            cachedSyllables = data.data as Syllable[]

            setSyllables(cachedSyllables)
        } catch (fetchErr) {
            setErr(fetchErr)
        }

        fetching = false
        setLoading(false)
    }

    useEffect(() => {
        if ((cachedSyllables === null) && (fetching === false)) {
            reload()
        }
    },[])

    return [loading, err, syllables, reload]
}

export default useSyllables