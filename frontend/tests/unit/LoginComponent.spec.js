import { shallowMount } from "@vue/test-utils";
import LoginComponent from "@/components/LoginComponent";
import store from "@/store";

describe("LoginComponent", () => {
  beforeEach(() => {
    const user = { username: "eivind", password: "12345678" };
    store.commit("ADD_USER", user);
  });

  test("If username and password is correct, return user to login screen", async () => {
    const wrapper = shallowMount(LoginComponent);

    await wrapper.find('[data-test="userInput"]').setValue("eivind");
    await wrapper.find('[data-test="passwordInput"]').setValue("12345678");
    await wrapper.find('[data-test="button"]').trigger("click");

    expect(wrapper.find('[data-test="loginStatus"]').text()).toBe("Logged in");
  });

  test("If user does not exist, display correct loginstatus", async () => {
    const wrapper = shallowMount(LoginComponent);

    await wrapper.find('[data-test="userInput"]').setValue("eiv");
    await wrapper.find('[data-test="passwordInput"]').setValue("12345678");
    await wrapper.find('[data-test="button"]').trigger("click");
    expect(wrapper.find('[data-test="loginStatus"]').text()).toBe(
      "Username not found, register by clicking me"
    );
  });

  test("If user exists but password is wrong, dispaly correct Loginstatus", async () => {
    const wrapper = shallowMount(LoginComponent);

    await wrapper.find('[data-test="userInput"]').setValue("eivind");
    await wrapper
      .find('[data-test="passwordInput"]')
      .setValue("Username or password is wrong, register by clicking me");
    await wrapper.find('[data-test="button"]').trigger("click");
    expect(wrapper.find('[data-test="loginStatus"]').text()).toBe(
      "Username or password is wrong, register by clicking me"
    );
  });
});
