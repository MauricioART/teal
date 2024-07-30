import AddDeckIcon from "@/app/ui/deck/add-deck-icon";
import NewCardForm from "@/app/ui/deck/create-card-form";
import Deck from "@/app/ui/deck/deck";
import LogoIcon from "@/app/ui/logo-icon";
import ScheduleTable from "@/app/ui/schedule/schedule-table";
import { TableBody, TableCell, Table} from "@mui/material"

export default function Page(){
    const weekdays = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return (
        <div className="h-fit w-full flex p-4">
            <ScheduleTable/>
        </div>
    );
}