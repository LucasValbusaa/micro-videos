import {
  CastMemberOutput,
  ListCastMembersUseCase,
} from "@micro-videos/core/src/cast-member/application";
import { Types } from "@micro-videos/core/src/cast-member/domain";
import { Transform } from "class-transformer";
import { CollectionPresenter } from "../../@shared/presenters/collection.presenter";

export class CastMemberPresenter {
  id: string;
  name: string;
  type: Types;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString().slice(0, 19) + ".000Z";
  })
  created_at: Date;

  constructor(output: CastMemberOutput) {
    this.id = output.id;
    this.name = output.name;
    this.type = output.type;
    this.created_at = output.created_at;
  }
}

export class CastMemberCollectionPresenter extends CollectionPresenter {
  data: CastMemberPresenter[];

  constructor(output: ListCastMembersUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CastMemberPresenter(item));
  }
}
