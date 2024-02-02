import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`
  margin-top: 10px;
`;
export const Child = ({ idx }: { idx: number }) => {
  const [count, setCount] = useState(0);
  return (
    <Wrapper>
      child {idx} - init {count}
      <br />
      <button
        onClick={() => {
          setCount((n) => n + 1);
        }}
      >
        increase
      </button>
    </Wrapper>
  );
};
