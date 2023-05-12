import React from "react";
import User from "../User/User";

export default function Users({ users }) {
  return (
    <div className="my-4">
        <h3 className="text-teal-50 text-2xl font-semibold">Users that may coincide with your search</h3>
        <div className="w-full h-24 mt-6 flex justify-center items-center">
        {users?.map((user, index) => {
            return <User key={index} user={user} />;
        })}
        </div>
    </div>
  );
}
