import { useState, useEffect } from 'react';
import { useParams, Redirect, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestion , fetchQuestion, createQuestion, updateQuestion} from '../../store/questions';
import { getCurrentUser } from '../../store/session';
import './QuestionForm.scss'

const QuestionForm = () => {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const [errors, setErrors] = useState([]);

  const type = typeof(questionId) === 'string' ? "Update Question" : "Create Question";
  let typeText = "Edit Question";
  if (type === "Create Question") {
    typeText = "Ask a public question"
  }

  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestion(questionId))
    }
  }, [questionId]);

  // Set datafields of the question
  let questionData = useSelector(getQuestion(questionId));
  if (!questionData) {
    questionData = {id: questionId, title: "", body: "", authorId: ''}
  }

  questionData.authorId = useSelector(getCurrentUser()).id

  const [question, setQuestion] = useState(questionData)
  const [questionTitleLength, setQuestionTitleLength] = useState(question.title.length)
  const [questionBodyLength, setQuestionBodyLength] = useState(question.body.length)
  const [valid, setValid] = useState(false)

  let history = useHistory();

  const updateQuestionTitle = e => {
    setQuestion({...question, title: e.target.value});
    setQuestionTitleLength(e.target.value.length)
    if (questionTitleLength >= 3 && questionTitleLength <= 150) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  const updateQuestionBody = e => {
    setQuestion({...question, body: e.target.value});
    setQuestionBodyLength(e.target.value.length)

    if (questionBodyLength >= 3 && questionBodyLength <= 150) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'Create Question') {
      // If res is successful, we go to the show page
      const resNData = await dispatch(createQuestion(question));
      const res = resNData.res;
      const data = resNData.data;
      if (res.ok === true) {
        history.push(`/questions/${data.question.id}`);
      }
    } else {
      dispatch(updateQuestion(question))
      history.push(`/questions/${questionId}`);
    }
  };

  console.log(question)

  return (
    <div id="questionFormPage">
        <h1>{typeText}</h1>
        <div id="questionFormAndGuide">
          <div id="questionFormContainer">
          <form id="questionForm" onSubmit={handleSubmit}>
            <label>Title</label>
              <p>Be specific and imagine you're asking a question to another person</p>
              <p>Characters: {questionTitleLength} (3-150)</p>
              <input id="title" value={question.title} onChange={updateQuestionTitle} />
            <label>Body</label>
              <p>Include all the information someone would need to answer your question</p>
              <p>Characters: {questionBodyLength} (3-150)</p>
              <textarea value={question.body} onChange={updateQuestionBody} />
            <input id="createQuestionButton" disabled={!valid} type={'submit'} value={typeText}/>
          </form>
        </div>
        <div id="questionGuidelines">
          <p className="number-steps">Step 1: Draft your question</p>
          <p className="guideline-text">The community is here to help you with specific coding,
            algorithm, or language problems.
            <br />
            Avoid asking opinion-based questions.
          </p>
          <p className="inner-number-steps">
            <span className="blue-number">1. </span>
            Summarize the problem
          </p>
          <p className="inner-number-steps">
            <span className="blue-number">2. </span>
            Describe what you've tried
          </p>
          <p className="inner-number-steps">
            <span className="blue-number">3. </span>
            Show some code
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuestionForm;
