export interface Environment {
  production: boolean;
  apiUrl: string;
}

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:8080/sb-inventory-service/api/v1'
};
