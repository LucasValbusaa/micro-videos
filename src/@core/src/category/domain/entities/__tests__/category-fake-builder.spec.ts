import { Chance } from "chance";
import { CategoryFakeBuilder } from "../category-fake-builder";
import { UniqueId } from "../../../../@shared/domain";
import { CategoryId } from "../category";

describe("CategoryFakerBuilder Unit Tests", () => {
  describe("entity_id prop", () => {
    const faker = CategoryFakeBuilder.aCategory();
    it("should be undefined", () => {
      expect(faker["_entity_id"]).toBeUndefined();
    });

    test("withEntityId", () => {
      const uniqueId = new UniqueId();
      const $this = faker.withEntityId(uniqueId);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["_entity_id"]).toBe(uniqueId);

      faker.withEntityId(() => uniqueId);
      expect(faker["_entity_id"]()).toBe(uniqueId);

      expect(faker.entity_id).toBe(uniqueId);
    });

    it("should pass index to unique_entity_id factory", () => {
      let mockFactory = jest.fn().mockReturnValue(new UniqueId());
      faker.withEntityId(mockFactory);
      faker.build();
      expect(mockFactory).toHaveBeenCalledWith(0);

      mockFactory = jest.fn().mockReturnValue(new UniqueId());
      const fakerMany = CategoryFakeBuilder.theCategories(2);
      fakerMany.withEntityId(mockFactory);
      fakerMany.build();

      expect(mockFactory).toHaveBeenCalledWith(0);
      expect(mockFactory).toHaveBeenCalledWith(1);
    });
  });
  describe("name prop", () => {
    const faker = CategoryFakeBuilder.aCategory();
    it("should be a function", () => {
      expect(typeof faker["_name"] === "function").toBeTruthy();
    });

    it("should call the word method", () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, "word");
      faker["chance"] = chance;
      faker.build();
      expect(spyWordMethod).toHaveBeenCalled();
    });

    test("withName", () => {
      faker.withName("test name");
      expect(faker["_name"]).toBe("test name");

      faker.withName(() => "test name");
      //@ts-expect-error name is callable
      expect(faker["_name"]()).toBe("test name");

      expect(faker.name).toBe("test name");
    });

    it("should pass index to name factory", () => {
      const category = faker.withName((index) => `test name ${index}`);
      expect(category.name).toBe("test name 0");

      const fakeMany = CategoryFakeBuilder.theCategories(2);
      fakeMany.withName((index) => `test name ${index}`);
      const categories = fakeMany.build();
      expect(categories[0].name).toBe("test name 0");
      expect(categories[1].name).toBe("test name 1");
    });

    test("invalid empty case", () => {
      faker.withInvalidNameEmpty(undefined);
      expect(faker["_name"]).toBe(undefined);

      faker.withInvalidNameEmpty(null);
      expect(faker["_name"]).toBeNull();

      faker.withInvalidNameEmpty("");
      expect(faker["_name"]).toBe("");
    });

    test("invalid not string case", () => {
      faker.withInvalidNameNotAString();
      expect(faker["_name"]).toBe(5);

      faker.withInvalidNameNotAString(10);
      expect(faker["_name"]).toBe(10);

      faker.withInvalidNameNotAString(false);
      expect(faker["_name"]).toBeFalsy();
    });

    test("invalid to long case", () => {
      faker.withInvalidNameTooLong();
      expect(faker["_name"].length).toBe(256);

      faker.withInvalidNameTooLong("a".repeat(500));
      expect(faker["_name"].length).toBe(500);
    });
  });

  describe("description prop", () => {
    const faker = CategoryFakeBuilder.aCategory();
    it("should be a function", () => {
      expect(typeof faker["_description"] === "function").toBeTruthy();
    });

    it("should call the paragraph method", () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, "paragraph");
      faker["chance"] = chance;
      faker.build();
      expect(spyWordMethod).toHaveBeenCalled();
    });

    test("withDescription", () => {
      faker.withDescription("test description");
      expect(faker["_description"]).toBe("test description");

      faker.withDescription(() => "test description");
      //@ts-expect-error description is callable
      expect(faker["_description"]()).toBe("test description");
      expect(faker.description).toBe("test description");
    });

    it("should pass index to description factory", () => {
      const category = faker.withDescription(
        (index) => `test description ${index}`
      );
      expect(category.description).toBe("test description 0");

      const fakeMany = CategoryFakeBuilder.theCategories(2);
      fakeMany.withDescription((index) => `test description ${index}`);
      const categories = fakeMany.build();
      expect(categories[0].description).toBe("test description 0");
      expect(categories[1].description).toBe("test description 1");
    });

    test("invalid not string case", () => {
      faker.withInvalidDescriptionNotAString();
      expect(faker["_description"]).toBe(5);

      faker.withInvalidDescriptionNotAString(10);
      expect(faker["_description"]).toBe(10);

      faker.withInvalidDescriptionNotAString(false);
      expect(faker["_description"]).toBeFalsy();
    });
  });

  describe("is_active prop", () => {
    const faker = CategoryFakeBuilder.aCategory();
    it("should be a function", () => {
      expect(typeof faker["_is_active"] === "function").toBeTruthy();
    });

    test("activate", () => {
      faker.activate();
      expect(faker["_is_active"]).toBeTruthy();
    });

    test("deactivate", () => {
      faker.deactivate();
      expect(faker["_is_active"]).toBeFalsy();
    });

    test("invalid empty case", () => {
      faker.withInvalidIsActiveEmpty(undefined);
      expect(faker["_is_active"]).toBe(undefined);

      faker.withInvalidIsActiveEmpty(null);
      expect(faker["_is_active"]).toBeNull();

      faker.withInvalidIsActiveEmpty("");
      expect(faker["_is_active"]).toBe("");
    });

    test("invalid not string case", () => {
      faker.withInvalidIsActiveNotABoolean();
      expect(faker["_is_active"]).toBe("fake boolean");

      faker.withInvalidIsActiveNotABoolean("any fake value");
      expect(faker["_is_active"]).toBe("any fake value");
    });
  });

  describe("created_at prop", () => {
    const faker = CategoryFakeBuilder.aCategory();
    it("should be undefined", () => {
      expect(faker["_created_at"]).toBeUndefined();
    });

    test("withCreatedAt", () => {
      const date = new Date();
      const $this = faker.withCreatedAt(date);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect(faker["_created_at"]).toBe(date);

      faker.withCreatedAt(() => date);
      expect(faker["_created_at"]()).toBe(date);
    });

    it("should pass index to name factory", () => {
      const date = new Date();
      faker.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const category = faker.build();
      expect(category.created_at.getTime()).toBe(date.getTime() + 2);

      const fakerMany = CategoryFakeBuilder.theCategories(2);
      fakerMany.withCreatedAt((index) => new Date(date.getTime() + index + 2));
      const categories = fakerMany.build();

      expect(categories[0].created_at.getTime()).toBe(date.getTime() + 0 + 2);
      expect(categories[1].created_at.getTime()).toBe(date.getTime() + 1 + 2);
    });
  });

  it("should create a category", () => {
    const faker = CategoryFakeBuilder.aCategory();
    let category = faker.build();

    expect(category.id).toBeInstanceOf(CategoryId);
    expect(typeof category.name === "string").toBeTruthy();
    expect(typeof category.description === "string").toBeTruthy();
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    const categoryId = new CategoryId();
    category = faker
      .withEntityId(categoryId)
      .withName("name test")
      .withDescription("description test")
      .deactivate()
      .withCreatedAt(created_at)
      .build();

    expect(category.id.value).toBe(categoryId.value);
    expect(category.name).toBe("name test");
    expect(category.description).toBe("description test");
    expect(category.is_active).toBeFalsy();
    expect(category.props.created_at).toEqual(created_at);
  });

  it("should create many categories", () => {
    const faker = CategoryFakeBuilder.theCategories(2);
    let categories = faker.build();

    categories.forEach((category) => {
      expect(category.id).toBeInstanceOf(CategoryId);
      expect(typeof category.name === "string").toBeTruthy();
      expect(typeof category.description === "string").toBeTruthy();
      expect(category.is_active).toBeTruthy();
      expect(category.created_at).toBeInstanceOf(Date);
    });

    const created_at = new Date();
    const categoryId = new CategoryId();
    categories = faker
      .withEntityId(categoryId)
      .withName("name test")
      .withDescription("description test")
      .deactivate()
      .withCreatedAt(created_at)
      .build();

    categories.forEach((category) => {
      expect(category.id.value).toBe(categoryId.value);
      expect(category.name).toBe("name test");
      expect(category.description).toBe("description test");
      expect(category.is_active).toBeFalsy();
      expect(category.props.created_at).toEqual(created_at);
    });
  });
});
