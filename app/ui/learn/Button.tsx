import {useState} from "react";

interface ButtonProps {
    text: string;
    color: string;
    handleButtonClick: () => void;
  }
  
  export default function Button(props: ButtonProps) {
    const [isDisabled, setDisabled] = useState(false);

    return (
      <button
        disabled={isDisabled}
        className="h-auto rounded-full px-3 m-3"
        style={{ backgroundColor: props.color }}
        onClick={()=>{
          setDisabled(true);
          props.handleButtonClick();
        }} 
        hidden={false}>
        {props.text}
      </button>
    );
  }