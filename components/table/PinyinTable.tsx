import { useContext } from 'react';
import TopHeader from './TopHeader';
import { SyllableGroup } from '../data/syllables';
import { Context } from '../state/stateContext';
import PinyinCell from './PinyinCell';
import LeftHeader from './LeftHeader';

function PinyinTable() {
    const {syllables} = useContext(Context)

    if (syllables.loading) {

        return (
            <div className='table-container loading' />
        )

    } if (syllables.err) {

        return (<div className='table-container error'>
            <h1>Failed to Load Pinyin Chart!</h1>
            <button onClick={syllables.reload}>Retry</button>
        </div>)
        
    } else {
     
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