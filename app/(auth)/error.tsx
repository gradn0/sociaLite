"use client";
import { redirect } from "next/navigation";

const error = () => {
  redirect("/sign-in");
};

export default error;
