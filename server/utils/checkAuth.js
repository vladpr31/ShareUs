export const validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty.";
  } else {
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(pattern)) {
      errors.email = "Not A Valid Email Address.";
    }
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
