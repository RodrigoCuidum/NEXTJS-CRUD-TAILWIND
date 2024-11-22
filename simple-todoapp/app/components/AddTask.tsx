"use client";

import Modal from "./Modal";
import { AiOutlinePlus } from "react-icons/ai";
import { FormEventHandler, useState } from "react";
import { addTodo } from "../../api";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id:3,
      text: newTaskValue
    })
    setNewTaskValue("");
  }
  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
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
              className="input input-bordered input-primary w-full w-full"
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
