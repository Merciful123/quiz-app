import React from "react";
import "./index.css";
import { useGlobalContext } from "../../context/Context";

const QuizForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <section className="quiz quiz-small">
      <form className="setup-form">
        <h2> setup quiz</h2>
        <p>
          Only one question will be shown at a time. There is no option to
          change attempted answer. At right corner correct answer and number of
          attempted questions will be shown.
        </p>
        <div className="form-control">
          <label htmlFor="amount">number of questions</label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="form-input"
            value={quiz.amount}
            onChange={handleChange}
            min={1}
            max={50}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            className="form-input"
            value={quiz.category}
            onChange={handleChange}
          >
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            className="form-input"
            value={quiz.difficulty}
            onChange={handleChange}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="difficult">difficult</option>
          </select>
        </div>
        {error ? (
          <p className="error">can't generate questions, please try again!</p>
        ) : (
          ""
        )}
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          start the quiz
        </button>
      </form>
    </section>
  );
};
export default QuizForm;
