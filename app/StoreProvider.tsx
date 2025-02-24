// app/StoreProvider.jsx
'use client';

import { Provider } from "react-redux";
import { store } from "./lib/store"; // Ensure correct import path

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
