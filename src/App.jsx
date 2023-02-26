import React from "react";
import Die from "./components/Die";
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App(){
    const [dies, setDies] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)

    React.useEffect(()=>{
        const allHeld = dies.every(item=>item.isHeld)
        const firstNumber = dies[0].number
        const allSameNumber = dies.every(item=>item.number === firstNumber)
        if(allHeld && allSameNumber){
            setTenzies(true)
            console.log("won!!")
            
        }
    }, [dies])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({number: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()})
        }
        return newDice
    }

    function handleRoll(){
        if(tenzies){
            setDies(allNewDice())
            setTenzies(false)
            setCount(0)
        }else{
            setDies(dies.map(item=>{
                return item.isHeld ? item : {...item, number: Math.ceil(Math.random() * 6)}
            }))
            setCount(count + 1)
        }
    }
    
    function holdDice(id){
        setDies(dies.map(item=>{
            return item.id === id ? {...item, isHeld: !item.isHeld } : item
        }))
    }

    const dieBoxes = dies.map(item=><Die 
                                        key={item.id} 
                                        number={item.number} 
                                        held={item.isHeld}
                                        handle={()=>holdDice(item.id)}
                                        />)

    return (
        <main>
            {tenzies && <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            />}
            
            <i className="fa-solid fa-dice"></i>
            <h1>Tenzies{count>0 && ": " + count}</h1>
            {tenzies && <img src="/images/ekrem.png"/>}
            <p>🇹🇷 Tüm zarlar aynı olana kadar salla. Aynı olan zarları dondurmak için üzerine tıkla.<br/>🇬🇧 Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className="dieComp">
                {dieBoxes}
            </div>
            <button 
                className="roll"
                onClick={handleRoll}
            >
            {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}