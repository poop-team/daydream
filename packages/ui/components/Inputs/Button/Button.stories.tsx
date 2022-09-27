import React from "react";
import { Meta, Story } from "@storybook/react";

import Button, { ButtonProps } from "./Button";

export default {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "This is a button component.",
      },
    },
  },
  argTypes: {
    color: {
      description: "Color of the button",
      defaultValue: "primary",
      control: {
        type: "string",
      },
    },
    disabled: { description: "Whether the button is disabled" },
    text: { description: "The content of the button" },
  },
} as Meta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// Unmodified default Button
export const Default = Template.bind({});
Default.args = {
  text: "Default",
};

// Button with disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  text: "Disabled Button",
};
