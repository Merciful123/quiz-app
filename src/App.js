import "./App.css";
import QuizForm from "./components/QuizForm";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import { useGlobalContext } from "./context/Context";

const App = () => {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestions,
    checkAnswers,
  } = useGlobalContext();

  if (waiting) {
    return <QuizForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { incorrect_answers, correct_answer, question } = questions[index];

  let answers = [...incorrect_answers];

  const tempIndex = Math.floor(Math.random() * 4);

  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <>
      <main>
        <Modal />
        <section className="quiz">
          {console.log(questions)}
          <p className="correct-answers">
            correct answers: {correct}/{index}
          </p>
          <article className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    className="answer-btn"
                    onClick={() => checkAnswers(correct_answer === answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                );
              })}
            </div>
          </article>
          <button className="next-question" onClick={nextQuestions}>
            next questions
          </button>
        </section>
      </main>
    </>
  );
};

export default App;
