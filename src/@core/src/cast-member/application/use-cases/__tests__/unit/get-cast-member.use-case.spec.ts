import { GetCastMemberUseCase } from "../../get-cast-member.use-case";
import { CastMemberInMemoryRepository } from "../../../../infra/db/in-memory";
import { NotFoundError } from "../../../../../@shared/domain";
import { CastMember } from "../../../../domain/entities/cast-member";

describe("GetCastMemberUseCase Unit Tests", () => {
  let useCase: GetCastMemberUseCase.UseCase;
  let repository: CastMemberInMemoryRepository;

  beforeEach(() => {
    repository = new CastMemberInMemoryRepository();
    useCase = new GetCastMemberUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity not found using ID fake id`)
    );
  });

  it("should returns a cast member", async () => {
    const castMember = CastMember.fake().anActor().build();
    const items = [castMember];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: castMember.id.value });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: castMember.id.value,
      name: castMember.name,
      type: castMember.type.value,
      created_at: castMember.created_at,
    });
  });
});
