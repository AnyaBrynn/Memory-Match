import './SingleCard.css'



export default function SingleCard({ card, handlePick }) {

    const handleClick = () => {
        handlePick(card)
    }

    return (
        <div className="card">
              <div>
                <img className="front" src={card.src} alt="card front" />
                <img className="back" src="/img/stars.png" onClick={handleClick} alt="card back" />
              </div>
        </div>
    )
} 
