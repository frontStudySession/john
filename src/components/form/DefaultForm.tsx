import React, { useState } from 'react';
import { useForm, SubmitHandler, UseFormProps, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  title: string;
  developer: string;
  file?: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('필수 입력 사항입니다!'),
  lastName: yup.string().required('필수 입력 사항입니다!'),
  email: yup
    .string()
    .required('필수 입력 사항입니다!')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      '올바르지 않은 이메일 형식입니다!'
    ),
  mobileNumber: yup
    .string()
    .required('필수 입력 사항입니다!')
    .matches(/^[0-9]*$/, '숫자만 입력해주세요!')
    .min(11, '11자리를 입력해주세요!')
    .max(11, '11자리를 입력해주세요!'),
  title: yup.string().required('필수 입력 사항입니다!'),
  developer: yup.string().required('필수 입력 사항입니다!'),
});

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
  padding: ${(props) => (props.type === 'file' ? '0' : '8px 12px')};
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

const FileTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 0.8rem;
  font-weight: 100;
  box-sizing: border-box;
`;

function DefaultForm() {
  const useFormProps: UseFormProps<FormData> = {
    mode: 'onSubmit', // 이 옵션을 사용하면 사용자가 양식을 제출하기 전에 유효성 검사 전략을 구성할 수 있습니다.
    reValidateMode: 'onChange', // 이 옵션을 사용하면 사용자가 양식을 제출한 후 오류가 있는 입력이 다시 검증될 때 검증 전략을 구성할 수 있습니다.
    defaultValues: {
      // 사용자가 구성 요소와 상호 작용하기 전에 구성 요소가 처음 렌더링될 때 초기 값으로 사용됩니다.
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      title: '',
      developer: '',
      file: '',
    },
    resolver: yupResolver(schema), // 이 기능을 사용하면 Yup, Zod, Joi, Vest, Ajv 등과 같은 외부 검증 라이브러리를 사용할 수 있습니다.
    context: undefined, // 이 컨텍스트 개체는 변경 가능하며 확인자의 두 번째 인수 또는 Yup 유효성 검사의 컨텍스트 개체에 주입됩니다.
    criteriaMode: 'firstError', // firstError(기본값)로 설정하면 각 필드의 첫 번째 오류만 수집됩니다. / all로 설정하면 각 필드의 모든 오류가 수집됩니다.
    shouldFocusError: true, // true(기본값)로 설정하고 사용자가 유효성 검사에 실패한 양식을 제출하면 오류가 있는 첫 번째 필드에 초점이 설정됩니다.
    shouldUnregister: false, // true일 경우, 어떤 입력 필드가 폼에서 제거되면 그에 대한 값도 함께 제거됩니다.
    delayError: undefined, // 이 구성은 오류 상태가 최종 사용자에게 표시되는 시간을 밀리초 단위로 지연시킵니다.
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<FormData>(useFormProps);

  const success: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
  };

  const sanitizeNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const sanitizedValue = inputValue.substring(0, 11);

    setValue('mobileNumber', sanitizedValue);
  };

  const mobileNumber = register('mobileNumber', { onChange: sanitizeNumericInput });
  const developer = register('developer');
  const [fileText, setFileText] = useState('');

  const handleFileChange = (onChange: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files?.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          onChange(e.target.result as string);
          setFileText(e.target.result as string);
        }
      };

      reader.readAsText(file);
    } else {
      setFileText('');
    }
  };

  return (
    <Form>
      <Title>존</Title>
      <LabelField>
        <InputField
          {...register('firstName')}
          placeholder="First name"
        ></InputField>
        {errors.firstName && <ValidText>{errors.firstName.message}</ValidText>}
      </LabelField>
      <LabelField>
        <InputField
          {...register('lastName')}
          placeholder="Last name"
        ></InputField>
        {errors.lastName && <ValidText>{errors.lastName.message}</ValidText>}
      </LabelField>
      <LabelField>
        <InputField
          {...register('email')}
          placeholder="Email"
        ></InputField>
        {errors.email && <ValidText>{errors.email.message}</ValidText>}
      </LabelField>
      <LabelField>
        <InputField
          {...mobileNumber}
          placeholder="Mobile number"
        ></InputField>
        {errors.mobileNumber && <ValidText>{errors.mobileNumber.message}</ValidText>}
      </LabelField>
      <LabelField>
        <SelectField {...register('title')}>
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
            {...developer}
            type="radio"
            value="Yes"
          />
        </label>
        <label>
          No&nbsp;
          <input
            {...developer}
            type="radio"
            value="No"
          />
        </label>
        {errors.developer && <ValidText>{errors.developer.message}</ValidText>}
      </RadioField>
      <LabelField>
        <Controller
          control={control}
          name="file"
          render={({ field: { onChange, ref } }) => (
            <InputField
              type="file"
              accept=".txt"
              onChange={handleFileChange(onChange)}
              ref={ref}
            />
          )}
        />
        {fileText && (
          <FileTextarea
            value={fileText}
            readOnly
          />
        )}
      </LabelField>
      <SubmitButton onClick={handleSubmit(success)}>Submit</SubmitButton>
    </Form>
  );
}

export default DefaultForm;
