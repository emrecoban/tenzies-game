import React from "react";

export default function Die(props){

    function zarIcon(){
        switch(props.number){
            case 1:
                return <i className="fa-solid fa-dice-one"></i>
            case 2:
                return <i className="fa-solid fa-dice-two"></i>
            case 3:
                return <i className="fa-solid fa-dice-three"></i>
            case 4:
                return <i className="fa-solid fa-dice-four"></i>
            case 5:
                return <i className="fa-solid fa-dice-five"></i>
            case 6:
                return <i className="fa-solid fa-dice-six"></i>
            default:
                return "fuck!"
        }
    }

    return (
        <div 
            className={props.held ? "dieBox selected" : "dieBox"}
            onClick={props.handle}
        >
            {zarIcon()}
        </div>
    )
}