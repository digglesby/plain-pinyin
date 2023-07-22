import Head from 'next/head';
import useSyllables from '../data/useSyllables';
import { useMemo } from 'react';
import buildTable, { TableData } from '../data/buildTable';
import TopHeader from './TopHeader';
import { SyllableGroup } from '../data/syllables';

type Props = {
    setSyllableGroup: (newVal: undefined | SyllableGroup) => void
}

function PinyinTable(props: Props) {

    const [isLoading, error, syllables, reload] = useSyllables()

    const tableData: TableData = useMemo(() => {
        if (syllables) {
            return buildTable(syllables)
        } else {
            return []
        }
    },[syllables])

    if ((syllables !== null) && (!isLoading)) {

        const Rows = tableData.map((row, i)=> {

            const Cells = row.map((cell, p) => {

                let thisCell = null
                
                if (cell === null) {
                    thisCell = <td key={`col${i}${p}`}>{(i == 0 && p == 0) ? '🀄' : ''}</td>
                } else if (typeof(cell) === 'string') {
                    thisCell = <th key={`col${i}${p}`}>{cell}</th>
                } else {
                    thisCell = <td key={`col${i}${p}`}>
                        <a onClick={() => props.setSyllableGroup(cell)} href={`#${cell.pinyin_normalized}`}>
                            {cell.pinyin}
                        </a>
                    </td>
                }

                return thisCell
            })

            const thisRow = <tr key={`row${i}`}>{Cells}</tr>

            return thisRow
        })

        return (
            <div className='table-container'>
                <div className='main-table-wrapper'>
                    <TopHeader>
                        {Rows}
                    </TopHeader>
                </div>
                <table className='left-header'>
                    <tbody>
                        {Rows}
                    </tbody>
                </table>
            </div>

        );
    }

    return <h1>WAT</h1>
}

export default PinyinTable