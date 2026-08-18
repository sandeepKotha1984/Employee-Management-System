export type UserLoginPayload = {
  email: string;
  password: string;
};

export type UserSession = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export const loginUser = async (
  payload: UserLoginPayload
): Promise<UserSession> => {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Login failed');
  }

  return response.json();
};
