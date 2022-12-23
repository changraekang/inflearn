import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import InputGroup from "../components/InputGroup";
const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  let router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    console.log(password, username, "data");
    event.preventDefault();
    try {
      const res = await axios.post(
        "/auth/login",
        {
          password,
          username,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res, "res");
      router.push("/");
    } catch (error: any) {
      setErrors(error.response.data || {});
      console.log(error, "error");
    }
  };
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96">
          <h1 className="mb-2 text-lg font-medium">로그인</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder="Username"
              value={username}
              setValue={setUserName}
              error={errors.userName}
            />
            <InputGroup
              placeholder="Password"
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
              로그인
            </button>
          </form>
          <small>
            이미 가입하셨나요?
            <Link href="/register">
              <a className="ml-1 text-blue-400 uppercase">회원가입</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
