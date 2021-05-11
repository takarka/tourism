export interface AuthDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  auth_token: string;
}
