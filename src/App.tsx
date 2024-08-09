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

function App() {
  const [count, setCount] = useState(-1);
  const [round, setRound] = useState(Array(9).fill(false));
  const [cross, setCross] = useState(Array(9).fill(false));
  const [winner, setWinner] = useState<null | string>(null);

  useEffect(() => {
    if (count < 0) return;
    const isCross = count % 2 === 0;
    let winner = false;
    let winnerName = "";
    for (let i = 0; i < winning_pattern.length; i++) {
      if (isCross) {
        winner =
          cross[winning_pattern[i][0]] &&
          cross[winning_pattern[i][1]] &&
          cross[winning_pattern[i][2]];
        if (winner) {
          winnerName = "Cross";
          break;
        }
      } else {
        winner =
          round[winning_pattern[i][0]] &&
          round[winning_pattern[i][1]] &&
          round[winning_pattern[i][2]];
        if (winner) {
          winnerName = "Round";
          break;
        }
      }
    }
    if (winner) {
      setWinner("The winner is " + winnerName);
      showConfetti();
      return;
    }

    if (count === 8) {
      setWinner("It is a draw");
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

  const setBoard = (index: number, e: any) => {
    const isCross = (count + 1) % 2 === 0;
    setCount((prev) => prev + 1);
    e.target.innerText = isCross ? "X" : "O";
    const array = isCross ? cross : round;
    array[index] = true;
    isCross ? setCross(array) : setRound(array);
  };

  const restartGame = () => {
    setWinner(null);
    setCross(Array(9).fill(false));
    setRound(Array(9).fill(false));
    setCount(-1);
    document.querySelectorAll("td").forEach((element) => {
      element.innerText = "";
    });
  };

  return (
    <div className="tic_wrapper">
      {winner && <h1>{winner}!</h1>}
      <table style={{ pointerEvents: winner ? "none" : "auto" }}>
        <tbody>
          {Array.from({ length: 3 }, (_, row) => (
            <tr key={row}>
              {Array.from({ length: 3 }, (_, col) => (
                <td
                  key={row * 3 + col}
                  onClick={(e) => {
                    setBoard(row * 3 + col, e);
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
}

export default App;
