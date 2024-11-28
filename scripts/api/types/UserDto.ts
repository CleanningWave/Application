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
