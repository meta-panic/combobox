import React from "react";

export type N = { value: number };
export const NumberComponent = ({ value }: N) => {
  return <>Number: {value}</>;
};
