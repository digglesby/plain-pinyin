import { useContext, useEffect, useRef } from "react"
import { SyllableGroup } from "../data/syllables"
import SyllablePlayer from "./syllablePlayer"
import SettingControls from "../settings/settingsControls"
import { Context } from "../state/stateContext"

const syllableGroupModal = () => {

    const ref = useRef<HTMLDialogElement>();
    const {syllables} = useContext(Context)

    useEffect(() => {
        if (syllables.selectedSyllableGroup) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [syllables.selectedSyllableGroup]);


    const Syllables = (syllables.selectedSyllableGroup) ? syllables.selectedSyllableGroup.syllables.map((syllable) => {
        return <SyllablePlayer key={syllable.pinyin_normalized} syllable={syllable} />
    }) : []

    return (
        <dialog
            onClose={ () => syllables.setSelectedSyllableGroup(undefined) }
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
                <div className="syllable-wrapper">
                    {Syllables}
                </div>
                <SettingControls />
            </div>
        </dialog>
    )
}

export default syllableGroupModal