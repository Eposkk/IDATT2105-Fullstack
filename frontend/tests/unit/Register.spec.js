import { shallowMount } from "@vue/test-utils";
import Register from "@/views/register";
import store from "@/store";

describe("Register view", () => {
  test("Test that text fields correspond to data", async () => {
    const wrapper = shallowMount(Register);
    const user = {
      username: "testUser",
      password: "testPassword",
    };
    await wrapper
      .find('[data-test="usernameRegInput"]')
      .setValue(user.username);
    await wrapper
      .find('[data-test="passwordRegInput"]')
      .setValue(user.password);

    await wrapper.find('[data-test="button"]').trigger("click");

    expect(wrapper.vm.user.username).toBe(user.username);
    expect(wrapper.vm.user.password).toBe(user.password);
  });

  test("Test a successfull registration", async () => {
    const wrapper = shallowMount(Register);
    const user = {
      username: "testUser",
      password: "testPassword",
    };
    await wrapper
      .find('[data-test="usernameRegInput"]')
      .setValue(user.username);
    await wrapper
      .find('[data-test="passwordRegInput"]')
      .setValue(user.password);

    await wrapper.find('[data-test="button"]').trigger("click");

    expect(store.state.users.at(store.state.users.length - 1).username).toBe(
      user.username
    );
    expect(store.state.users.at(store.state.users.length - 1).password).toBe(
      user.password
    );
  });

  test("Unsuccessful registration (Not filled out reqiured information)", async () => {
    const wrapper = shallowMount(Register);
    const lenghtOfUsersBeforeFailedAdd = store.state.users.length;
    await wrapper.find('[data-test="button"]').trigger("click");

    expect(store.state.users.length).toBe(lenghtOfUsersBeforeFailedAdd);
    expect(wrapper.find('[data-test="registrationStatus"]').text()).toBe(
      "Please fill out the registration"
    );
  });
});
