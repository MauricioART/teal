import Image from "next/image";

export default function Page({ params }: { params: { deckId: string } }){
    const id = params.deckId;
    const width = 190;
    return(
        <div className="flex justify-evenly items-center h-5/6">
            <Image 
                src="/icons/True-False-Card.svg"
                alt="True-False Card"
                width={width}
                height={1.5 * width}
            />
            <Image 
                src="/icons/4-Optional-Card.svg"
                alt="4 Optional Card"
                width={width}
                height={1.5 * width}
            />
            <Image 
                src="/icons/Reveal-Card.svg"
                alt="Reveal Card"
                width={width}
                height={1.5 * width}
            />
        </div>
    );
}