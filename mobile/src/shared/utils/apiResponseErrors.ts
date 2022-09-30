export function apiResponseErrors(error: any) {
  console.error('Error ->', error);
  if (error.response) {
    return error.response.data;
  }

  return {
    message: 'Erro interno do sistema',
  };
}
