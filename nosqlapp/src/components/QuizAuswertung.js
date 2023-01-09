import { useState } from "react";
import { db } from "./../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function QuizAuswertung({ docID }) {
  const [AuswertungData, setAuswertungData] = useState(null);
  const [data, setData] = useState(null);

  const auswertung = doc(db, "AntwortenQuiz", `${sessionStorage.QuizID}`);
  getDoc(auswertung).then((docSnap) => {
    if (docSnap.exists()) {
      if (AuswertungData === null) {
        setAuswertungData(docSnap.data());
      }
    }
  });

  const fragen = doc(db, "NoSqlQuiz", "quiz");
  getDoc(fragen).then((docSnap) => {
    if (docSnap.exists()) {
      if (data === null) {
        setData(docSnap.data());
      }
    }
  });

  function startNew() {
    sessionStorage.removeItem("QuizID");
    window.location = `${window.location.origin}`;
  }
  console.log(AuswertungData?.frage == data?.questions[0].answers[1].correct);
  console.log(AuswertungData?.frage1);
  return (
    <div>
      <h1>Auswertung</h1>
      <p>Du hast 10/12 Richtig beantwortet.</p>
      <div>
        {AuswertungData?.frage1 === "Gepard" ? (
          <div className="correct">
            <p>Deine Antwort: {AuswertungData?.frage1}</p>
          </div>
        ) : (
          <div className="falseAnswer">
            <p>Deine Antwort: {AuswertungData?.frage1}</p>
            <p>Lösung: Gepard</p>
          </div>
        )}
      </div>
      <div>
        {AuswertungData?.frage2 === "China" ? (
          <div className="correct">
            <p>Deine Antwort: {AuswertungData?.frage2}</p>
          </div>
        ) : (
          <div className="falseAnswer">
            <p>Deine Antwort: {AuswertungData?.frage2}</p>
            <p>Lösung:</p>
          </div>
        )}
      </div>
      <button onClick={startNew}>Restart</button>
    </div>
  );
}

export default QuizAuswertung;
