import { TRASH_TYPES } from "@/constants/Result";
import { FileDto } from "./FileDto";
import { STATUS } from "@/components/Progress";
import { AreaDto } from "./AreaDto";
import { UserDto } from "./UserDto";

export interface WasteQuantityDto {
  quantity: number;
  volume: number;
}

export interface CreateReportDto {
  categories: Array<keyof typeof TRASH_TYPES>;
  reportType: string;
  quantities: WasteQuantityDto;
  collectedAt: string;
  areaId: string;
  image: FileDto;
}

export interface ReportDto {
  id: string;
  status: keyof typeof STATUS;
  categories: string[]; // 카테고리 설정 필요
  reportType: string; // 어떤 값 있는 지 질문 필요
  quantities: WasteQuantityDto;
  createdAt: string;
  collectdAt: string;
  updatedAt: string;
  area: AreaDto;
  reporter: UserDto;
}

export interface InfinityPaginationReportResponseDto {
  data: ReportDto;
  hasNextPage: boolean;
  total: number;
}
