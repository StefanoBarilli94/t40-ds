import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./input-otp";
import { Label } from "./label";

const meta = {
  title: "Form/InputOTP",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Sotto il cofano è un singolo `<input>` con `inputmode` numerico: lo screen reader legge un normale campo di testo, gli slot visivi sono puramente decorativi.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="otp-story">Codice di verifica</Label>
      <InputOTP id="otp-story" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
};
