import { ReactNode, useContext, useRef, useState } from "react";
import { Context } from "../state/stateContext";

type Props = {
    isOpen: boolean,
    children: ReactNode
}

const MobileDropdown = (props: Props) => {
    const dropdownRef = useRef<HTMLDivElement>()

    return (
        <div 
            ref={dropdownRef}
            className={`mobile dropdown ${(props.isOpen != null) ? 'open' : ''}`} 
            style={{
                height: (props.isOpen) ? dropdownRef.current?.scrollHeight : null
            }}
        >
            {props.children}
        </div>
    )
}

export default MobileDropdown