interface InputsValue {
  first: string;
  last: string;
  phone: string;
  email: string;
  password: string;
}

const normalizeData = (
  inputsValue: InputsValue,
  isAdmin: boolean
): Record<string, any> => {
  return {
    firstName: inputsValue.first,
    lastName: inputsValue.last,
    phone: inputsValue.phone,
    email: inputsValue.email,
    password: inputsValue.password,
    isAdmin: isAdmin,
  };
};

export { normalizeData };
