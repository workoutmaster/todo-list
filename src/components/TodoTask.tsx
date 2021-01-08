import React from "react";
import { auth } from "../firebase";
function TodoTask() {
  return (
    <div>
      <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  );
}

export default TodoTask;
