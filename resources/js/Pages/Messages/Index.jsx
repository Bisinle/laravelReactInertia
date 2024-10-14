import React from "react";
import { Link } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({ users }) => {
  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Messages</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              <Link
                href={route("messages.show", user.id)}
                className="text-blue-600 hover:underline"
              >
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
