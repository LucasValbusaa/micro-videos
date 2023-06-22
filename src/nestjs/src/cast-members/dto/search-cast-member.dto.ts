import { ListCastMembersUseCase } from "@micro-videos/core/src/cast-member/application";
import { SortDirection } from "@micro-videos/core/src/@shared/domain";
import { Types } from "@micro-videos/core/src/cast-member/domain";
import { Transform } from "class-transformer";

export class SearchCastMemberDto implements ListCastMembersUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @Transform(({ value }) => {
    if (value) {
      return {
        ...(value.name && { name: value.name }),
        ...(value.type && {
          // NaN será considerado como undefined ou null lá no SearchParams, então verificamos se é um número para manter o valor inválido original
          type: !Number.isNaN(parseInt(value.type))
            ? parseInt(value.type)
            : value.type,
        }),
      };
    }

    return value;
  })
  filter?: {
    name?: string;
    type?: Types;
  };
}
