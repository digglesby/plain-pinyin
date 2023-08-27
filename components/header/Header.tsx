import { useState } from "react"
import PickRandomButton from "../pickRandomButton/pickRandomButton"
import QuizButton from "../quizButton/quizButton"


const Header = () => {

    const [isOpen, setIsOpen] = useState(false)    

    return (
        <header>
            <a href='/'>🀄 Plain Pinyin</a>
            <nav className={`dropdown${(isOpen) ? ' open' : ''}`}>
                <button onClick={() => setIsOpen((val) => !val)}>
                    {
                        (!isOpen) ? 
                        <span className="material-symbols-outlined">menu</span> : 
                        <span className="material-symbols-outlined">expand_less</span>
                    }
                </button>
                <ul>
                    <li>
                        <a href='#about'>About</a>
                    </li>
                    <li>
                        <PickRandomButton />
                    </li>
                    <li>
                        <QuizButton />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header