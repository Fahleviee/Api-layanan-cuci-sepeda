const validator = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (result.error) {
    return {
      error: result.error.details.map((detail) => detail.message),
      value: null,
    };
  }

  return {
    error: null,
    value: result.value,
  };
};

export default validator;