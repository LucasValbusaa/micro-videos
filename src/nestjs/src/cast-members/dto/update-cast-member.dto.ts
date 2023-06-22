import { UpdateCastMemberUseCase } from "@micro-videos/core/src/cast-member/application";
import { CreateCastMemberDto } from "./create-cast-member.dto";

export class UpdateCastMemberDto
  extends CreateCastMemberDto
  implements Omit<UpdateCastMemberUseCase.Input, "id"> {}
