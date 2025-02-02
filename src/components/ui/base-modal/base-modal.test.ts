import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";

import CrossIcon from "icons/cross-icon.vue";
import BaseModal from "./base-modal.vue";

describe("base-modal tests", () => {
  it("renders modal when isShowModal = true", () => {
    const modalTitle = "Test Modal";
    const wrapper = mount(BaseModal, {
      props: {
        modalTitle,
        modelValue: true,
      },
      global: {
        stubs: {
          Teleport: true,
          CrossIcon,
        },
      },
    });

    expect(wrapper.find(".base-modal").exists()).toBe(true);
    expect(wrapper.find(".base-modal__title").text()).toBe(modalTitle);
  });

  it("hide modal when isShowModal = false", () => {
    const modalTitle = "Test Modal";
    const wrapper = mount(BaseModal, {
      props: {
        modalTitle,
        modelValue: false,
      },
      global: {
        stubs: {
          Teleport: true,
          CrossIcon,
        },
      },
    });

    expect(wrapper.find(".base-modal").exists()).toBe(false);
  });

  it("check emit 'update:modelValue' when click on close-icon", async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modalTitle: "Test Modal",
        modelValue: true,
      },
      global: {
        stubs: { Teleport: true, CrossIcon: CrossIcon },
      },
    });

    await wrapper.find(".base-modal__close-icon").trigger("click");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([false]);
  });

  it("does not close modal when clicking inside modal body", async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modalTitle: "Test Modal",
        modelValue: true,
      },
      global: {
        stubs: { Teleport: true, CrossIcon: CrossIcon },
      },
    });

    await wrapper.find(".base-modal__body").trigger("click");
    expect(wrapper.emitted()["update:modelValue"]).toBeFalsy();
  });

  it("renders slot content", async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modalTitle: "Test Modal",
        modelValue: true,
      },
      slots: {
        "base-modal-content": "<p>modal-content</p>",
      },
      global: {
        stubs: { Teleport: true, CrossIcon: CrossIcon },
      },
    });

    expect(wrapper.find(".base-modal__content").html()).toContain("modal-content");
  });

  it("renders slot footer", async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modalTitle: "Test Modal",
        modelValue: true,
      },
      slots: {
        "base-modal-btns": "<p>modal-btns</p>",
      },
      global: {
        stubs: { Teleport: true, CrossIcon: CrossIcon },
      },
    });

    expect(wrapper.find(".base-modal__btns").html()).toContain("modal-btns");
  });
});
