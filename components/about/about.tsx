const About = () => {

    return (
        <article className="about">
            <div>
                <h2>What is SimplePinyin?</h2>
                <p>Simple Pinyin is an interactive Pinyin chart I made to practice identifying tones in Mandarin. 
                    I created it because all of the free Pinyin charts I found online didn’t offer a quiz feature and those that did were locked behind a paywall. 
                    Simple Pinyin is provided free without ads.
                </p>
            </div>
            <div>
                <h2>Are you trying to sell me a course?</h2>
                <p>No. I made this primarily for me to use as a tool to learn Pinyin. I'm not a native speaker and don't know enough to teach anyone anything about Mandarin.</p>
            </div>
            <div>
                <h2>How do you know this chart is accurate?</h2>
                <p>I don't! If you find an issue, or a missing pronunciation feel free to <a href='https://github.com/digglesby/pinyin/issues'>drop me an issue on Github</a></p>
            </div>
            <div>
                <h2>How can I help make this tool better?</h2>
                <p>The <a href='https://github.com/digglesby/pinyin'>source code</a> for this website is available on Github and PRs are welcome! 
                    If you want to help contribute pronunciations to the chart, and aren't super familar with Github feel free to email me at <a href='mailto:thedude@idgglesby.com'>thedude@digglesby.com</a>
                </p>
            </div>
        </article>
    )
}

export default About