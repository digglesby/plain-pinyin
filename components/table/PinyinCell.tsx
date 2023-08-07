import { SyllableGroup } from "../data/syllables"

type Props = {
    cellData: null | string | SyllableGroup,
    row: number,
    column: number,
    selectedRow: number | null,
    selectedColumn: number | null,
    setSyllableGroup: (v: SyllableGroup) => void,
    setHoveredSyllable: (v: SyllableGroup | null) => void
}

const PinyinCell = (props: Props) => {

    const classes: string[] = []

    if ((props.selectedRow != null) && (props.selectedColumn != null)) {
        if ((props.selectedRow == props.row) && (props.selectedColumn >= props.column)) {
            classes.push('row-selected')
        }

        if ((props.selectedColumn == props.column) && (props.selectedRow >= props.row)) {
            classes.push('column-selected')
        }
    }
        
    if (props.cellData === null) {

        if ((props.row == 0 && props.column == 0)) {
            //Top left cell
            return <td className={classes.join(' ')}>🀄</td>
        } else {
            //Empty cell
            return <td className={classes.join(' ')}></td>
        }
        
    } else if (typeof(props.cellData) === 'string') {
        
        if (props.row == 0) {
            //Top Header
            return <th className={classes.join(' ')}>{props.cellData}</th>
        } else if (props.column == 0) {
            //Side Header
            return <th className={classes.join(' ')}>{props.cellData}</th>
        } else {
            throw new Error('Got string for non-header table cell')
        }

    } else {

        // Syllable Button Cell
        return (
            <td className={classes.join(' ')}>
                <a 
                    onClick={() => props.setSyllableGroup(props.cellData as SyllableGroup)}
                    onMouseEnter={() => {props.setHoveredSyllable(props.cellData as SyllableGroup)}}
                    onMouseLeave={() => {props.setHoveredSyllable(null)}}
                    href={`#${props.cellData.pinyin_normalized}`}
                >
                    {props.cellData.pinyin}
                </a>
            </td>
        )
    }
}

export default PinyinCell