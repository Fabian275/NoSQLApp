import { useState } from "react";
import { db } from "./../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function QuizAuswertung({ docID }) {
  const [AuswertungData, setAuswertungData] = useState(null);
  const [lösung, setLösung] = useState(null);
  const [correctQuestins, setCorrectQuestins] = useState(0);
  const [falseQuestins, setFalseQuestins] = useState(0);

  const auswertung = doc(db, "AntwortenQuiz", `${sessionStorage.QuizID}`);
  getDoc(auswertung).then((docSnap) => {
    if (docSnap.exists()) {
      if (AuswertungData === null) {
        setAuswertungData(docSnap.data());
      }
    }
  });

  const fragen = doc(db, "FragenTest", "quiz");
  getDoc(fragen).then((docSnap) => {
    if (docSnap.exists()) {
      if (lösung === null) {
        console.log(docSnap.data());
        setLösung(docSnap.data());
      }
    }
  });

  function startNew() {
    sessionStorage.removeItem("QuizID");
    window.location = `${window.location.origin}`;
  }

  return (
    <div>
      <h1>Auswertung</h1>
      <p>Du hast 10/12 Richtig beantwortet.</p>
      {AuswertungData?.antworten.map((item, i) => {
        return item === lösung?.questions[i].Lösung ? (
          <>
            <h3>Frage{i + 1}</h3>
            <div className="correct">
              <p>Deine Antwort: {item}</p>
              {/* {setCorrectQuestins(correctQuestins + 1)} */}
            </div>
          </>
        ) : (
          <>
            <h3>Frage{i + 1}</h3>
            <div className="falseAnswer">
              <p>Deine Antwort: {item}</p>
              <p>Lösung: {lösung?.questions[i].Lösung}</p>
              {/* {setFalseQuestins(falseQuestins + 1)} */}
            </div>
          </>
        );
      })}
      <button onClick={startNew}>Restart</button>
    </div>
  );
}

export default QuizAuswertung;
