interface ApiResponseBase {
  success: boolean;
  status: number;
}

interface ApiSuccessResponse<T> extends ApiResponseBase {
  data: T;
}

interface ApiErrorResponse<T> extends ApiResponseBase {
  message: string;
  error?: T;
}

const createResponse = (status: number, body: ApiResponseBase) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiSuccessResponse = <T>(status: number = 200, data: T) => {
  const body: ApiSuccessResponse<T> = {
    success: true,
    status,
    data,
  };
  return createResponse(status, body);
};

export const apiErrorResponse = <T>(
  status: number,
  message: string,
  error?: T
) => {
  const body: ApiErrorResponse<T> = {
    success: false,
    status,
    message,
    error,
  };
  return createResponse(status, body);
};
