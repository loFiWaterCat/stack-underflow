import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const QuestionItem = ({ question, author }) => {
  if (!question) {
    return null;
  }

  if (!author) return null;


  return (
    <>
    <li className="questionItem">
      <Link to={`questions/${question.id}`}>{question.title}</Link>
      <p>{author.username}</p>
    </li>
    </>
  )
}

export default QuestionItem;
