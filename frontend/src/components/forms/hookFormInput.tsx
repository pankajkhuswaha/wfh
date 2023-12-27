/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller, useForm } from "react-hook-form";
type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  name: string;
  id?: string;
  className?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  control: any;
  rules?: any;
  errors?: any;
};

const Input = (props: InputProps) => {
  const {
    name,
    label,
    placeholder,
    type,
    id,
    required,
    className,
    control,
    rules,
    errors,
  } = props;
  const { setValue } = useForm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(name, value);
  };
  const error = errors && errors[name] ? true : false;
  const showInputError = (feild: string) => {
    if (errors) {
      return (
        <div className="text-md mt-1 text-red-500">
          {errors[feild] && errors[feild].type === "pattern" && (
            <p>{errors[feild].message as string}</p>
          )}
          {errors[feild] && errors[feild].type === "required" && (
            <p>
              {errors[feild].message
                ? (errors[feild].message as string)
                : "This field is required"}
            </p>
          )}
          {errors[feild] && errors[feild].type === "maxLength" && (
            <p>
              {errors[feild].message
                ? (errors[feild].message as string)
                : "This field execed maximum length"}
            </p>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <div className={`mt-2 ${className ? className : ""}`}>
        <label className="block text-gray-700 dark:text-gray-200">
          {label}
        </label>
        <div className="w-full">
          <Controller
            name={name}
            rules={rules}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <>
                <input
                  type={`${type ? type : "text"}`}
                  id={id}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2 rounded-lg mt-2 border-2 
                focus:bg-white focus:outline-none bg-gray-200 dark:bg-gray-800 ${
                  error
                    ? "border-red-600 focus:border-red-500 outline-none"
                    : "focus:border-blue-500 outline-none"
                }  `}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                  value={field.value}
                  required={required ? required : false}
                />
                {showInputError(name)}
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
