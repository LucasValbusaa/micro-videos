import { SortDirection } from "../pagination";

export function stubSearchParamsNumberToValidate(defaultExpectedValue: number) {
  return [
    { received: null, expected: defaultExpectedValue },
    { received: undefined, expected: defaultExpectedValue },
    { received: "", expected: defaultExpectedValue },
    { received: 0, expected: defaultExpectedValue },
    { received: -1, expected: defaultExpectedValue },
    { received: 5.5, expected: defaultExpectedValue },
    { received: true, expected: defaultExpectedValue },
    { received: false, expected: defaultExpectedValue },
    { received: {}, expected: defaultExpectedValue },
    { received: defaultExpectedValue, expected: defaultExpectedValue },
    { received: 10, expected: 10 },
  ];
}

export const stubSearchParamsStringToValidate = [
  { received: null, expected: null },
  { received: undefined, expected: null },
  { received: "", expected: null },
  { received: 0, expected: "0" },
  { received: -1, expected: "-1" },
  { received: 5.5, expected: "5.5" },
  { received: true, expected: "true" },
  { received: false, expected: "false" },
  { received: {}, expected: "[object Object]" },
  { received: "field", expected: "field" },
];

export const stubSortDirParamsValidate = [
  { received: null, expected: SortDirection.ASC },
  { received: undefined, expected: SortDirection.ASC },
  { received: "", expected: SortDirection.ASC },
  { received: 0, expected: SortDirection.ASC },
  { received: -1, expected: SortDirection.ASC },
  { received: 5.5, expected: SortDirection.ASC },
  { received: true, expected: SortDirection.ASC },
  { received: false, expected: SortDirection.ASC },
  { received: {}, expected: SortDirection.ASC },

  { received: "ASC", expected: SortDirection.ASC },
  { received: "asc", expected: SortDirection.ASC },
  { received: "DESC", expected: SortDirection.DESC },
  { received: "desc", expected: SortDirection.DESC },
];
