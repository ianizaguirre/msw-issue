"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as http from "http";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//TODO: This should console log the value inside of .env.test (currently its incorrecly logging the value inside of .env.production.local)
console.log(API_BASE_URL);

type FormValues = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
  })
  .required();

export default function SampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_BASE_URL}/user`);
      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
    })();
  }, []);

  return (
    <div>
      <p id="first-name">{firstName}</p>
      <p id="last-name">{lastName}</p>
    </div>
  );
}
