export interface UserDto {
  id: string;
  userName: string;
  token: string;
}

export interface LoginDto {
  userName: string;
  password: string;
}

export interface RegisterDto {
  userName: string;
  password: string;
}
