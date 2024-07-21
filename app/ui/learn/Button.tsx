interface ButtonProps {
    id: number;
    text: string;
    color: string;
    isDisabled: boolean;
    handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>,msg: string) => void;
  }
  
  export default function Button(props: ButtonProps) {

    return (
      <button
        id={props.id.toString()}
        disabled={props.isDisabled}
        className="h-auto rounded-full px-5 m-3 text-white"
        style={{ backgroundColor: props.color }}
        onClick={(event)=>{props.handleButtonClick(event,"Hello")}} >
        {props.text}
      </button>
    );
  }