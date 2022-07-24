import { useState } from 'react'
import './App.css';

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

  // shuffle cards 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

  return (
    <div className="App">
      <h1>Animal Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-layout">
        {cards.map(card => (
            <div className="card" key={card.id}>
              <div>
                <img className="front" src={card.src} alt="card front" />
                <img className="back" src="/img/stars.png" alt="card back" />
              </div>
            </div>
          ))}
      </div>

    </div>
  );
}

export default App;
