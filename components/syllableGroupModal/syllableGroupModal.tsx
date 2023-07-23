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
            onClose={(e) => { console.log('onClose', e); props.setSyllableGroup(undefined) }}
            onSubmit={(e) => { console.log('onSubmit', e) }}
            onCancel={(e) => { console.log('onCancel', e) }}
            onInput={(e) => { console.log('onInput', e)}}
            ref={ref}
            onClick={(e) => {

                if (e.screenX === 0 && e.screenY === 0) {
                    // event not triggered from the screen.
                    e.preventDefault()
                    return
                }

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
            <div>
                <button className="close-button" onClick={() => ref.current.close()}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                {Syllables}
                <SettingControls />
            </div>
        </dialog>
    )
}

export default syllableGroupModal