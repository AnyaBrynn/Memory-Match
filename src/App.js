import { useState, useEffect } from 'react'
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImages = [
  { "src": "/img/bee.png" },
  { "src": "/img/buffalo.png" },
  { "src": "/img/bullfinch.png" },
  { "src": "/img/chameleon.png" },
  { "src": "/img/clown-fish.png" },
  { "src": "/img/crab.png" },
  { "src": "/img/fox.png" },
  { "src": "/img/frog.png" },
  { "src": "/img/shark.png" },

]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstPick, setFirstPick] = useState(null)
  const [secondPick, setSecondPick] = useState(null)


  // shuffle cards 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle user pick 
  const handlePick = (card) => {
    firstPick ? setFirstPick(card) : setSecondPick(card)
  }

  // compare cards picked 
  useEffect(() => {
    if (firstPick && secondPick) {
      if (firstPick.src === secondPick.src) {
        resetTurn()
      }
      else {
        resetTurn()
      }
    } 
  }, [firstPick, secondPick])
  

  // reset picks & increment turn counter
  const resetTurn = () => {
    setFirstPick(null)
    setSecondPick(null)
    setTurns(prevTurns => prevTurns + 1)
  }


  return (
    <div className="App">
      <h1>Animal Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-layout">
        {cards.map(card => (
            <SingleCard key={card.id} card={card} handlePick={handlePick}/>
          ))}
      </div>

    </div>
  );
}

export default App;
