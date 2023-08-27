import AudioPlayer from "../audioPlayer/audioPlayer"

type Props = {
    audioTrack: string,
    title: string
}

const SyllableAudioTrack = (props: Props) => {

    return (<div className="audio-track">
        <p>
            {props.title}
        </p>
        <AudioPlayer audioTrack={props.audioTrack} />
    </div>)
}

export default SyllableAudioTrack