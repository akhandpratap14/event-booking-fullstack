import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { RegisterFormDataSchema } from "../../Utilities/SchemaValidation/registerSchema";
import useAuth from "../../Services/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useSignIn from "react-auth-kit/hooks/useSignIn";

type Inputs = z.infer<typeof RegisterFormDataSchema>;

const SignIn = () => {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(RegisterFormDataSchema),
  });

  const navigate = useNavigate();

  const signIn = useSignIn();

  const RegisterMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      if (
        signIn({
          auth: {
            token: data.token,
            type: "Bearer",
          },
          userState: {
            email: data.email,
            name: data.name,
          },
        })
      ) {
        toast.success("Login successful");
        navigate("/home");
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const obj = {
      name: data.name,
      email: data.email,
      type: data.type,
      username: data.username,
      password: data.password,
    };
    console.log("1", obj);
    RegisterMutation.mutate(obj);
  };

  return (
    <div className="h-screen w-screen bg-[#f1f4f9] px-10">
      <div className="flex items-center bg-[#f1f4f9] justify-between py-4">
        <div className="font-bold text-2xl">Sign Up</div>
        <div>
          <span className="text-lg text-gray-400">Dashboard</span> /{" "}
          <span className="text-lg">Sign Up</span>{" "}
        </div>
      </div>
      <div className=" w-full flex items-center border justify-center ">
        <div className="border-[0.5px] h-[85dvh] w-full py-5 shadow-xs divide-x bg-white flex justify-center items-center">
          <div className="h-full w-1/2 flex flex-col items-center justify-center">
            <div className="flex gap-x-2 justify-center items-center">
              <img
                src="logo/booking.png"
                alt="logo"
                height={1}
                width={1}
                className="h-10 w-10"
              />
              <div className="text-xl font-bold">Event Booking Panel</div>
            </div>
            <div className="text-gray-400 w-72 mt-4 text-center">
              Unlock the full potential of your knowledge by booking events with
              our comprehensive suite of Dashboard !
            </div>
            <div className="flex justify-center items-center">
              <img
                src="/images/auth.svg"
                alt="login"
                height={1}
                width={1}
                className="h-[60dvh] w-[50dvh]"
              />
            </div>
          </div>
          <div className="h-full w-1/2 flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-[60dvh] justify-center items-center">
                <div className="text-3xl mb-7 font-bold">
                  Sign Up to Event Booking Panel
                </div>
                <div className="flex flex-col w-full justify-center items-center mt-5">
                  <div className="w-full">
                    <label className="text-lg font-medium" htmlFor="name">
                      Name
                    </label>
                    <div className="relative w-full mb-4">
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="Enter Name"
                        className="w-full py-4 border rounded-lg pl-5 mt-2.5 text-black  focus:border-[#3c50e0] outline-none pr-5"
                      />
                      <div className="absolute right-4 top-7">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                    <label className="text-lg font-medium " htmlFor="email">
                      Email
                    </label>
                    <div className="relative w-full mb-4">
                      <input
                        type="text"
                        {...register("email")}
                        placeholder="Enter Email"
                        className="w-full py-4 border rounded-lg pl-5 mt-2.5 text-black  focus:border-[#3c50e0] outline-none pr-5"
                      />
                      <div className="absolute right-4 top-7">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                    <label className="text-lg font-medium" htmlFor="username">
                      Username
                    </label>
                    <div className="relative w-full mb-4">
                      <input
                        type="text"
                        {...register("username")}
                        placeholder="Enter Username"
                        className="w-full py-4 border rounded-lg pl-5 mt-2.5 text-black  focus:border-[#3c50e0] outline-none pr-5"
                      />
                      <div className="absolute right-4 top-7">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {errors.username && (
                      <p className="text-red-500 text-sm">
                        {errors.username.message}
                      </p>
                    )}
                    <div className="flex w-full items-center justify-center gap-x-10 ">
                      <div className="text-lg font-medium flex items-center justify-center ">
                        Role
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <label className="inline-flex items-center">
                          <input
                            {...register("type")} // Register the 'type' field
                            type="radio"
                            value="Host" // 'Host' value for the role
                            className="form-radio h-4 w-4 text-indigo-600"
                          />
                          <span className="ml-2 text-lg font-medium">Host</span>
                        </label>

                        <label className="inline-flex items-center">
                          <input
                            {...register("type")} // Register the 'type' field
                            type="radio"
                            value="Joiner" // 'Joiner' value for the role
                            className="form-radio h-4 w-4 text-indigo-600"
                          />
                          <span className="ml-2 text-lg font-medium">
                            Joiner
                          </span>
                        </label>
                      </div>
                      {errors.type && (
                        <p className="text-red-500 text-sm">
                          {errors.type.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full mt-4">
                    <label className="text-lg font-medium" htmlFor="password">
                      Password
                    </label>
                    <div className="relative w-full">
                      <input
                        type="password"
                        {...register("password")}
                        placeholder="Enter Password"
                        className="w-full py-4 border rounded-lg pl-5 mt-2.5 text-black  focus:border-[#3c50e0] outline-none pr-5"
                      />
                      <div className="absolute right-4 top-7">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                              fill=""
                            />
                            <path
                              d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </div>
                    </div>

                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="py-4 w-full mt-4 hover:scale-105 duration-200 transition-all ease-in-out text-white rounded-lg flex items-center justify-center cursor-pointer bg-[#3c50e0]"
                  />
                </div>
              </div>
              <div className="mt-6 text-center">
                <span>
                  Don’t have any account?{" "}
                  <span
                    onClick={() => {
                      navigate("/");
                    }}
                    className="text-[#3c50e0] cursor-pointer"
                  >
                    Sign In
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
