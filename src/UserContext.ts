import {createContext} from "react";
import type {User} from "./data/data-model.ts";

export const UserContext = createContext<User | null>(null);
