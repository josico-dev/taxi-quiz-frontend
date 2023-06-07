import React from 'react';
import Question from './Question';
import Loading from './Loading';
import Results from './Results';
import ExitButton from './ExitButton';

function RandomQuestion(props) {

    const [question, setQuestion] = React.useState({});
    const [index, setIndex] = React.useState(0);
    const [passed, setPassed] = React.useState(0);
    const [failed, setFailed] = React.useState(0);
    const [skiped, setSkiped] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [questions_results, setQuestionsResults] = React.useState([]);
    const [isFinished, setIsFinished] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        fetch('https://aptitud-taxi-algeciras.azurewebsites.net/questions/random')
            .then(response => response.json())
            .then(data => {
                setQuestion(data)
                setIsLoading(false);
            });
    }, [index]);

    const uploadQuestionAnswer = (question) => {
        setQuestionsResults([...questions_results, question]);
    }


    const incrementIndex = () => {
        setIndex(index + 1);
    }

    const incrementPassed = () => {
        setPassed(passed + 1);
    }

    const incrementFailed = () => {
        setFailed(failed + 1);
    }

    const incrementSkiped = () => {
        setSkiped(skiped + 1);
    }

    const finishExam = () => {
        setIsFinished(true);
    }

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (isFinished) {
        return (
            <Results questionsResults={questions_results} passed={passed} failed={failed} skiped={skiped} total={skiped+passed+failed} />
        );
    }

    return (
        <div>
            <ExitButton finishExam={finishExam} />

            <Question question={question} incrementIndex={incrementIndex} setQuestionsResults={uploadQuestionAnswer} incrementPassed={incrementPassed} incrementFailed={incrementFailed} incrementSkiped={incrementSkiped} style={{ m: 3 }} />
        </div>
    );
}

export default RandomQuestion;