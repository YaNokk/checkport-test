import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { notify } from "@/shared/ui";
import { HTTPErrorMessage, HTTPValidationError } from "@/shared/api/types";

const statusCodeToError: Record<string, string> = {
  "204": "Данные не найдены",
  "400": "Ошибка данных",
  "422": "Ошибка валидации",
  "500": "Сервис временно не доступен",
  "404": "Не найдено",
  FETCH_ERROR: "Ошибка фетч",
  PARSING_ERROR: "Ошибка парсинга",
  TIMEOUT_ERROR: "Ошибка таймаута",
};

function getStatusCode(key?: keyof typeof statusCodeToError) {
  return key && key in statusCodeToError
    ? statusCodeToError[key]
    : "Неизвестная ошибка";
}

function handleValidationError(
  error: HTTPValidationError,
  status: keyof typeof statusCodeToError,
) {
  notify({
    type: "error",
    text: getStatusCode(status),
    description:
      error.detail
        ?.map(({ msg, type, loc }) => `Ошибка: ${type}, ${msg}, (${loc})`)
        .join("\n") || "",
  });
}

function handleErrorMessage(
  error: HTTPErrorMessage,
  status: keyof typeof statusCodeToError,
) {
  notify({
    type: "error",
    text: `Ошибка! Код ${status}`,
    description: error.message,
  });
}

function handleGenericError(status: keyof typeof statusCodeToError) {
  notify({
    type: "error",
    text: `Ошибка! Код ${status}`,
    description: getStatusCode(status),
  });
}

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API });

export const extendedQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const status = String(result.error?.status) as keyof typeof statusCodeToError;
  const error = result.error?.data as HTTPValidationError | HTTPErrorMessage;

  if (!result.error) return result;
  if (result.error.status === 422 && !("message" in error)) {
    handleValidationError(error as HTTPValidationError, status);
  } else if ("message" in error) {
    handleErrorMessage(error as HTTPErrorMessage, status);
  } else {
    handleGenericError(status);
  }

  return result;
};
