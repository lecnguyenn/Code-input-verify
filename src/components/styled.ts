import styled from 'styled-components';

type ContainerProps = { itemsCount: number };
export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content:center;
  margin-top: 50px;
  width: ${(props: ContainerProps) => `${props.itemsCount}`}
`;

type InputProps = {
  activeIndex: number;
};
export const Input = styled.input`
  position: absolute;
  top: 0;
  left: ${(props: InputProps) => `${props.activeIndex} `};
  opacity: 0;
  width: 4.5rem;
  height: 5rem;
`;
export const Item = styled.div`
  width: 50px;
  height: 50px;
  padding: 0;
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
  border: 0;
  margin-right: 1rem;
  
  box-shadow: inset 0 0 0 1px #ccc;
  transition: box-shadow 0.2s ease-out;
  &.is-active {
    box-shadow: inset 0 0 0 2px #888;
  }
`;