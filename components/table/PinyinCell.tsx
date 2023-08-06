import { SyllableGroup } from "../data/syllables"

type Props = {
    cellData: null | string | SyllableGroup,
    row: number,
    column: number,
    setSyllableGroup: (v: SyllableGroup) => void,
}

const PinyinCell = (props: Props) => {
               
    if (props.cellData === null) {

        return <td>{(props.row == 0 && props.column == 0) ? '🀄' : ''}</td>
    }
    
    if (typeof(props.cellData) === 'string') {

        return <th>{props.cellData}</th>
    }
    
    return (
        <td>
            <a 
                onClick={() => props.setSyllableGroup(props.cellData as SyllableGroup)} 
                href={`#${props.cellData.pinyin_normalized}`}
            >
                {props.cellData.pinyin}
            </a>
        </td>
    )
}

export default PinyinCell