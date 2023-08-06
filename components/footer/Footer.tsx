const Footer = () => {

    return (
        <footer>
            <nav className="container">
                <ul>
                    <li>
                        <a href='https://github.com/digglesby/pinyin'>View Source on Github</a>
                    </li>
                </ul>
                <p>Made with ♥ by <a href='https://mastodon.sdf.org/@digglesby'>@digglesby</a></p>
                <p className="ccnotice">Copyright © {new Date().getFullYear()} All Rights Reserved</p>
            </nav>
        </footer>
    )
}

export default Footer