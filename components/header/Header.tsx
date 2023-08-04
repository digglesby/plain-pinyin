import { useState } from "react"
import PickRandomButton from "../pickRandomButton/pickRandomButton"


const Header = () => {

    const [isOpen, setIsOpen] = useState(false)    

    return (
        <header>
            <a>Simple Pinyin</a>
            <nav className={`dropdown${(isOpen) ? ' open' : ''}`}>
                <button onClick={() => setIsOpen((val) => !val)}>
                    {
                        (!isOpen) ? 
                        <span className="material-symbols-outlined">expand_more</span> : 
                        <span className="material-symbols-outlined">expand_less</span>
                    }
                </button>
                <ul>
                    <li>
                        <a>About</a>
                    </li>
                    <li>
                        <PickRandomButton />
                    </li>
                    <li>
                        <button>Quiz Me</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header