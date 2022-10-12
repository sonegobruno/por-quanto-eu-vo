import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
  field?: string;
}

const IMPREVIOULY_ERROR: ErrorResponse = {
  message:
    'Erro não previsto pela aplicação. Por favor, contate o suporte para verificação.',
};

function hasKey<K extends string, T extends object>(
  key: K,
  object: T,
): object is T & Record<K | 'field', string> {
  return key in object;
}

export function apiResponseErrors(error: unknown): ErrorResponse {
  if (error instanceof AxiosError) {
    console.error('Axios Error ->', error);
    const axiosError: AxiosError<object> = error;
    console.error('Axios Error Response ->', axiosError.response);
    if (!axiosError.response) return IMPREVIOULY_ERROR;
    if (!hasKey('message', axiosError.response.data)) return IMPREVIOULY_ERROR;

    return axiosError.response.data;
  }

  console.error('Internal Error ->', error);
  return {
    message: 'Erro interno do sistema',
  };
}
