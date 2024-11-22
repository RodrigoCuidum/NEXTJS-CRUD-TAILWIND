"use client";

import Modal from "./Modal";
import { AiOutlinePlus } from "react-icons/ai";
import { FormEventHandler, useReducer, useState } from "react";
import { addTodo } from "../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid'

const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id:uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh()
  }
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full font-black text-white bg-blue-800"
      >
        Añadir nueva tarea
        <AiOutlinePlus className="ml-1" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg text-blue-600">
            Añadir nueva tarea
          </h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={e => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Descripción"
              className="input input-bordered input-primary w-full"
            />
            <button type="submit" className="btn bg-blue-600 text-white">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
