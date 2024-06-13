import { useLocation } from "react-router-dom";
import { Item, Level, Text, Title, ButtonDel } from "./ItemToDo.styled";

export function ItemToDo({
  status,
  level,
  id,
  title,
  description,
  onDelete,
  onClick,
  selected,
}) {
  const location = useLocation();
  return (
    <Item status={status} level={level} onClick={onClick} selected={selected}>
      <Title to={id} state={{from: location}}>{title}</Title>
      <Text>{description}</Text>
      <Level>{level}</Level>
      <ButtonDel
        onClick={(e) => {
          onDelete(id);
        }}
      >
        del
      </ButtonDel>
    </Item>
  );
}
