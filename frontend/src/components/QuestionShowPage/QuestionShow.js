import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Answer from './Answer'

const QuestionShow = ({ question, answers }) => {

  let answerArray = Object.values(answers);

  // Count of the answers
  const numAnswers = answerArray.length
  let numAnswersText = "Answer"
  if (numAnswers > 1) {
    numAnswersText = "Answers"
  }

  return (
    <>
    <h2 id='questionTitle'>{question.title}</h2>
    <div>
      <p id='questionBody'> {question.body}</p>
      <p id='answerCount'> {numAnswers} {numAnswersText}</p>
      <ul>
        { answerArray.map( answer => {
              return <Answer key={answer.id} answer={answer} />
              })
        }
      </ul>
    </div>
    </>
  )
}

export default QuestionShow;
