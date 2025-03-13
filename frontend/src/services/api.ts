export interface ResponseErrorType {
    message: string;
    errors: {
      [field: string]: string[];
    };
  }