
interface radioButtonProps{
    options: string[];
}

export default function RadioButton(props: radioButtonProps){
    return (
    <div className="space-x-4">
        {props.options.map((answer)=>{   
            return (
                <label className="flex">
                    <input type="radio" className="form-radio h-5 w-5 text-blue-600 shadow-blue-600 focus:ring-blue-500" name="option" value="1"/>
                    <span className="ml-2">{answer}</span>
                </label>
            );
        })}
    </div>
    );
}