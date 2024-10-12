// Create.jsx
import React, { useState, useCallback } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { CustomStepper } from "../../Components/MultiStepForm/CustomStepper";
import { StepForm } from "../../Components/MultiStepForm/StepFrom";

export default function Edit({ auth, task, projects, users }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    image: task.image_path ||"",
    name: task.name || "",
    description: task.description || "",
    due_date: task.due_date || "",
    status: task.status || "",
    priority: task.priority || "",
    assigned_user_id: task.assignedUser.name || "",
    project_id: task.project.name || "",
    _method: "PUT",
  });
  console.log(task);

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = useCallback(() => {
    if (!isLastStep) {
      setActiveStep((cur) => cur + 1);
    }
  }, [isLastStep]);

  const handlePrev = useCallback(() => {
    if (!isFirstStep) {
      setActiveStep((cur) => cur - 1);
    }
  }, [isFirstStep]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      post(route("task.update",task.id), {
        preserveState: true,
        preserveScroll: true,
      });
    },
    [post]
  );

  const handleSetData = useCallback(
    (name, value) => {
      setData(name, value);
    },
    [setData]
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`Edit Task ( ${task.name} )`}
        </h2>
      }
    >
      <Head title={`Edit Task`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <CustomStepper
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                isLastStep={isLastStep}
                setIsLastStep={setIsLastStep}
                isFirstStep={isFirstStep}
                setIsFirstStep={setIsFirstStep}
              />
            </div>
            <form
              className="p-6 bg-white dark:bg-gray-800"
              onSubmit={handleSubmit}
            >
              <StepForm
                step={activeStep}
                data={data}
                setData={handleSetData}
                errors={errors}
                projects={projects}
                users={users}
              />
              Edit
              <div className="mt-6 flex justify-between">
                <Button
                  color="blue"
                  onClick={handlePrev}
                  disabled={isFirstStep}
                >
                  Prev
                </Button>
                {isLastStep ? (
                  <Button color="indigo" type="submit" disabled={processing}>
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
// import React, { useState } from "react";
// import { Head, useForm } from "@inertiajs/react";
// import { Button } from "@material-tailwind/react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// import { CustomStepper } from "../../Components/MultiStepForm/CustomStepper";
// import { StepForm } from "../../Components/MultiStepForm/StepFrom";

// export default function Create({ auth, projects, users }) {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     image: "",
//     name: "",
//     description: "",
//     due_date: "",
//     status: "",
//     priority: "",
//     assigned_user_id: "",
//     project_id: "",
//   });

//   const [activeStep, setActiveStep] = useState(0);
//   const [isLastStep, setIsLastStep] = useState(false);
//   const [isFirstStep, setIsFirstStep] = useState(false);

//   const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
//   const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     post(route("task.store"), {
//       preserveState: true,
//       preserveScroll: true,
//     });
//   };

//   return (
//     <AuthenticatedLayout
//       user={auth.user}
//       header={
//         <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
//           Create new Task
//         </h2>
//       }
//     >
//       <Head title="Create Task" />
//       <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6">
//               <CustomStepper
//                 activeStep={activeStep}
//                 setActiveStep={setActiveStep}
//                 isLastStep={isLastStep}
//                 setIsLastStep={setIsLastStep}
//                 isFirstStep={isFirstStep}
//                 setIsFirstStep={setIsFirstStep}
//               />
//             </div>
//             <form
//               className="p-6 bg-white dark:bg-gray-800"
//               onSubmit={handleSubmit}
//             >
//               <StepForm
//                 step={activeStep}
//                 data={data}
//                 setData={setData}
//                 errors={errors}
//                 projects={projects}
//                 users={users}
//               />

//               <div className="mt-6 flex justify-between">
//                 <Button
//                   color="blue"
//                   onClick={handlePrev}
//                   disabled={isFirstStep}
//                 >
//                   Prev
//                 </Button>
//                 {isLastStep ? (
//                   <Button color="indigo" type="submit" disabled={processing}>
//                     Submit
//                   </Button>
//                 ) : (
//                   <Button
//                     color="indigo"
//                     onClick={handleNext}
//                     disabled={isLastStep}
//                   >
//                     Next
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }
