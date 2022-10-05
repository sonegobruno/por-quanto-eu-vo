interface ErrorResponse {
  message: string;
  field?: string;
}

export function apiResponseErrors(error: any): ErrorResponse {
  console.error('Error ->', error);
  if (error.response) {
    return error.response.data as ErrorResponse;
  }

  return {
    message: 'Erro interno do sistema',
  };
}
