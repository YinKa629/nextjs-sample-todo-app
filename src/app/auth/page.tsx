"use client";

import { LoginButton } from "app/components/auth/AuthButton";
import { NextPage } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { signIn } from "next-auth/react";

type LoginFormValues = {
  userName: string;
  password: string;
};

const ErrorMessage = styled.div`
  font-size: 10pt;
  color: red;
`;

const LoginPage: NextPage = ({}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: `onSubmit`,
    reValidateMode: "onSubmit",
  });

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const result = await signIn("credentials", {
      userName: data.userName,
      password: data.password,
    });
  };

  return (
    <>
      <h1>ログインページ</h1>
      <div>
        <label>ユーザー名</label>
        <input
          id="userName"
          type="text"
          value={userName}
          {...register("userName", {
            required: { value: true, message: "ユーザ名は必須です" },
          })}
          onChange={handleChangeUserName}
        />
        {errors.userName && (
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        )}

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="text"
          value={password}
          {...register("password", {
            required: { value: true, message: "パスワードは必須です" },
            maxLength: {
              value: 8,
              message: "パスワードは8文字以下で入力してください",
            },
          })}
          onChange={handleChangePassword}
        />
        {errors.password && (
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        )}
      </div>
      <button style={{ marginRight: 10 }} onClick={handleSubmit(onSubmit)}>
        Sign In
      </button>
    </>
  );
};

export default LoginPage;
