import { Types } from "@micro-videos/core/src/cast-member/domain";
import { CreateCastMemberUseCase } from "@micro-videos/core/src/cast-member/application";
import { IsNotEmpty, IsString, IsIn, IsInt } from "class-validator";

export class CreateCastMemberDto implements CreateCastMemberUseCase.Input {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn([Types.ACTOR, Types.DIRECTOR])
  @IsInt()
  @IsNotEmpty()
  type: Types;
}
