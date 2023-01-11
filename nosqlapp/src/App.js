import "./App.css";
import QuizIntro from "./components/QuizIntro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizFragen from "./components/QuizFragen";
import { useEffect, useState } from "react";
import QuizAuswertung from "./components/QuizAuswertung";
import AdminPage from "./components/AdminPage";
function App() {
  return (
    <div id="everyPage">
      <BrowserRouter>
        <Routes>
          <Route index element={<QuizIntro />} />
          <Route path={"/quizFragen"} element={<QuizFragen />} />
          <Route path={"/quizAuswertung"} element={<QuizAuswertung />} />
          <Route path={"/quizAdmin"} element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
