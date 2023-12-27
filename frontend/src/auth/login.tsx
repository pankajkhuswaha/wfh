"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/lib/axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import Input from "@/components/forms/hookFormInput";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const formInputs = [
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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const loginuser = async (credential: any) => {
    return await fetchApi("POST", "users/login", credential);
  };

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginuser,
  });
  const onSubmit = async (data: any) => {
    try {
      const { role } = await mutateAsync(data);
      switch (role) {
        case "admin":
          navigate("/admin");
          toast.success("Login successful");
          break;
        case "employee":
          navigate("/employee");
          toast.success("Login successful");
          break;
        default:
          toast.info("Login Denied from Admin");
          navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };
  return (
    <div className="flex justify-center items-center py-12 px-1">
      <div className="w-full md:w-1/2 lg:w-[500px] morphism p-4 md:p-10 morphism flex flex-wrap">
        <h1 className="text-center w-full text-4xl mb-5 font-bold">
          Login to Continue !! <br /> 🎉🎉
        </h1>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap">
            {formInputs.map((input, index) => (
              <Input key={index} control={control} errors={errors} {...input} />
            ))}
          </div>
          {error && (
            <p className="text-red-600 dark:text-red-400 mt-3 font-semibold text-md">
              Error : {error.message && error.message} !!
            </p>
          )}
          <Button
            disabled={isPending}
            className="gradient disabled:opacity-70 w-full p-2 rounded mt-3"
          >
            {isPending ? "Loging In..." : "Log In"}
          </Button>
          <div className="flex justify-between items-center px-2 mt-2">
            <p>Not Register with us ?</p>
            <Button>
              <Link
                to={"/signup"}
              >
                Sign up
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
