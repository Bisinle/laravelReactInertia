import React, { memo, useCallback } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";

const Step1Form = memo(({ data, setData, errors }) => {
  const handleFileChange = useCallback(
    (e) => {
      setData("image", e.target.files[0]);
    },
    [setData]
  );

  return (
    <>
      <div>
        <InputLabel htmlFor="task_image_path" value="Task Image" />
        <TextInput
          id="task_image_path"
          type="file"
          name="image"
          className="mt-1 block w-full"
          onChange={handleFileChange}
        />
        <InputError message={errors.image} className="mt-2" />
      </div>
      <div className="mt-4">
        <InputLabel htmlFor="task_name" value="Task Name" />
        <TextInput
          id="task_name"
          type="text"
          name="name"
          value={data.name}
          className="mt-1 block w-full"
          autoFocus={true}
          onChange={(e) => setData("name", e.target.value)}
        />
        <InputError message={errors.name} className="mt-2" />
      </div>
      <div className="mt-4">
        <InputLabel htmlFor="task_description" value="Task Description" />
        <TextAreaInput
          id="task_description"
          name="description"
          value={data.description}
          className="mt-1 block w-full"
          onChange={(e) => setData("description", e.target.value)}
        />
        <InputError message={errors.description} className="mt-2" />
      </div>
      <div className="mt-4">
        <InputLabel htmlFor="task_due_date" value="Task Deadline" />
        <TextInput
          id="task_due_date"
          type="date"
          name="due_date"
          value={data.due_date}
          className="mt-1 block w-full"
          onChange={(e) => setData("due_date", e.target.value)}
        />
        <InputError message={errors.due_date} className="mt-2" />
      </div>
    </>
  );
});

const Step2Form = memo(({ data, setData, errors }) => (
  <>
    <div className="mt-4">
      <InputLabel htmlFor="task_status" value="Task Status" />
      <SelectInput
        name="status"
        id="task_status"
        value={data.status}
        className="mt-1 block w-full"
        onChange={(e) => setData("status", e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </SelectInput>
      <InputError message={errors.status} className="mt-2" />
    </div>
    <div className="mt-4">
      <InputLabel htmlFor="task_priority" value="Task Priority" />
      <SelectInput
        name="priority"
        id="task_priority"
        value={data.priority}
        className="mt-1 block w-full"
        onChange={(e) => setData("priority", e.target.value)}
      >
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </SelectInput>
      <InputError message={errors.priority} className="mt-2" />
    </div>
  </>
));

const Step3Form = memo(({ data, setData, errors, projects, users }) => (
  <>
    <div className="mt-4">
      <InputLabel htmlFor="task_assigned_user" value="Assigned User" />
      <SelectInput
        name="assigned_user_id"
        id="task_assigned_user"
        value={data.assigned_user_id}
        className="mt-1 block w-full"
        onChange={(e) => setData("assigned_user_id", e.target.value)}
      >
        <option value="">Select User</option>
        {users.data.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </SelectInput>
      <InputError message={errors.assigned_user_id} className="mt-2" />
    </div>
    <div className="mt-4">
      <InputLabel htmlFor="project_id" value="Task Project" />
      <SelectInput
        name="project_id"
        id="project_id"
        value={data.project_id}
        className="mt-1 block w-full"
        onChange={(e) => setData("project_id", e.target.value)}
      >
        <option value="">Select Project</option>
        {projects.data.map((project) => (
          <option value={project.id} key={project.id}>
            {project.name}
          </option>
        ))}
      </SelectInput>
      <InputError message={errors.project_id} className="mt-2" />
    </div>
  </>
));

export const StepForm = memo(
  ({ step, data, setData, errors, projects, users }) => {
    switch (step) {
      case 0:
        return <Step1Form data={data} setData={setData} errors={errors} />;
      case 1:
        return <Step2Form data={data} setData={setData} errors={errors} />;
      case 2:
        return (
          <Step3Form
            data={data}
            setData={setData}
            errors={errors}
            projects={projects}
            users={users}
          />
        );
      default:
        return null;
    }
  }
);
// import React from "react";
// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import SelectInput from "@/Components/SelectInput";
// import TextAreaInput from "@/Components/TextAreaInput";
// import TextInput from "@/Components/TextInput";

// export function StepForm({ step, data, setData, errors, projects, users }) {
//   console.log(data);

//   const Step1Form = () => (
//     <>
//       <div>
//         <InputLabel htmlFor="task_image_path" value="Task Image" />
//         <TextInput
//           id="task_image_path"
//           type="file"
//           name="image"
//           className="mt-1 block w-full"
//           onChange={(e) => setData("image", e.target.files[0])}
//         />
//         <InputError message={errors.image} className="mt-2" />
//       </div>
//       <div className="mt-4">
//         <InputLabel htmlFor="task_name" value="Task Name" />
//         <TextInput
//           id="task_name"
//           type="text"
//           name="name"
//           value={data.name}
//           className="mt-1 block w-full"
//           isFocused={true}
//           onChange={(e) => setData("name", e.target.value)}
//         />
//         <InputError message={errors.name} className="mt-2" />
//       </div>
//       <div className="mt-4">
//         <InputLabel htmlFor="task_description" value="Task Description" />
//         <TextAreaInput
//           id="task_description"
//           name="description"
//           value={data.description}
//           className="mt-1 block w-full"
//           onChange={(e) => setData("description", e.target.value)}
//         />
//         <InputError message={errors.description} className="mt-2" />
//       </div>
//       <div className="mt-4">
//         <InputLabel htmlFor="task_due_date" value="Task Deadline" />
//         <TextInput
//           id="task_due_date"
//           type="date"
//           name="due_date"
//           value={data.due_date}
//           className="mt-1 block w-full"
//           onChange={(e) => setData("due_date", e.target.value)}
//         />
//         <InputError message={errors.due_date} className="mt-2" />
//       </div>
//     </>
//   );

//   const Step2Form = () => (
//     <>
//       <div className="mt-4">
//         <InputLabel htmlFor="task_status" value="Task Status" />
//         <SelectInput
//           name="status"
//           id="task_status"
//           value={data.status}
//           className="mt-1 block w-full"
//           onChange={(e) => setData("status", e.target.value)}
//         >
//           <option value="">Select Status</option>
//           <option value="pending">Pending</option>
//           <option value="in_progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </SelectInput>
//         <InputError message={errors.status} className="mt-2" />
//       </div>
//       <div className="mt-4">
//         <InputLabel htmlFor="task_priority" value="Task Priority" />
//         <SelectInput
//           name="priority"
//           id="task_priority"
//           value={data.priority}
//           className="mt-1 block w-full"
//           onChange={(e) => setData("priority", e.target.value)}
//         >
//           <option value="">Select Priority</option>
//           <option value="high">High</option>
//           <option value="medium">Medium</option>
//           <option value="low">Low</option>
//         </SelectInput>
//         <InputError message={errors.priority} className="mt-2" />
//       </div>
//     </>
//   );

//   const Step3Form = () => (
//     <>
//       <div className="mt-4">
//         <InputLabel htmlFor="task_assigned_user" value="Assigned User" />
//         <SelectInput
//           name="assigned_user_id"
//           id="task_assigned_user"
//           value={data.assigned_user_id}
//           className="mt-1 block w-full"
//           onChange={(e) => setData("assigned_user_id", e.target.value)}
//         >
//           <option value="">Select User</option>
//           {users.data.map((user) => (
//             <option value={user.id} key={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </SelectInput>
//         <InputError message={errors.assigned_user_id} className="mt-2" />
//       </div>
//       <div className="mt-4">
//         <InputLabel htmlFor="project_id" value="Task Project" />
//         <SelectInput
//           name="project_id"
//           id="project_id"
//           value={data.project_id}
//           className="mt-1 block w-full"
//           onChange={(e) => setData("project_id", e.target.value)}
//         >
//           <option value="">Select Project</option>
//           {projects.data.map((project) => (
//             <option value={project.id} key={project.id}>
//               {project.name}
//             </option>
//           ))}
//         </SelectInput>
//         <InputError message={errors.project_id} className="mt-2" />
//       </div>
//     </>
//   );

//   switch (step) {
//     case 0:
//       return <Step1Form />;
//     case 1:
//       return <Step2Form />;
//     case 2:
//       return <Step3Form />;
//     default:
//       return null;
//   }
// }
