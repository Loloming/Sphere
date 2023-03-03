import React, { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  return <h1>Register component</h1>;
}
