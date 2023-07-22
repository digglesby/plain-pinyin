import { useEffect, useRef } from "react"
import { SyllableGroup } from "../data/syllables"
import SyllablePlayer from "./syllablePlayer"
import SettingControls from "../settings/settingsControls"

type Props = {
    syllableGroup?: SyllableGroup
    setSyllableGroup: (newVal: undefined | SyllableGroup) => void
}

const syllableGroupModal = (props: Props) => {

    const ref = useRef<HTMLDialogElement>();


    useEffect(() => {
        if (props.syllableGroup) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.syllableGroup]);


    const Syllables = (props.syllableGroup) ? props.syllableGroup.syllables.map((syllable) => {
        return <SyllablePlayer syllable={syllable} />
    }) : []


    return (
        <dialog
            onClose={() => { props.setSyllableGroup(undefined)}}
            ref={ref}
            onClick={(e) => {
              const dialogDimensions = ref.current.getBoundingClientRect();
              if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
              ) {
                ref.current.close();
              }
            }}
        >
            {Syllables}
            <SettingControls />
        </dialog>
    )
}

export default syllableGroupModal