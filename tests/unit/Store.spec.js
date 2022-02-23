import store from "@/store";

describe("Store tests", () => {
  test("Test ADD_USER", () => {
    const user = {
      username: "testPerson",
      password: "12345678",
    };
    store.commit("ADD_USER", user);
    expect(store.state.users.pop()).toStrictEqual(user);
  });

  test("Test getting user if no users exist", () => {
    expect(store.state.users.pop()).toBeUndefined();
  });

  test("Test SET_USERS", () => {
    const user1 = {
      username: "testPerson",
      password: "12345678",
    };
    const user2 = {
      username: "testPerson2",
      password: "12345678",
    };
    const user3 = {
      username: "testPerson3",
      password: "12345678",
    };
    const users = [];
    users.push(user1);
    users.push(user2);
    users.push(user3);

    store.commit("SET_USERS", users);

    expect(store.state.users.length).toEqual(3);
    expect(store.state.users.pop()).toStrictEqual(user3);
    expect(store.state.users.pop()).toStrictEqual(user2);
    expect(store.state.users.pop()).toStrictEqual(user1);
  });
});
