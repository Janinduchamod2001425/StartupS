"use client";

import React, { useState } from "react";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form action={() => {}} className="startup-form">
      {/*Title*/}
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {errors.title && <p className="startup-from_error">{errors.title}</p>}
      </div>

      {/*Title*/}
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {errors.title && <p className="startup-from_error">{errors.title}</p>}
      </div>
    </form>
  );
};
export default StartupForm;
