import { useEffect, useMemo, useState } from "react"
import { Syllable, SyllableGroup } from "../data/syllables"
import axios from "axios"
import { Consonant } from "../data/consonants"
import { Vowel } from "../data/vowels"
import buildTable, { TableData } from "../data/buildTable"

let fetching = false
let cachedSyllables: Syllable[] | null = null

const useSyllables = (): [
    boolean, 
    Error | undefined, 
    Syllable[],
    TableData,
    () => void,
] => {
    const [err, setErr] = useState<Error | undefined>()
    const [loading, setLoading] = useState<boolean>(fetching)
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

    const tableData: TableData = useMemo(() => {
        if (syllables) {
            return buildTable(syllables)
        } else {
            return []
        }
    },[syllables])

    return [loading, err, syllables, tableData, reload]
}

export default useSyllables