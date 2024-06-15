"use client";
import { createDeck } from "@/app/lib/actions";
import Button from "../button";
import DeckIcon from "./deck-icon";
import { useState, FormEvent, ChangeEvent } from 'react';
import Link from "next/link";

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
  //const formData = props.formData;
  //const setFormData = props.setFormData;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: null,
  });

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
    if (image) {
      formDataToSend.append('image', image);
    }

    // Llamar a la función createDeck con los datos del formulario y owner_id como argumento
    console.log(props.owner_id);
    await createDeck(formDataToSend, props.owner_id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col m-1 h-full p-10 bg-slate-50 rounded-md">
        <div>
          <h1> Create </h1>
        </div>

        <div className="flex">
          <div className=" w-5/6">
            <div className="flex flex-col w-2/3 h-16 border-teal-200 border-2 mb-8 mt-8 rounded ">
              <label htmlFor="name">Title (Mandatory)</label>
              <input
                type="text"
                id="name"
                name="name"
                className="border-white focus:outline-none focus:border-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-2/3 h-28 border-2 border-teal-200 mb-8 rounded ">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                cols={50}
                className="focus:outline-none focus:border-none"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          <div>
            <DeckIcon />
          </div>
        </div>

        <div>
          <label htmlFor="image">Thumbnail:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            title=""
            onChange={handleFileChange}
          />
        </div>

        <div className="flex self-end">
          <Link
            href="/learn/decks"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit" className="flex self-center">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
