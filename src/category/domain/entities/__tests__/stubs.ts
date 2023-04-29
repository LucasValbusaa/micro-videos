export const stubInvalidNameProperty = [
  {
    value: null,
    message_error: {
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    },
  },
  {
    value: { name: "" },
    message_error: {
      name: ["name should not be empty"],
    },
  },
  {
    value: { name: 5 as any },
    message_error: {
      name: [
        "name must be a string",
        "name must be shorter than or equal to 255 characters",
      ],
    },
  },
  {
    value: { name: "t".repeat(256) },
    message_error: {
      name: ["name must be shorter than or equal to 255 characters"],
    },
  },
];

export const stubInvalidDescriptionProperty = [
  {
    value: { name: "Some Movie", description: 5 as any },
    message_error: {
      description: ["description must be a string"],
    },
  },
];

export const stubInvalidIsActiveProperty = [
  {
    value: { name: "Some Movie", is_active: "false" as any },
    message_error: {
      is_active: ["is_active must be a boolean value"],
    },
  },
  {
    value: { name: "Some Movie", is_active: "true" as any },
    message_error: {
      is_active: ["is_active must be a boolean value"],
    },
  },
  {
    value: { name: "Some Movie", is_active: 5 as any },
    message_error: {
      is_active: ["is_active must be a boolean value"],
    },
  },
];

export const stubInvalidCreatedAtProperty = [
  {
    value: { name: "Some Movie", created_at: "any_date" as any },
    message_error: {
      created_at: ["created_at must be a Date instance"],
    },
  },
  {
    value: { name: "Some Movie", created_at: false as any },
    message_error: {
      created_at: ["created_at must be a Date instance"],
    },
  },
  {
    value: { name: "Some Movie", created_at: 5 as any },
    message_error: {
      created_at: ["created_at must be a Date instance"],
    },
  },
];
