import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  async function submitHandler(e) {
    e.preventDefault();

    const oldPassValue = oldPasswordRef.current.value;
    const newPassValue = newPasswordRef.current.value;

    const passwordChanges = {
      oldPassword: oldPassValue,
      newPassword: newPassValue,
    };

    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordChanges),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.json();

    console.log(data);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
