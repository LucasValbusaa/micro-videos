export const stubValidateFieldName = [
  {
    validate_value: null,
    validate_message: {
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    },
  },
  {
    validate_value: { name: "" },
    validate_message: {
      name: ["name should not be empty"],
    },
  },
  {
    validate_value: { name: 5 as any },
    validate_message: {
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    },
  },
  {
    validate_value: { name: "t".repeat(256) },
    validate_message: {
      name: ["name must be shorter than or equal to 255 characters"],
    },
  },
];

export const stubValidFields = [
  { name: "some value" },
  { name: "some value", description: undefined },
  { name: "some value", description: null },
  { name: "some value", description: "" },
  { name: "some value", is_active: true },
  { name: "some value", is_active: false },
];
