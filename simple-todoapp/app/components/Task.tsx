"use client";

import { ITask } from "../../types/tasks";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false)
    router.refresh();
  }

  return (
    <tr
      key={task.id}
      className="even:bg-blue-100 odd:bg-white border-b last:border-none hover:bg-blue-200"
    >
      <td className="px-4 py-3 w-full">{task.text}</td>
      <td className="flex gap-5">
        <BiSolidEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-600"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg text-blue-600">Editar tarea</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
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

        <FaRegTrashCan
          onClick={() => setOpenModalDeleted(true)} // Usamos setOpenModalDeleted correctamente
          cursor="pointer"
          className="text-red-600"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">¿Quieres eliminar la siguiente tarea?</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn text-white bg-red-500"
            >
              Sí
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
function uuidv4() {
  throw new Error("Function not implemented.");
}
