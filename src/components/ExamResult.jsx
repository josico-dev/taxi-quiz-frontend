import React from 'react';

function ExamResult(props) {
    return (
        <div>
            <h1>Exam Results</h1>
            <h2>Passed: {props.passed}</h2>
            <h2>Failed: {props.total - props.passed}</h2>
        </div>
    );
}

export default ExamResult;