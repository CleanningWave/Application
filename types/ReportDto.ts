import { TRASH_TYPES } from "@/constants/Result";
import { FileDto } from "./FileDto";
import { STATUS } from "@/components/Progress";
import { AreaDto } from "./AreaDto";
import { UserDto } from "./UserDto";

export interface WasteQuantityDto {
  quantity: number;
  volume: number;
}

export type CategorieType = `${TRASH_TYPES}`;

export type CategoriesType = Array<CategorieType>;

export interface CreateReportDto {
  categories: CategoriesType;
  reportType: string;
  quantities: Array<WasteQuantityDto>;
  collectedAt: string;
  areaId: string;
  image: Array<FileDto>;
}

export interface ReportDto {
  id: string;
  status: keyof typeof STATUS;
  categories: CategoriesType;
  reportType: string; // 어떤 값 있는 지 질문 필요
  quantities: WasteQuantityDto;
  createdAt: string;
  collectedAt: string;
  updatedAt: string;
  area: AreaDto;
  reporter: UserDto;
}

export interface InfinityPaginationReportResponseDto {
  data: ReportDto;
  hasNextPage: boolean;
  total: number;
}
