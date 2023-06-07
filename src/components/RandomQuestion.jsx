import React from 'react';
import Question from './Question';
import Loading from './Loading';

function RandomQuestion(props) {

    const [question, setQuestion] = React.useState({});
    const [passed, setPassed] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    const [failed, setFailed] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        fetch('https://aptitud-taxi-algeciras.azurewebsites.net/questions/random')
            .then(response => response.json())
            .then(data => {
                setQuestion(data)
                setIsLoading(false);
            });
    }, [index]);

    const incrementPassed = () => {
        setPassed(passed + 1);
    }

    const incrementIndex = () => {
        setIndex(index + 1);
    }

    const incrementFailed = () => {
        setFailed(failed + 1);
    }

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <div>
            <Question question={question} incrementIndex={incrementIndex} incrementPassed={incrementPassed} incrementFailed={incrementFailed} style={{ m: 3 }} />
        </div>
    );
}

export default RandomQuestion;