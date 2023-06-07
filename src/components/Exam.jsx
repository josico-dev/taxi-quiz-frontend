import React, { useState, useEffect } from 'react';
import Question from './Question';
import Results from './Results';
import ConfigExam from './ConfigExam';
import Loading from './Loading';
import ExitButton from './ExitButton';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [questionsResults, setQuestionsResults] = useState([]);
    const [ready, setReady] = useState(false);
    const [index, setIndex] = useState(0);
    const [passed, setPassed] = useState(0);
    const [failed, setFailed] = useState(0);
    const [skiped, setSkiped] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [nQuestions, setNQuestions] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://aptitud-taxi-algeciras.azurewebsites.net/exam/?n_questions=${nQuestions}`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data)
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [nQuestions]);

    const incrementIndex = () => {
        setIndex(prevIndex => prevIndex + 1);
    };

    const incrementPassed = () => {
        setPassed(prevPassed => prevPassed + 1);
    };

    const incrementFailed = () => {
        setFailed(prevFailed => prevFailed + 1);
    };

    const incrementSkiped = () => {
        setSkiped(prevSkiped => prevSkiped + 1);
    };

    const finishExam = () => {
        setIsFinished(true);
    };

    const setQuestionResult = (questionResults) => {
        setQuestionsResults(prevQuestionsResults => [...prevQuestionsResults, questionResults]);
    };

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (questions.length === 0) {
        return <Loading />;
    }

    if (isFinished) {
        return <Results questionsResults={questionsResults} passed={passed} failed={failed} total={questions.length} />;
    }

    if (!ready) {
        return <ConfigExam setNQuestions={setNQuestions} setReady={() => setReady(true)} />;
    }

    if (index < questions.length && ready === true) {
        return (
            <div>
                <ExitButton finishExam={finishExam} />
                <Question
                    question={questions[index]}
                    incrementPassed={incrementPassed}
                    incrementFailed={incrementFailed}
                    incrementIndex={incrementIndex}
                    incrementSkiped={incrementSkiped}
                    setQuestionResult={setQuestionResult}
                    style={{ margin: 3, display: 'flex' }}
                />
            </div>
        );
    }

    if (index === questions.length && ready === true) {
        return <Results questionsResults={questionsResults} passed={passed} failed={failed} skiped={skiped} total={questions.length} />;
    }
};

export default Exam;
