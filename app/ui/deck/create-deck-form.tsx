"use client";
import { createDeck } from "@/app/lib/actions";
import DeckIcon from "./deck-icon";
import { FormEvent, ChangeEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';

interface FormData {
  name: string;
  description: string;
  image: File | null;
}

interface FormProps {
  owner_id: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

// Componente de formulario
export default function NewDeckForm(props: FormProps) {
  const formData = props.formData;
  const setFormData = props.setFormData;
  // Manejar el cambio en los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar la selección de archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar el envío predeterminado del formulario

    const { name, description, image } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('description', description);
    formDataToSend.append('owner_id', props.owner_id);
    if (image) {
      formDataToSend.append('image', image);
    }

    await createDeck(formDataToSend);
  };

  /*
    
  */
  return (
    <form onSubmit={handleSubmit}>
      <div className="new-deck-form m-10 h-fit p-10 rounded-md border-2 border-purple-600">
        <div className="col-start-1 row-start-1 -order-2">
          <h1> Create </h1>
        </div>
        <div className="col-start-1 row-start-2 row-end-5 input h-16 border-teal-500 border-2 mb-8 mt-8 rounded p-2 bg-white">
          
          <label htmlFor="name" className="text-gray-400">Title (Mandatory)</label>
          <input
            type="text"
            id="name"
            name="name"
            className=" focus:outline-none focus:border-none w-full h-fit"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col col-start-1 row-start-5 row-end-9 input  h-28 border-2 border-teal-500  mb-8 rounded p-2 bg-white">
          <label htmlFor="description" className="text-gray-400">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            cols={50}
            className=" focus:outline-none focus:border-none w-full h-full"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid col-start-2 row-start-1 row-end-9 justify-center items-center -order-1">
          <div className="relative h-fit w-fit">
            <EditIcon 
                        className="h-8 w-8 p-1 absolute top-7 right-6 bg-gray-200 border opacity-50 border-gray-300 rounded-full hover:bg-gray-100 hover:p-0" 
                        key={1}
                        onClick={async (e) => {
                            e.stopPropagation();
                        }}
            />
            
            <DeckIcon width={220} selectable={false}/>
          </div>
        </div>
      </div>

        {/*<div>
          <label htmlFor="image">Thumbnail:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            title=""
            onChange={handleFileChange}
          />
        </div>*/}

    </form>
  );
}
