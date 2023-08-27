import { useContext, useMemo, useState } from 'react';
import TopHeader from './TopHeader';
import { SyllableGroup } from '../data/syllables';
import { Context } from '../state/stateContext';
import PinyinCell from './PinyinCell';
import LeftHeader from './LeftHeader';

function PinyinTable() {
    const {syllables} = useContext(Context)
    const [hoveredSyllableGroup, setHoveredSyllableGroup] = useState<SyllableGroup | null>(null)

    const [selectedRow, selectedColumn] = useMemo(() => {

        let vowel = null
        let consonant = null

        if (syllables.selectedSyllableGroup) {
            vowel = syllables.selectedSyllableGroup.vowel
            consonant = syllables.selectedSyllableGroup.consonant
        } else if (hoveredSyllableGroup) {
            vowel = hoveredSyllableGroup.vowel
            consonant = hoveredSyllableGroup.consonant
        }
        
        if ((vowel) && (consonant)) {
            for (let i = 0; i < syllables.tableData.length; i++) {
                const row = syllables.tableData[i];
                
                for (let p = 0; p < row.length; p++) {
                    const cell = row[p];
                    
                    if ((cell != null) && (typeof(cell) !== 'string')) {
                        if (
                            (cell.consonant === consonant) && 
                            (cell.vowel === vowel)
                        ) {
                            return [i, p]
                        }
                    }
                }
            }
        }

        return [null, null]
    }, [JSON.stringify(syllables.tableData), syllables.selectedSyllableGroup, hoveredSyllableGroup])

    if (syllables.err) {

        return (<div className='table-container error'>
            <h1>Failed to Load Pinyin Chart!</h1>
            <button onClick={syllables.reload}>Retry</button>
        </div>)
    
    } else if ((!syllables.syllables) || (syllables.syllables.syllableArray.length === 0)) {

        return (
            <div className='table-container loading' />
        )

    } else {
     
        const Rows = syllables.tableData.map((row, i)=> {

            const Cells = row.map((cell, p) => {
                return <PinyinCell
                    cellData={cell}
                    row={i}
                    column={p}
                    selectedRow={selectedRow}
                    selectedColumn={selectedColumn}
                    key={`cell-${i}-${p}`}
                    setSyllableGroup={syllables.setSelectedSyllableGroup}
                    setHoveredSyllable={setHoveredSyllableGroup}
                />
            })

            const thisRow = <tr key={`row${i}`}>{Cells}</tr>

            return thisRow
        })

        return (
            <div className='table-container'>
                <div className='main-table-wrapper'>
                    <TopHeader
                        rows={Rows}
                    >
                        <table className='top-table'>
                            <tbody>
                                {Rows}
                            </tbody>
                        </table>
                    </TopHeader>
                </div>
                <LeftHeader
                    rows={Rows}
                />
            </div>

        );

    }
}

export default PinyinTable