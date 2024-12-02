import { COLLECT_TYPE, TRASH_TYPES } from "@/constants/Result";
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

export type ReportType = keyof typeof COLLECT_TYPE;

export interface CreateReportDto {
  categories: CategoriesType;
  reportType: ReportType;
  quantities: Array<WasteQuantityDto>;
  collectedAt: string;
  areaId: string;
  images: Array<FileDto>;
}

export interface ReportDto {
  id: string;
  status: keyof typeof STATUS;
  categories: CategoriesType;
  reportType: ReportType;
  quantities: Array<WasteQuantityDto>;
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
