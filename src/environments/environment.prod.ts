

export interface Environment {
  production: boolean;
  apiUrl: string;
}

export const environment: Environment = {
  production: true,
  apiUrl: 'http://72.60.104.250:8080/sb-inventory-service/api/v1'
};
