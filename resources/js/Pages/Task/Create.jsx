import React, { useState } from "react";
import { Head, useForm,Link } from "@inertiajs/react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { HomeIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";

const Step1Form = ({ data, setData, errors }) => (
  <>
    <div>
      <InputLabel htmlFor="task_image_path" value="Task Image" />
      <TextInput
        id="task_image_path"
        type="file"
        name="image"
        className="mt-1 block w-full"
        onChange={(e) => setData("image", e.target.files[0])}
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
        isFocused={true}
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

const Step2Form = ({ data, setData, errors }) => (
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
);

const Step3Form = ({ data, setData, errors, projects, users }) => (
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
);

export default function Create({ auth, projects, users }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    image: "",
    name: "",
    description: "",
    due_date: "",
    status: "",
    priority: "",
    assigned_user_id: "",
    project_id: "",
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    
    post(route("task.store"), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Create new Task
        </h2>
      }
    >
      <Head title="Create Task" />
      <div className="py-12 ">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm p-4 shadow-sm sm:rounded-lg">
            {" "}
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step onClick={() => setActiveStep(0)}>
                <HomeIcon className="h-5 w-5" />
              </Step>
              <Step onClick={() => setActiveStep(1)}>
                <UserIcon className="h-5 w-5" />
              </Step>
              <Step onClick={() => setActiveStep(2)}>
                <CogIcon className="h-5 w-5" />
              </Step>
            </Stepper>
            <form
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg "
              onSubmit={handleSubmit}
             
            >
              {activeStep === 0 && (
                <Step1Form data={data} setData={setData} errors={errors} />
              )}
              {activeStep === 1 && (
                <Step2Form data={data} setData={setData} errors={errors} />
              )}
              {activeStep === 2 && (
                <Step3Form
                  data={data}
                  setData={setData}
                  errors={errors}
                  projects={projects}
                  users={users}
                />
              )}

              <div className="mt-6 flex justify-between">
                <Button
                  color="blue"
                  onClick={handlePrev}
                  disabled={isFirstStep}
                >
                  Prev
                </Button>
                {isLastStep ? (
                  <Button 
                  href={route("task.index")} 
                  className="bg-indigo-500 py-1 px-3 text-white flex justify-center items-center rounded shadow transition-all hover:bg-indigo-600 mr-2"

                  type="submit" disabled={processing}>
                    Submit
                  </Button>
                ) : (
                  <Button
                    color="indigo"
                    onClick={handleNext}
                    disabled={isLastStep}
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
