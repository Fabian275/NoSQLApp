import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
      // console.log(e.currentTarget.innerText);

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

  // useEffect(() => {
  //   console.log(Answers);
  //   if (docID != null) {
  //     const docRef1 = doc(db, "AntwortenQuiz", docID);

  //     const updatingdata = {
  //       frage1: Answers[0],
  //       frage2: Answers[1],
  //       frage3: Answers[2],
  //     };

  //     setDoc(docRef1, updatingdata, { merge: true })
  //       .then((docRef1) => {
  //         console.log("Entire Document has been updated successfully");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //   }
  // }, [docID]);

  return (
    <div id="quizApp">
      <div>
        <h2>Frage {quizNum}</h2>
      </div>
      <div id="fragenAntworten">
        <h3 id="frage">{data?.questions[quizNum - 1].question}</h3>
      </div>
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
  );
}

export default QuizFragen;
