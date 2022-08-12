export function apiResponseErrors(error: any) {
  if (error.response) {
    return error.response.data;
  }

  return {
    message: 'Erro interno do sistema',
  };
}
