import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const QuestionItem = ({ question }) => {
  if (QuestionItem === null) {
    return null;
  }

  return (
    <>
    <li className="questionItem">
      <Link to={`questions/${question.id}`}>{question.title}</Link>
    </li>
    </>
  )
}

export default QuestionItem;
