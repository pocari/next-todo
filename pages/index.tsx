import { css } from "@emotion/react";
import { useCallback,  useState } from "react"

type Todo = {
  done: boolean;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {done: false, text: 'お酒'},
    {done: false, text: 'バナナ'},
    {done: false, text: 'みりん'},
  ]);

  const remaining = todos.filter(todo => !todo.done).length;

  const addNew = useCallback((_e: any) => {
    setTodos([...todos, {done: false, text: ''}]);
  }, [setTodos, todos]);

  const clear = useCallback((_e: any) => {
    setTodos((todos) => todos.filter(todo => !todo.done));
  }, [setTodos, todos]);

  const handleDone = useCallback((index: number) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  }, [setTodos, todos]);

  const handleText = useCallback((e: React.ChangeEvent<HTMLInputElement> , index: number) => {
    const newTodos = [...todos];
    newTodos[index].text = e.target.value;
    setTodos(newTodos);
  }, [setTodos, todos]);

  return (
    <>
      <ul css={todoCss}>
        {todos.map((todo, i) => {
          return (
            <li css={todoItemCss(todo.done)} key={i}>
              <input type="checkbox" checked={todo.done} onChange={() => handleDone(i)}/>
              <input value={todo.text} onChange={(e) => handleText(e, i)}/>
            </li>
          );
        })}
      </ul>

      <div>remining: {remaining} count</div>
      <div>
        <button onClick={addNew}>new</button>
        <button onClick={clear} >clear</button>
      </div>
    </>
  )
}

const todoCss = css`
  margin-top: 0px;
  margin-bottom: 8px;
  padding: 0;
`

const todoItemCss = (done: boolean) => css`
  list-style:  none;
  padding: 0;
  opacity: ${done ? 0.5 : 1};

  input[type=checkbox] {
    margin-left: 0px;
  }
`

