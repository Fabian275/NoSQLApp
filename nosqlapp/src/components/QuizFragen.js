import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./style/QuizFragen.css";

function QuizFragen({ setDocID }) {
  const [data, setData] = useState(null);
  const [quizNum, setQuizNum] = useState(1);

  const [Answers, setAnswers] = useState([]);
  const [Auswertung, setAuswertung] = useState(false);
  const navigate = useNavigate();
  //daten holen

  const fragen = doc(db, "FragenTest", "quiz");
  getDoc(fragen).then((docSnap) => {
    if (docSnap.exists()) {
      if (data === null) {
        setData(docSnap.data());
      }
    }
  });
  console.log(data);
  //antwort auswählen

  function answer(e) {
    const currentAntwort = e.currentTarget.innerText;
    setAnswers((Answers) => [...Answers, currentAntwort]);
    const quizLength = data.questions.length;
    console.log(quizLength);
    if (quizNum < quizLength) {
      setQuizNum(quizNum + 1);

      console.log(Answers);
    } else {
      setAuswertung(true);
    }
  }
  console.log(Answers);

  //auswertung
  useEffect(() => {
    async function auswertung() {
      const dbRef = collection(db, "AntwortenQuiz");
      if (Auswertung === true) {
        console.log(Answers);
        const startData = {
          antworten: Answers,
        };
        console.log(startData);
        await addDoc(dbRef, startData)
          .then((docRef) => {
            console.log(docRef.id);
            sessionStorage.setItem("QuizID", `${docRef.id}`);
          })
          .catch((error) => {
            console.log(error);
          });
        navigate(`/quizAuswertung`);
      } else {
      }
    }
    auswertung();
  }, [Auswertung]);

  return (
    <div id="quizApp">
      <div>
        <h2>
          Frage {quizNum}/{data?.questions.length}
        </h2>
      </div>
      <div id="fragenAntworten">
        <h3 id="frage">{data?.questions[quizNum - 1].question}</h3>
      </div>
      <div id="questionBox">
        <button className="antworten" onClick={answer}>
          {data?.questions[quizNum - 1].answers[0].option}
        </button>
        <br />
        <br />
        <button className="antworten" onClick={answer}>
          {data?.questions[quizNum - 1].answers[1].option}
        </button>
        <br />
        <br />
        <button className="antworten" onClick={answer}>
          {data?.questions[quizNum - 1].answers[2].option}
        </button>
        <br />
        <br />
        <button className="antworten" onClick={answer}>
          {data?.questions[quizNum - 1].answers[3].option}
        </button>
      </div>
    </div>
  );
}

export default QuizFragen;
