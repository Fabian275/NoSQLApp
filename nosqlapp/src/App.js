import "./App.css";
import QuizIntro from "./components/QuizIntro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizFragen from "./components/QuizFragen";
import { useEffect, useState } from "react";
import QuizAuswertung from "./components/QuizAuswertung";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<QuizIntro />} />
        <Route path={"/quizFragen"} element={<QuizFragen />} />
        <Route path={"/quizAuswertung"} element={<QuizAuswertung />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
