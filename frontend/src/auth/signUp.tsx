/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import fetchApi from "@/lib/axios";
import Input from "@/components/forms/hookFormInput";
import { Link } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const signupUser = async (user: any) => {
    return await fetchApi("POST", "users/signup", user);
  };

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupUser,
  });

  const formInputs = [
    {
      name: "fullName",
      label: "Enter your Full name",
      placeholder: "Pankaj kumar",
      className: "w-full",
      rules: {
        maxLength: 20,
        required: "Name is required to continue",
        pattern: {
          value: /^[a-zA-Z\s]+$/,
          message:
            "Please enter a valid name (only letters and spaces allowed)",
        },
      },
    },
    {
      name: "mobile",
      label: "Enter your mobile number",
      placeholder: "9315488658",
      className: "w-full",
      rules: {
        maxLength: 15,
        required: "Mobile no is required",
        pattern: {
          value: /^\d{10}$/,
          message: "Please enter a valid Mobile No",
        },
      },
    },
    {
      name: "email",
      label: "Enter your email",
      placeholder: "example@gmail.com",
      className: "w-full",
      rules: {
        maxLength: 30,
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email",
        },
      },
    },
    {
      name: "password",
      label: "Enter your Password",
      placeholder: "#SomeToughPassword123",
      className: "w-full",
    },
  ];

  const onSubmit = async (data: unknown) => {
    try {
      await mutateAsync(data);
      toast.success("SignUp successful");
      navigate("/login");
    } catch (error) {
      toast.error("SignUp failed");
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center py-12 px-1">
        <div className="w-full mx-3 lg:w-1/2 xl:w-[550px] morphism p-4 md:p-10 morphism flex flex-wrap">
          <h1 className="text-center w-full text-2xl mt-1 mb-4 font-bold">
            Welcome to Deepnap Softech
          </h1>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap">
              {formInputs.map((input, index) => (
                <Input
                  key={index}
                  control={control}
                  errors={errors}
                  {...input}
                />
              ))}
            </div>
            {error && (
              <p className="text-red-600 dark:text-red-400 mt-3 font-semibold text-md">
                Error : {error.message && error.message} !!
              </p>
            )}
            <Button
              disabled={isPending}
              className="gradient disabled:opacity-70 w-full p-2 rounded mt-6"
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </Button>
            <div className="flex mt-6 justify-between items-center px-2">
              <p>Not Register with us ?</p>
              <Button>
                <Link
                  to={"/login"}
                >
                  Login
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
