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

  const fragen = doc(db, "NoSqlQuiz", "quiz");
  getDoc(fragen).then((docSnap) => {
    if (docSnap.exists()) {
      if (data === null) {
        setData(docSnap.data());
      }
    }
  });

  async function answer(e, db) {
    console.log(e.currentTarget.innerText);
    console.log(quizNum);
    //   const res = await db.collection("cities").add({
    //     name: "Tokyo",
    //     country: "Japan",
    //   });

    //   console.log("Added document with ID: ", res.id);

    //   console.log("Add: ", res);
    setQuizNum(quizNum + 1);
  }

  //   function answer(e) {

  //     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //     // Add a new document with a generated id.
  //     // const docRef = addDoc(collection(db, "AntwortenQuiz"), {
  //     //   name: "Tokyo",
  //     //   country: "Japan",
  //     // });
  //     // console.log("Document written with ID: ", docRef.id);

  //     const res = db.collection("AntwortenQuiz").add({
  //       name: "Tokyo",
  //       country: "Japan",
  //     });

  //     console.log("Added document with ID: ", res.id);
  //     // updateDoc(doc(db, "AntwortenQuiz", "Antwort"), {
  //     //   Frage1: arrayUnion("HELLO2", "hello2"),
  //     // });

  //     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //   }

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
