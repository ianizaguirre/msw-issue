'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as http from 'http';
import { useEffect, useState } from 'react';

type FormValues = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
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

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.example.com/user');
      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
    })()
  }, []);

  return (
    <div>
      <p id="first-name">{firstName}</p>
      <p id="last-name">{lastName}</p>
    </div>
  );
}
