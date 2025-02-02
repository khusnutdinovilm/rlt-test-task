import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";

import BaseInput from "./base-input.vue";
import type { IBaseInputProps } from "./types";

const mountBaseInput = (customProps: IBaseInputProps = {}) => {
  return mount(BaseInput, {
    props: {
      modelValue: "",
      ...customProps,
    },
  });
};

describe("base-input tests", () => {
  describe("renders with props", () => {
    it("renders with default props", () => {
      const wrapper = mountBaseInput();

      expect(wrapper.find(".base-input__field[type='text']").exists()).toBe(true);
      expect(wrapper.find("input.base-input__field").attributes("placeholder")).toBeUndefined();
      expect(wrapper.classes()).not.toContain("base-input--danger");
    });

    it("renders with placeholder", () => {
      const placeholder = "Input Email";

      const wrapper = mountBaseInput({
        placeholder,
      });

      expect(wrapper.find("input.base-input__field").attributes("placeholder")).toBe(placeholder);
    });

    it("renders with error", () => {
      const wrapper = mountBaseInput({
        error: true,
      });

      expect(wrapper.classes()).toContain("base-input--danger");
    });

    it("renders with different input type", () => {
      const wrapperText = mountBaseInput({
        type: "text",
      });

      expect(wrapperText.find(".base-input__field[type='text']").exists()).toBe(true);

      const wrapperNumber = mountBaseInput({
        type: "number",
      });

      expect(wrapperNumber.find(".base-input__field[type='number']").exists()).toBe(true);
    });
  });

  describe("renders with v-model", () => {
    it("modelValue should be update", async () => {
      const modelValue = "some-text";

      const wrapper = mount(BaseInput, {
        props: {
          "modelValue": "initialValue",
          "onUpdate:modelValue": e => wrapper.setProps({ modelValue: e }),
        },
      });

      await wrapper.find("input.base-input__field").setValue(modelValue);
      expect(wrapper.props("modelValue")).toBe(modelValue);
    });

    it("if type number modelValue should be update only if value is number", async () => {
      let modelValue: string | number = 12;

      const wrapper = mount(BaseInput, {
        props: {
          "type": "number",
          "modelValue": "initialValue",
          "onUpdate:modelValue": e => wrapper.setProps({ modelValue: e }),
        },
      });

      modelValue = "twelve";

      await wrapper.find("input.base-input__field").setValue(modelValue);
      expect(wrapper.props("modelValue")).toBe("");
    });
  });
});
