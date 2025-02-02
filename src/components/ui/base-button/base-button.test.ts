import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";

import BaseButton from "./base-button.vue";

describe("base-button tests", () => {
  it("renders with default props", () => {
    const wrapper = mount(BaseButton);

    expect(wrapper.classes()).toContain("base-button");
    expect(wrapper.classes()).toContain("base-button--primary");
    expect(wrapper.text()).toBe("");
  });

  it("renders with labelText props", () => {
    const labelText = "Click, me!";

    const wrapper = mount(BaseButton, {
      props: {
        labelText,
      },
    });

    expect(wrapper.text()).toBe(labelText);
  });

  it("renders with loading props", () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.find(".loader").exists()).toBeTruthy();
  });

  describe("renders with btnType props", () => {
    it("renders primary button", () => {
      const wrapper = mount(BaseButton, {
        props: {
          type: "primary",
        },
      });

      expect(wrapper.classes()).toContain("base-button--primary");
      expect(wrapper.classes()).not.toContain("base-button--danger");
    });

    it("renders danger button", () => {
      const wrapper = mount(BaseButton, {
        props: {
          type: "danger",
        },
      });

      expect(wrapper.classes()).toContain("base-button--danger");
      expect(wrapper.classes()).not.toContain("base-button--primary");
    });
  });
});
