const Answer = ({ answer }) => {

  if (!answer) {
    return null
  }

  return (
    <div className="answer">
      <p className="answerBody">{answer.body}</p>
    </div>
  )

}

export default Answer;
