import { useState } from "react";
import TextInput from "../../tools/inputForms/TextInput";
import TextArea from "../../tools/textArea/TextArea";

const TaskForm = () => {
  const [date, setDate] = useState("");
  const [orderId, setOrderId] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [task, setTask] = useState("");
  const [remarks, setRemarks] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [personalNote, setPersonalNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      date,
      orderId,
      clientEmail,
      task,
      remarks,
      taskDescription,
      personalNote,
    });
  };

  return (
    <div className="rounded-sm w-auto h-auto border bg-white shadow-lg ">
      <form onSubmit={handleSubmit}>
        <ul className="flex flex-col mt-14 ml-14">
          <li className="mb-7 w-5/12  max-sm:w-11/12 ">
            <TextInput
              id="date"
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </li>
          <li className="flex w-auto gap-20 max-sm:flex-col ">
            <div className="w-5/12 max-sm:w-11/12">
              <TextInput
                type="text"
                id="order id"
                label="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div className="w-5/12 max-sm:w-11/12">
              <TextInput
                type="email"
                id="client email"
                label="Client Email Address "
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>
          </li>
          <li className="border-t mt-12 mr-24 mb-10 max-sm:w-11/12"></li>

          <li className="mb-8">
            <p className="font-bold text-black text-sm">Task Details</p>
          </li>

          <li className="flex w-auto gap-20 mb-9 max-sm:flex-col ">
            <div className="w-5/12 max-sm:w-11/12">
              <TextInput
                type="text"
                id="task name"
                label="Task Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="w-5/12 max-sm:w-11/12">
              <TextInput
                type="text"
                id="remarks"
                label="Remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </li>

          <li className="w-11/12 mb-7">
            <TextArea
              id="task description"
              label="Task Description"
              name="Task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </li>

          <li className="w-11/12 mb-16">
            <TextArea
              id="personal note"
              name="personal Note"
              label="Personal note"
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
            />
          </li>
          <li className="border-t mt-12 mr-20 mb-8 max-sm:w-11/12"></li>

          <li className="mr-20 mb-12">
            <div className="flex justify-end  mb-4 gap-4 max-sm:justify-center">
              <button className="border rounded-md bg-white text-black px-8 h-10">
                Cancel
              </button>

              <button className="border rounded-md bg-[#3C50E0] text-white  h-10 px-8">
                Add Task
              </button>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default TaskForm;
