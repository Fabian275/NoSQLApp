import { useEffect, useState } from "react";
import { db } from "./../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./style/Auswertung.css";

function QuizAuswertung() {
  const [AuswertungData, setAuswertungData] = useState(null);
  const [lösung, setLösung] = useState(null);
  const [correctQuestins, setCorrectQuestins] = useState(0);

  if (sessionStorage.QuizID === undefined) {
    window.location = "/";
  } else {
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
          // console.log(docSnap.data());
          setLösung(docSnap.data());
        }
      }
    });

    function startNew() {
      sessionStorage.removeItem("QuizID");
      window.location = `${window.location.origin}`;
    }

    useEffect(() => {
      let score = 0;

      AuswertungData?.antworten.map((item, i) => {
        item === lösung?.questions[i].Lösung ? <>{score++}</> : "";
        {
          console.log(score);
        }
      });
      setCorrectQuestins(score);
    }, [AuswertungData]);

    return (
      <div id="auswertung">
        <h1>Auswertung</h1>
        <p>
          Du hast {correctQuestins}/{AuswertungData?.antworten.length} Richtig
          beantwortet.
        </p>
        {AuswertungData?.antworten.map((item, i) => {
          return item === lösung?.questions[i].Lösung ? (
            <div className="resultContainer" key={i}>
              <h3>Frage {i + 1}</h3>
              <div className="correct">
                <p>
                  Deine Antwort: <b>{item}</b>
                </p>
                {/* {setCorrectQuestins(correctQuestins + 1)} */}
              </div>
            </div>
          ) : (
            <div className="resultContainer">
              <h3>Frage {i + 1}</h3>
              <div className="falseAnswer">
                <p>
                  Deine Antwort: <b>{item}</b>
                </p>
                <p>
                  Lösung: <b>{lösung?.questions[i].Lösung}</b>
                </p>
                {/* {setFalseQuestins(falseQuestins + 1)} */}
              </div>
            </div>
          );
        })}
        <button onClick={startNew} id="restartButton">
          Restart
        </button>
      </div>
    );
  }
}

export default QuizAuswertung;
