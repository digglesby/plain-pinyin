import { useEffect, useMemo, useState } from "react"
import { Syllable, SyllableGroup } from "../data/syllables"
import axios from "axios"
import { Consonant } from "../data/consonants"
import { Vowel } from "../data/vowels"
import buildTable, { TableData } from "../data/buildTable"

const useSyllables = (tableData: TableData): [
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

        if (!syllableGroupPinyin) {
            setSelectedSyllableGroup(undefined)
            window.location.hash = ''
            return
        }

        //TODO: Make this an object lookup
        const syllableGroup = tableData.flat().find((cellData) => {

            if ((cellData === null) || (typeof(cellData) === 'string')) {
                return false
            }

            if (cellData.pinyin_normalized !== syllableGroupPinyin){
                return false
            }

            return true
        }) as SyllableGroup

        window.location.hash = syllableGroupPinyin ?? ''

        if (syllableGroup) setSelectedSyllableGroup(syllableGroup)
    },[JSON.stringify(tableData), syllableGroupPinyin])

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