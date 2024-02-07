"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const Todo = () => {
  const [inputTask, setInputTask] = useState("");

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // cek apaka ada item di local storage
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks")); //klo ada ambil terus parse dan masukkan dalam storedLists
      setTasks(storedList); //setTasknya setelah itu
    }
  }, []);

  //   simpan ke localstorage
  const handleTambahTask = () => {
    if (inputTask) {
      const newTask = { id: new Date().getTime().toString(), title: inputTask }; //buat task baru dengan id, dan title isinya
      setTasks([...tasks, newTask]); //set isi arraynya dengan newTask
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setInputTask("");
    }
  };

  //   krn yg mau dihapus itu task maka masukkan ke parameter
  const handleDeleteTask = (task) => {
    const ygTdkMauDihapus = tasks.filter((t) => t.id !== task.id); //ambil id yg tidak sama dengan yg mau dihapus terus simpan ke setTask
    setTasks(ygTdkMauDihapus);

    localStorage.setItem("localTasks", JSON.stringify(ygTdkMauDihapus));
  };

  const hapusSemua = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-blue-400 text-white xl:w-[400px] xl:h-[500px] md:w-[300px] md:h-[400px] w-[200px] h-[300px] p-3 border flex flex-col  gap-y-2 ">
        <h1 className="font-bold mb-2 text-[20px] capitalize">
          List Tugas yang Ingin dilakukan
        </h1>
        <div className=" bg-white text-black p-2 border  w-full flex justify-between rounded-md">
          <input
            type="text"
            value={inputTask}
            placeholder="Tugas hari ini..."
            className="outline-none"
            onChange={(e) => {
              setInputTask(e.target.value);
            }}
          />
          <button onClick={handleTambahTask}>
            <FaPlus size={18} />
          </button>
        </div>

        {/* logic jika ada task atau tidak */}
        <p>
          {!tasks
            ? "Belum ada tugas"
            : tasks.length == 1
            ? "Anda punya 1 tugas"
            : tasks.length > 1
            ? `Anda punya ${tasks.length} tugas`
            : "Belum ada tugas"}
        </p>

        {/* tampilkan tugas di window */}
        <div className="bg-white text-black mt-5 rounded-[5px] w-full  ">
          {tasks.map((task) => {
            return (
              <>
                <div
                  key={task.id}
                  className="p-2 flex items-center  w-full justify-between"
                >
                  <div>
                    <p>{task.title}</p>
                  </div>
                  <button onClick={() => handleDeleteTask(task)}>
                    <FaTrashCan />
                  </button>
                </div>
                <hr />
              </>
            );
          })}
        </div>
        {tasks.length ? (
          <button
            onClick={hapusSemua}
            className=" bg-red-700 p-1 rounded-md w-[120px] shadow-sm"
          >
            Hapus semua
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Todo;
