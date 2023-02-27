import React, { useState, createContext, useContext } from "react";
import axios from "axios";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true); // Waiting

  const [loading, setloading] = useState(false); // Loading

  const [questions, setQuestions] = useState([]); // Questions
  const [index, setIndex] = useState(0); // index
  const [correct, setCorrect] = useState(0); // Correct
  const [error, setError] = useState(false); // error
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  }); // quiz

  const [modal, setModal] = useState(false);

  // fetch Data
  const fetchQuestions = async (url) => {
    setloading(true);
    setWaiting(false);
    const response = await axios(url).catch((error) => console.log(error));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setloading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setloading(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setWaiting(true);
    setCorrect(0);
  };

  const nextQuestions = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswers = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestions();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, difficulty, category } = quiz;
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        modal,
        nextQuestions,
        checkAnswers,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => {
  return useContext(AppContext);
};
