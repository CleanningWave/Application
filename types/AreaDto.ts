export interface MunicipalityDto {
  id: string;
  name: string;
  tel: string;
}

export interface AreaDto {
  id: string;
  name: string;
  detailAddress: string;
  civilServants: string[];
  municipality: MunicipalityDto
}
