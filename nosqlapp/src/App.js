import "./App.css";
import QuizIntro from "./components/QuizIntro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizFragen from "./components/QuizFragen";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<QuizIntro />} />
        <Route path={"/quizFragen"} element={<QuizFragen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
