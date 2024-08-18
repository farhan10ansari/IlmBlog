import { FC, useState } from "react";
import { Icon, IconEye, IconEyeOff } from "@tabler/icons-react";
import ActionButton from "./ActionButton";

type FormInputProps = {
  name: string,
  type: string,
  id?: string,
  value?: string,
  placeholder: string,
  Icon: Icon
}

const FormInput: FC<FormInputProps> = ({ name, type, id, value, placeholder, Icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={
          type == "password" ? (passwordVisible ? "text" : "password") : type
        }
        required
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <Icon className="input-icon" size={20} />


      {type == "password" ? (
        <ActionButton
          handleClick={(e) => {
            e.preventDefault()
            setPasswordVisible((currentValue) => !currentValue)
          }}
          className="input-icon left-[auto] right-4 cursor-pointer"
        >
          {
            passwordVisible ? <IconEye size={20} /> :
              <IconEyeOff size={20} />
          }

        </ActionButton>

      ) : (
        <></>
      )}
    </div>
  );
};

export default FormInput;
