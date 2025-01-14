import { api } from '@/http/api-client';

interface GetProfileResponse {
  user: {
    id: string;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  };
}

export async function getProfile(): Promise<GetProfileResponse> {
  const result = await api.get('profile').json<GetProfileResponse>();

  return result;
}
