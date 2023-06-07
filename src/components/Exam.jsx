import React from 'react';
import Question from './Question';
import Results from './Results';
import ConfigExam from './ConfigExam';
import Loading from './Loading';
import ExitButton from './ExitButton';

class Exam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            questions_results: [],
            ready: false, // TODO: change to true when the user clicks on the button
            index: 0,
            passed: 0,
            failed: 0,
            skiped: 0,
            is_finished: false,
        };

        this.n_questions = props.n_questions ? props.n_questions : 10;
    }

    componentDidMount() {
        fetch('https://aptitud-taxi-algeciras.azurewebsites.net/exam/?n_questions=' + this.n_questions)
            .then(response => response.json())
            .then(data => { this.setState({ questions: data }) })
            .catch(error => console.log(error));
    }

    setQuestionsResults = (question) => {
        this.setState(prevState => ({
            questions_results: [...prevState.questions_results, question]
        }));
    }

    incrementIndex = () => {
        this.setState(prevState => ({
            index: prevState.index + 1
        }));
    }

    incrementPassed = () => {
        this.setState(prevState => ({
            passed: prevState.passed + 1
        }));
    }

    incrementFailed = () => {
        this.setState(prevState => ({
            failed: prevState.failed + 1
        }));
    }

    incrementSkiped = () => {
        this.setState(prevState => ({
            skiped: prevState.skiped + 1
        }));
    }

    finishExam = () => {
        this.setState({ is_finished: true });
    }

    render() {
        const { questions, ready, index, passed, failed, skiped, is_finished } = this.state;

        if (questions.length === 0) {
            return <Loading />;
        }

        if (is_finished) {
            return <Results questionsResults={this.state.questions_results} passed={passed} failed={failed} total={questions.length} />;
        }

        if (!ready) {
            return <ConfigExam setReady={() => this.setState({ ready: true })} />;
        }

        if (index < questions.length && ready === true) {
            return (
                <div>
                    <ExitButton finishExam={this.finishExam} />
                    <Question question={questions[index]} incrementPassed={this.incrementPassed} incrementFailed={this.incrementFailed} incrementIndex={this.incrementIndex} setQuestionsResults={this.setQuestionsResults} style={{ m: 3, display: 'flex' }} />
                </div>
            )
        }

        if (index === questions.length && ready === true) {
            return <Results questionsResults={this.state.questions_results} passed={passed} failed={failed} skiped={skiped} total={questions.length} />;
        }
    }
}

export default Exam;
