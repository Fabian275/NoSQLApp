function mehrfragen() {
  const docRef = doc(db, "FragenTest", "quiz");

  const quizFragen = {
    questions: [
      {
        question: "Welches Tier ist das schnellste Landtier der Welt?",
        answers: [
          { option: "Puma" },
          { option: "Gepard" },
          { option: "Löwe" },
          { option: "Jaguar" },
        ],
        Lösung: "Gepard",
      },
      {
        question: "Welcher Planet hat die meisten Monde?",
        answers: [
          { option: "Jupiter" },
          { option: "Saturn" },
          { option: "Uranus" },
          { option: "Mars" },
        ],
        Lösung: "Saturn",
      },
      {
        question: "Welches ist der höchste Berg Europas?",
        answers: [
          { option: "Mont Blanc" },
          { option: "Matterhorn" },
          { option: "Elbrus" },
          { option: "Olympus" },
        ],
        Lösung: "Mont Blanc",
      },
      {
        question: "Welches ist der größte Planet im Sonnensystem?",
        answers: [
          { option: "Erde" },
          { option: "Mars" },
          { option: "Jupiter" },
          { option: "Saturn" },
        ],
        Lösung: "Jupiter",
      },
      {
        question: "Welches ist der höchste Wasserfall der Welt?",
        answers: [
          { option: "Angel Falls" },
          { option: "Niagara Falls" },
          { option: "Taipei 101" },
          { option: "Iguazu Falls" },
        ],
        Lösung: "Angel Falls",
      },
      // {
      //   question: "",
      //   answers: [
      //     { option: "" },
      //     { option: "" },
      //     { option: "" },
      //     { option: "" },
      //   ],
      //   Lösung: "",
      // },
    ],
  };
  setDoc(docRef, quizFragen)
    .then(() => {
      console.log("Document has been added successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

<button onClick={mehrfragen}>mehr fragen</button>;
