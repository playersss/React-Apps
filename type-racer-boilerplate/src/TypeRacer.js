import React from 'react';

export default class TypeRacer extends React.Component {

    constructor(props) {
        super(props);
        //intialize state.
        this.state = {
            wordsArray: [],
            enteredWord: "",
            matchIndex: 0,
            displayArray: [],
            highlightArray: [],
            wrongWords: 0,
            raceCompleteMessage: "",
            wpm: 0,
            timer: "02:30",
            randomText: "Hi this is demo. It's been a while."
        };

        //saving all alowed char codes in an array.
        var keyCodeList = [32], i;
        for (i = 48; i <= 90; i++) {
            keyCodeList.push(i);
        }
        for (i = 96; i <= 111; i++) {
            keyCodeList.push(i);
        }
        for (i = 186; i <= 222; i++) {
            keyCodeList.push(i);
        }
        this.keyCodeList = keyCodeList;

        //set timer variable to null initially.
        this.timeOut = null;

        //binding the methods.
        this.resetRace = this.resetRace.bind(this);
        this.timerCountDown = this.timerCountDown.bind(this);
        this.compareTextOnChange = this.compareTextOnChange.bind(this);
    }

    // component did mount. fetching random text from api.
    componentDidMount() {
        this.fetchTextFromRandomApi();
    }

    //fetching random text from api if found then set value else put default value.
    fetchTextFromRandomApi() {
        fetch('http://www.randomtext.me/api/')
            .then(result => result.json())
            .then(body => {
                if (body.text_out) {
                    this.breakSentencesIntoWords(body.text_out.replace(/<(.|\n)*?>/g, ''), " ");
                }
                else {
                    this.breakSentencesIntoWords(this.state.randomText, " ");
                }
            })
            .catch((error) => {
                console.log(error);
        this.breakSentencesIntoWords(this.state.randomText, " ");
        });
    }

    //reset all values to initial state values for next race.
    resetRace() {
        this.timeOut = null;
        this.setState({
            wordsArray: [],
            enteredWord: "",
            matchIndex: 0,
            displayArray: [],
            highlightArray: [],
            wrongWords: 0,
            wpm: 0,
            timer: "02:30",
            raceCompleteMessage: "",
            randomText: "Hi this is demo. It's been a while."
        }, () => {
            this.fetchTextFromRandomApi();
        });
    }

    //breaking sentence received into array of words and array of characters.
    breakSentencesIntoWords(sentence, splitBy) {
        if (sentence.length) {
            let wordsArray = sentence.split(splitBy);
            let displayArray = sentence.split('');
            this.setState({
                wordsArray,
                displayArray,
                highlightArray: Array(displayArray.length).fill("")
            }, () => {
                this.timerCountDown();
            });
        }
    }

    //timer that will run till count down.
    timerCountDown() {
        this.timeOut = setInterval(() => {
            if (this.state.timer === "00:00") {
                clearInterval(this.timeOut);
            } else {
                let myTime = this.state.timer.split(":");
                let minutes = parseInt(myTime[0], 10);
                let seconds = parseInt(myTime[1], 10);
                if (seconds > 0) {
                    seconds--;
                    if (seconds === 0 && minutes > 0) {
                        minutes--;
                        seconds = 59;
                    }
                }
                if (seconds === 0 && minutes > 0) {
                    minutes--;
                    seconds = 59;
                }
                minutes += "";
                seconds += "";
                if (minutes.length !== 2) {
                    minutes = "0" + minutes;
                }
                if (seconds.length !== 2) {
                    seconds = "0" + seconds;
                }
                let timer = minutes + ":" + seconds;
                this.setState({
                    timer
                });
            }
        }, 1000);
    }

    // saving value of allowed char in state and highlighting based on condition match.
    compareTextOnChange(event) {

        let highlightArray = this.state.highlightArray, wrongWords = this.state.wrongWords, matchIndex = this.state.matchIndex;

        //checking if backpace or delete is pressed and removing highlight for entered wrong words.
        if ((event.keyCode === 8 || event.keyCode === 46) && (wrongWords > 0 || this.state.enteredWord.length > 0)) {
            highlightArray[this.state.matchIndex - 1] = "";
            if (wrongWords > 0) {
                wrongWords--;
                matchIndex--;
            }
            this.setState({
                highlightArray,
                matchIndex,
                wrongWords,
                enteredWord: this.state.enteredWord.substring(0, this.state.enteredWord.length - 1)
            });
        } else if (this.keyCodeList.includes(event.keyCode)) {  //checking if allowed chars are entered.
            let doSetState = true, wordsArray;

            //checking if word is complete or not.
            if (event.key === " ") {

                //checking if word to be matched is the word entered then emptying the textbox.
                if (this.state.wordsArray[0] === this.state.enteredWord) {
                    doSetState = false;
                    wordsArray = this.state.wordsArray;
                    highlightArray[this.state.matchIndex] = "highlight-green";
                    matchIndex++;
                    wordsArray.splice(0, 1);
                    this.setState({
                        enteredWord: "",
                        highlightArray,
                        matchIndex
                    });
                }
            }
            if (doSetState) {

                //checking if char entered is present as per sentence sequence or not.
                if (this.state.displayArray[matchIndex] === event.key && !wrongWords) {
                    highlightArray[matchIndex] = "highlight-green";
                } else {
                    wrongWords++;
                    highlightArray[matchIndex] = "highlight-red";
                }
                matchIndex++;

                this.setState({
                    enteredWord: this.state.enteredWord + event.key,
                    highlightArray,
                    wrongWords,
                    matchIndex
                }, () => {
                    if (this.state.matchIndex === this.state.displayArray.length && !this.state.wrongWords) {
                        clearInterval(this.timeOut);
                        this.setState({
                            raceCompleteMessage: "You have completed the race.",
                            enteredWord: ""
                        });
                    }
                });
            }
        }

    }

    // render method that renders the random text button and count.
    render() {

        let wrongInputClass = "";

        return <div>
            <div className="row row-margin">
                <div className="col-md-3 col-lg-3"></div>
                <div className="col-md-6 col-lg-6">
                    <h2>Type Racer</h2>
                </div>
                <div className="col-md-3 col-lg-3"></div>
            </div>
            <div className="row row-margin">
                <div className="col-md-3 col-lg-3"></div>
                <div className="col-md-6 col-lg-6">
                    {this.state.displayArray.map((words, index) => {
                        if (this.state.highlightArray[index] === "highlight-red") {
                            wrongInputClass = "highlight-red";
                        }
                        return <span
                            key={words + Math.random()}
                            className={this.state.highlightArray[index]}
                        >
                            {words}
                        </span>;
                    })}
                    <span className="pull-right">{this.state.timer}</span>
                </div>
                <div className="col-md-3 col-lg-3"></div>
            </div>
            <div className="row row-margin">
                <div className="col-md-3 col-lg-3"></div>
                <div className="col-md-6 col-lg-6">
                    <input
                        type="text"
                        className={"form-control " + wrongInputClass}
                        value={this.state.enteredWord}
                        onChange={() => { }}
                        disabled={this.state.raceCompleteMessage !== "" || this.state.timer === "00:00"}
                        onKeyDown={this.compareTextOnChange}
                    />
                </div>
                <div className="col-md-3 col-lg-3"></div>
            </div>
            <div className="row row-margin">
                <div className="col-md-3 col-lg-3"></div>
                <div className="col-md-6 col-lg-6">
                    <span>
                        {this.state.raceCompleteMessage}
                        {
                            this.state.timer === "00:00" ?
                                "Race over due to timeout"
                                : ""
                        }
                    </span>
                </div>
                <div className="col-md-3 col-lg-3"></div>
            </div>
            <div className="row row-margin">
                <div className="col-md-3 col-lg-3"></div>
                <div className="col-md-6 col-lg-6">
                    {
                        this.state.raceCompleteMessage !== "" || this.state.timer === "00:00" ?
                            <button
                                className="btn btn-primary"
                                onClick={this.resetRace}
                            >
                                Race Again
                </button>
                            : ""
                    }
                </div>
                <div className="col-md-3 col-lg-3"></div>
            </div>
        </div>;
    }
}