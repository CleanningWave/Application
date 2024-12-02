import { AreaDto, MunicipalityDto } from "./AreaDto";

export interface UserDto {
  id: string;
  loginId: string;
  name: string;
  phoneNumber: string;
  role: "FIELD_WORKER";
  status: "PENDING" | "APPROVED" | "REJECTED";
  lastCollectionDate: string;
  municipalityId: string;
  municipality: MunicipalityDto;
  managingAreas: AreaDto;
  assignedAreas: AreaDto;
}

export interface LoginReq extends Pick<UserDto, "loginId"> {
  password: string;
}

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
  refreshTokenExpires: number;
  user: UserDto & { assignedAreas: Array<AreaDto> };
}

export type RefreshRes = Pick<
  LoginRes,
  "accessToken" | "refreshToken" | "tokenExpires"
>;
