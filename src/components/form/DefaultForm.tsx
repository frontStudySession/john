import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  title: string;
  developer: string;
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  padding: 0 1.5rem;
  box-sizing: border-box;
`;

const Title = styled.h2`
  display: block;
  margin-bottom: 0;
`;

const LabelField = styled.label`
  width: 100%;
  text-align: start;
`;

const InputField = styled.input`
  display: block;
  width: 100%;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 1.2rem;
  box-sizing: border-box;
`;

const SelectField = styled.select`
  display: block;
  width: 100%;
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 1.2rem;
`;

const RadioField = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const ValidText = styled.span`
  margin: 0;
  color: #04ff00;
  font-size: 0.8rem;
  font-weight: 100;
`;

const SubmitButton = styled.button`
  display: inline-block;
  width: 100%;
  padding: 16px 10px;
  background: #ec5990;
  border: 1px solid #ec5990;
  border-radius: 4px;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background: #bf1650;
  }
`;

function DefaultForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const success: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
  };

  const sanitizeNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    const sanitizedValue = inputValue.substring(0, 11);

    setValue("mobileNumber", sanitizedValue);
  };

  return (
    <Form>
      <Title>존</Title>
      <LabelField>
        <InputField
          {...register("firstName", {
            required: "필수 입력 사항입니다!",
          })}
          placeholder="First name"
        ></InputField>
        {errors.firstName && <ValidText>{errors.firstName.message}</ValidText>}
      </LabelField>
      <LabelField>
        <InputField
          {...register("lastName", {
            required: "필수 입력 사항입니다!",
          })}
          placeholder="Last name"
        ></InputField>
        {errors.lastName && <ValidText>{errors.lastName.message}</ValidText>}
      </LabelField>
      <LabelField>
        <InputField
          {...register("email", {
            required: "필수 입력 사항입니다!",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "올바르지 않은 이메일 형식입니다!",
            },
          })}
          placeholder="Email"
        ></InputField>
        {errors.email && <ValidText>{errors.email.message}</ValidText>}
      </LabelField>
      <LabelField>
        <InputField
          {...register("mobileNumber", {
            required: "필수 입력 사항입니다!",
            minLength: {
              value: 11,
              message: "11자리를 입력해주세요!",
            },
            maxLength: {
              value: 11,
              message: "11자리를 입력해주세요!",
            },
            pattern: {
              value: /^[0-9]*$/,
              message: "숫자만 입력해주세요!",
            },
            onChange: sanitizeNumericInput,
          })}
          placeholder="Mobile number"
        ></InputField>
        {errors.mobileNumber && (
          <ValidText>{errors.mobileNumber.message}</ValidText>
        )}
      </LabelField>
      <LabelField>
        <SelectField
          {...register("title", { required: "필수 입력 사항입니다!" })}
        >
          <option value="">Select...</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </SelectField>
        {errors.title && <ValidText>{errors.title.message}</ValidText>}
      </LabelField>
      <RadioField>
        <label>
          Yes&nbsp;
          <input
            {...register("developer", { required: "필수 입력 사항입니다!" })}
            type="radio"
            value="Yes"
          />
        </label>
        <label>
          No&nbsp;
          <input
            {...register("developer", { required: "필수 선택 사항입니다!" })}
            type="radio"
            value="No"
          />
        </label>
        {errors.developer && <ValidText>{errors.developer.message}</ValidText>}
      </RadioField>
      <SubmitButton onClick={handleSubmit(success)}>Submit</SubmitButton>
    </Form>
  );
}

export default DefaultForm;
