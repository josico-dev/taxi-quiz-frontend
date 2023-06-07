import React from 'react';
import Question from './Question';
import ExamResult from './ExamResult';
import ConfigExam from './ConfigExam';
import Loading from './Loading';

function Exam(props) {

    const [questions, setQuestions] = React.useState([]);
    const [ready, setReady] = React.useState(false); // TODO: change to true when the user clicks on the button
    const [index, setIndex] = React.useState(0);
    const [passed, setPassed] = React.useState(0);
    const [failed, setFailed] = React.useState(0);

    React.useEffect(() => {
        fetch('https://aptitud-taxi-algeciras.azurewebsites.net/exam/?n_questions=' + (props.n_questions ? props.n_questions : 10))
            .then(response => response.json())
            .then(data => { setQuestions(data) })
            .catch(error => console.log(error));
    }, [ready]);

    const incrementPassed = () => {
        setPassed(passed + 1);
    }

    const incrementFailed = () => {
        setFailed(failed + 1);
    }

    const incrementIndex = () => {
        setIndex(index + 1);
    }

    if (questions.length === 0) {
        return <Loading />;
    }

    return (
        <div>
            {!ready ?  <ConfigExam setReady={setReady}/> : null}
            {((index < questions.length && ready === true) ? <Question question={questions[index]} incrementPassed={incrementPassed} incrementFailed={incrementFailed} incrementIndex={incrementIndex} style={{ m: 3, display: 'flex' }} /> : null)}
            {((index === questions.length && ready === true) ? <ExamResult passed={passed} total={questions.length} /> : null)}
        </div>
    );
}

export default Exam;