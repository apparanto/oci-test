'use client';

import { FormEvent } from 'react';

export default function Punchout() {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log('Starting Punchout');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userId = formData.get('userId');
    const password = formData.get('password');

    const response = await fetch('/api/oci/punchout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, password }),
    });
    const { webshopURL } = await response.json();

    alert(webshopURL);
    window.location.href = webshopURL;
  };

  return (
    <div className="w-96">
      <form onSubmit={onSubmit} className="flex flex-col w-full">
        <label htmlFor="userId" className="w-48">
          UserId
        </label>
        <input type="text" name="userId" className="p-1 border" />

        <label htmlFor="password" className="pt-2">
          Password
        </label>
        <input type="password" name="password" className="p-1 border" />

        <button
          type="submit"
          className="p-1 border mt-4 bg-slate-500 hover:bg-slate-600 text-slate-50">
          Punchout
        </button>
      </form>
    </div>
  );
}
