import { ReactNode } from "react"


type Props = {
    rows: ReactNode
}

const LeftHeader = (props: Props) => {
    
    return (
        <table aria-hidden className='left-header'>
            <tbody>
                {props.rows}
            </tbody>
        </table>
    )
}

export default LeftHeader