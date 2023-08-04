import { useContext } from 'react';
import TopHeader from './TopHeader';
import { SyllableGroup } from '../data/syllables';
import { Context } from '../state/stateContext';
import PinyinCell from './PinyinCell';

function PinyinTable() {
    const {syllables} = useContext(Context)

    if (!syllables.loading) {

        const Rows = syllables.tableData.map((row, i)=> {

            const Cells = row.map((cell, p) => {
                return <PinyinCell
                    cellData={cell}
                    row={i}
                    column={p}
                    key={`cell${i}${p}`}
                    setSyllableGroup={syllables.setSelectedSyllableGroup}
                />
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