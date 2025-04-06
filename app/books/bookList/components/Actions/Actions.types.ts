import React from "react";

export interface IActions {
  setGridSize: React.Dispatch<React.SetStateAction<number>>;
  gridSize: number;
  matches: boolean;
}
