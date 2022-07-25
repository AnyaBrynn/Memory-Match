import { useState, useEffect } from 'react'
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImages = [
  { "src": "/img/bee.png", matched:false },
  { "src": "/img/buffalo.png", matched:false  },
  { "src": "/img/bullfinch.png", matched:false  },
  { "src": "/img/chameleon.png", matched:false  },
  { "src": "/img/clown-fish.png", matched:false  },
  { "src": "/img/crab.png", matched:false  },
  { "src": "/img/fox.png", matched:false  },
  { "src": "/img/frog.png", matched:false  },
  { "src": "/img/shark.png", matched:false  },

]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstPick, setFirstPick] = useState(null)
  const [secondPick, setSecondPick] = useState(null)
  const [disabled, setDisabled] = useState(false)



  // shuffle cards 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setFirstPick(null)
    setSecondPick(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle user pick 
  const handlePick = (card) => {
    firstPick ? setSecondPick(card) : setFirstPick(card)
  }

  // compare cards picked 
  useEffect(() => {
    if (firstPick && secondPick) {
      setDisabled(true)
      if (firstPick.src === secondPick.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstPick.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 1000)
      }
    } 
  }, [firstPick, secondPick])
  

  // reset picks & increment turn counter
  const resetTurn = () => {
    setFirstPick(null)
    setSecondPick(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Animal Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-layout">
        {cards.map(card => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handlePick={handlePick} 
              flipped={card === firstPick || card === secondPick || card.matched} 
              disabled={disabled}
            />
          ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
