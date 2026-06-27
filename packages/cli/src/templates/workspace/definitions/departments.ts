import type { RootDepartmentDefinition } from "../types.js";
import { strategyDepartment } from "./departments/strategy.js";
import { operationsDepartment } from "./departments/operations.js";
import { growthDepartment } from "./departments/growth.js";

export const rootDepartments: RootDepartmentDefinition[] = [
  strategyDepartment,
  operationsDepartment,
  growthDepartment
];
