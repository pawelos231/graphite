import { ReactNode } from "react";

export type Orientation = "vertical" | "horizontal";

export type SplitOptions = {
  orientation: Orientation;
  initialShare?: number;
  reverse?: boolean;
};

type ElementTab = {
  type: "ELEMENT";
  id: string;
  icon: ReactNode;
  element: ReactNode;
};

type FunctionalTab = {
  type: "FUNCTIONAL";
  id: string;
  icon: ReactNode;
  func: () => void;
};

export type Tab = ElementTab | FunctionalTab;
