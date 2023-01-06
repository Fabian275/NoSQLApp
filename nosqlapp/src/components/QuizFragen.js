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

function QuizFragen() {
  const [data, setData] = useState(null);
  const [quizNum, setQuizNum] = useState(0);
  const [docID, setDocID] = useState(null);

  const fragen = doc(db, "NoSqlQuiz", "quiz");
  getDoc(fragen).then((docSnap) => {
    if (docSnap.exists()) {
      if (data === null) {
        setData(docSnap.data());
      }
    }
  });

  function answer(e) {
    console.log(e.currentTarget.innerText);
    console.log(quizNum);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Add a new document with a generated id.
    const dbRef = collection(db, "AntwortenQuiz");
    const data = {
      frage1: null,
      frage2: null,
      frage3: null,
    };

    addDoc(dbRef, data)
      .then((docRef) => {
        console.log(docRef.id);
        setDocID(docRef.id);
      })
      .catch((error) => {
        console.log(error);
      });

    // const docRef1 = doc(db, "AntwortenQuiz", docID);

    // const updatingdata = {
    //   frage1: e.currentTarget.innerText,
    //   frage2: "British Columbia",
    //   frage3: "CA",
    // };

    // setDoc(docRef1, updatingdata)
    //   .then((docRef1) => {
    //     console.log("Entire Document has been updated successfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setQuizNum(quizNum + 1);
  }

  return (
    <div id="quizApp">
      <div>
        <h2>Frage {quizNum + 1}</h2>
      </div>
      <div id="fragenAntworten">
        <h3 id="frage">{data?.questions[quizNum].question}</h3>
      </div>
      <button className="antworten" onClick={answer}>
        {data?.questions[quizNum].answers[0].option}
      </button>
      <br />
      <br />
      <button className="antworten" onClick={answer}>
        {data?.questions[quizNum].answers[1].option}
      </button>
      <br />
      <br />
      <button className="antworten" onClick={answer}>
        {data?.questions[quizNum].answers[2].option}
      </button>
    </div>
  );
}

export default QuizFragen;
