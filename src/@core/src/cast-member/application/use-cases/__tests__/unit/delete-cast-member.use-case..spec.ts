import { DeleteCastMemberUseCase } from "../../delete-cast-member.use-case";
import { CastMemberInMemoryRepository } from "../../../../infra/db/in-memory";
import { NotFoundError } from "../../../../../@shared/domain";
import { CastMember } from "../../../../domain/entities/cast-member";

describe("DeleteCastMemberUseCase Unit Tests", () => {
  let useCase: DeleteCastMemberUseCase.UseCase;
  let repository: CastMemberInMemoryRepository;

  beforeEach(() => {
    repository = new CastMemberInMemoryRepository();
    useCase = new DeleteCastMemberUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity not found using ID fake id`)
    );
  });

  it("should delete a cast member", async () => {
    const castMember = CastMember.fake().anActor().build();
    const items = [castMember];
    repository.items = items;
    await useCase.execute({
      id: castMember.id.value,
    });
    expect(repository.items).toHaveLength(0);
  });
});
