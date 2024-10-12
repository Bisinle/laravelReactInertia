import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable";
export default function Show({ auth, success, task, queryParams }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Task "${task.name}"`}
          </h2>
          {/* <Link
            href={route("task.edit", task.id)}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit
          </Link> */}
        </div>
      }
    >
      <Head title={`Task "${task.name}"`} />
      <div className="py-12 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg">
            <div className="relative">
              <img
                src={task.image_path}
                alt=""
                className="w-full h-80 object-cover object-center"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
                {task.name}
              </h1>
            </div>
            <div className="p-8 text-gray-900 dark:text-gray-100">
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Task Priority
                    </label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-3 py-1 rounded-full text-sm font-medium " +
                          TASK_PRIORITY_CLASS_MAP[task.priority]
                        }
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Task Status
                    </label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-3 py-1 rounded-full text-sm font-medium " +
                          TASK_STATUS_CLASS_MAP[task.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Created By
                    </label>
                    <p className="mt-1 text-lg font-semibold">
                      {task.createdBy.name}
                    </p>
                  </div>
                  <div>
                  <Link href={route("project.show", task.project.id)}>

                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Assigned To
                      </label>
                      <p className="mt-1 text-lg font-semibold underline ">
                        {task.project.name}
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Due Date
                    </label>
                    <p className="mt-1 text-lg font-semibold">
                      {task.due_date}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Create Date
                    </label>
                    <p className="mt-1 text-lg font-semibold">
                      {task.created_at}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Updated By
                    </label>
                    <p className="mt-1 text-lg font-semibold">
                      {task.updatedBy.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Updated By
                    </label>
                    <p className="mt-1 text-lg font-semibold">
                      {task.assignedUser.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <label className="text-xl font-bold text-gray-900 dark:text-white">
                  Task Description
                </label>
                <p className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {task.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg">
            {/* <div className="p-6 text-gray-900 dark:text-gray-100">
        <TasksTable
          tasks={tasks}
          success={success}
          queryParams={queryParams}
          hideTaskColumn={true}
        />
      </div> */}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
{
  /* <span className="text-lg bg-transparent text-gray-100 absolute bottom-6 right-6">Project ({task.project.name})</span> */
}
