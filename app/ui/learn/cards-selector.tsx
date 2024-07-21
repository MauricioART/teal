import { Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function CardsSelector ({numberOfCards, setNumberOfCards}:{ numberOfCards : number, setNumberOfCards: React.Dispatch<React.SetStateAction<number>> })  {
  //const [numberOfCards, setNumberOfCards] = useState(15);
  
  return (
    <div className='flex flex-col justify-center items-center mt-10 mb-10'>

      <div className='flex flex-col w-fit'>
        <div className='flex justify-evenly'>
            <div onClick={()=>{
                if(numberOfCards < 100){
                    setNumberOfCards(numberOfCards + 1);
                }
            }}>
                <KeyboardArrowUpIcon key={"amountUp"} className='hover:pb-1' />
            </div>
        </div>
        <Typography variant="h3" className='border-2 border-dotted border-cyan-700 p-5 rounded-full col-span-2 w-fit text-center'>{numberOfCards}</Typography>
        <div className='flex justify-evenly'>
            <div onClick={()=>{
                if(numberOfCards > 0){
                    setNumberOfCards(numberOfCards - 1);
                }
            }}>
                <KeyboardArrowDownIcon key={"amountDwn"} className='hover:pt-1'/>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default CardsSelector;