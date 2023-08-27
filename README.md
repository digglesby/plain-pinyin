# Plain Pinyin

[Plain Pinyin](https://www.plainpinyin.com) is a Next.js web app designed to help users learn the pronunciation and tones of Mandarin Chinese through an interactive Pinyin chart.

I created Plain Pinyin because all of the free Pinyin charts I found online didn’t offer a quiz feature and those that did were locked behind a paywall. 

Plain Pinyin is open source and provided free without ads.

## About Pinyin Charts

Pinyin is a phonetic system for transcribing the Mandarin pronunciations of Chinese characters into the Latin alphabet. A Pinyin chart includes all the possible sounds in Mandarin Chinese.

The chart is divided into initials (consonants) and finals (vowels or vowel groups). The tones, which can change the meaning of a word, are indicated by marks above the vowels. Mandarin Chinese has five tones:

1. First tone: a high, level tone (represented with a flat line, e.g., ā)
2. Second tone: a rising tone (represented with an upward sloping line, e.g., á)
3. Third tone: a dipping tone (represented with a v-shaped line, e.g., ǎ)
4. Fourth tone: a falling tone (represented with a downward sloping line, e.g., à)
5. Fifth tone: no tone (represented with no line, e.g., a)

This application provides an interactive way to learn the pronunication of tones and syllables, providing a solid foundation for learning Mandarin.

## Features

- Interactive Pinyin chart
- Audio pronunciation for each Pinyin
- Traditional and simplified example characters
- Practice quizes to reinforce learning

## Contributing

All contributions are welcome! 

For code contributions please see the [issues](https://github.com/digglesby/pinyin/issues) on our GitHub repo to work on, or create a new issue if you've found a bug or have a feature request.

To contribute audio/pronunications please upload your sound files directly to the relevant tone directory in `public/sounds` as part of a pull request, or email me with them at thedude@digglesby.com if you aren't super familiar with git.

### Getting Started

First, clone the repository:

```bash
git clone https://github.com/digglesby/plain-pinyin.git
```

Then, install the dependencies:

```bash
yarn install
```

### Running the Website Locally

To run the application in development mode:

```bash
yarn run dev
```

To build and export the application for production:

```bash
yarn run build
```

To start the application in production mode:

```bash
yarn run start
```

To build the syllable data file:

```bash
yarn run build-syllables
```

## License

Unless otherwise noted this project is licensed under the terms of the MIT license. 

davinfifield.mp3 sound files provided by https://github.com/davinfifield/mp3-chinese-pinyin-sound

## Contact

If you have any questions, please reach out to Curtis Ward at thedude@digglesby.com.