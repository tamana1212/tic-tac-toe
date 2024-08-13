import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";

const winning_pattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [count, setCount] = useState<number>(-1);
  const [round, setRound] = useState<Array<boolean>>(Array(9).fill(false));
  const [cross, setCross] = useState<Array<boolean>>(Array(9).fill(false));
  const [winnerName, setWinnerName] = useState<string>("");

  useEffect(() => {
    if (count < 0) return;
    const isCross = count % 2 === 0;
    const currentMove = isCross ? cross : round;
    let isWinner = false;
    for (let i = 0; i < winning_pattern.length; i++) {
      if (
        currentMove[winning_pattern[i][0]] &&
        currentMove[winning_pattern[i][1]] &&
        currentMove[winning_pattern[i][2]]
      ) {
        isWinner = true;
        setWinnerName(isCross ? "The Winner is Cross" : "The Winner is Round");
        showConfetti();
        break;
      }
    }
    if (count === 8 && !isWinner) {
      setWinnerName("It's a draw");
    }
  }, [count]);
  
  const showConfetti = () => {
    const endTime = Date.now() + 2 * 1000;
    const interval = setInterval(() => {
      if (Date.now() > endTime) clearInterval(interval);
      confetti({
        startVelocity: 30,
        spread: 3600,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 100);
  };

  const setBoard = (e: any, index: number) => {
    if (e.target.innerText) return;
    const isCross = (count + 1) % 2 === 0;
    setCount((prev) => prev + 1);
    e.target.innerText = isCross ? "X" : "O";
    const setCurrentMove = isCross ? setCross : setRound;
    setCurrentMove((prev) =>
      prev.map((item, i) => (i === index ? true : item))
    );
  };

  const restartGame = () => {
    setCross(Array(9).fill(false));
    setRound(Array(9).fill(false));
    setCount(-1);
    setWinnerName("");
    document.querySelectorAll("td").forEach((item) => {
      item.innerText = "";
    });
  };

  return (
    <div className="tic_wrapper">
      {winnerName && <h1>{winnerName}!</h1>}
      <table>
        <tbody>
          {Array.from({ length: 3 }, (_, row) => (
            <tr key={row}>
              {Array.from({ length: 3 }, (_, col) => (
                <td
                  key={col}
                  onClick={(e) => {
                    setBoard(e, row * 3 + col);
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default App;
