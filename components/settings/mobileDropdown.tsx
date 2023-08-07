import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Context } from "../state/stateContext";

type Props = {
    isOpen: boolean,
    children: ReactNode
}

const MobileDropdown = (props: Props) => {
    const dropdownRef = useRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | null>(null)

    useEffect(() => {
        if ((props.isOpen) && (dropdownRef.current)){
            setHeight(dropdownRef.current.scrollHeight)
        } else {
            setHeight(null)
        }
    },[dropdownRef.current, props.isOpen])

    return (
        <div 
            ref={dropdownRef}
            className={`mobile dropdown ${(props.isOpen != null) ? 'open' : ''}`} 
            style={{
                height: height
            }}
        >
            {props.children}
        </div>
    )
}

export default MobileDropdown