/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

export interface HTTPErrorMessage {
  message: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** PaginatorMenu */
export interface PaginatorMenu<T> {
  /**
   * Количество страниц
   * @exclusiveMin 0
   */
  max_pages: number;
  /** Data */
  data: T[];
}
