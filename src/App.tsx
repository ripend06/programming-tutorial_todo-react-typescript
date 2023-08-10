import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState(""); //inputのvalueを入れる状態変数
  const [todos, setTodos] = useState<Todo[]>([]); //<Todo[]> で配列にわたす型指定ができる。宣言した３つの型以外は入らない。

  //型宣言
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  //inputから情報を取得
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value);
    setInputValue(e.target.value); //setValue変数にに入れる
  };

  //Enterを押したとき、作成ボタンを押したときの処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //preventDefaultでリロード阻止

    //新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length, //今回は簡易的
      checked: false, //新規作成時は、完了していないので
    }

    setTodos([newTodo, ...todos]); // 配列の既存todosに対して、新しいnewTodoを入れる
    setInputValue(""); //投稿した後は空にする
  };


  //タスクを編集する
  const handleEdit = (id: number , inputValue: string) => {
    const newTodos = todos.map((todo) => { //Todoをひとつひとつ見る
      if(todo.id === id) { //今見てるIDが引数で取ったID等しければ。 idは引数で取ったID　todo.idは今のID(mapの順番)
        todo.inputValue = inputValue; //文字の書き換え。　inputValueは今編集してる文字。todo.inputValueは前のtodo文字。
      }
      return todo; //todo.inputValueの値を更新した状態で返して上げる
    });

    setTodos(newTodos);
  };


  //チェックボックスを作成
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => { //Todoをひとつひとつ見る
      if(todo.id === id) { //今見てるIDが引数で取ったID等しければ。 idは引数で取ったID　todo.idは今のID(mapの順番)
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };


  //削除タスク削除
  //filer関数　一つ一つのtodoを見て、0,1,2のタスクを条件式で見る。　
  //todo.id は、０、１、２すべてチェックする。idは、IDの１ばんを削除しようとする１番
  //tureの場合のみ残す。1を選択した場合は、０と２はtureで残す。２を選択した場合は、１,3はtureで残す
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };





  /*
  handleChange(e) のeはイベントh情報
  */
  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)}
          className="inputText" />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="text" onChange={(e) => handleEdit(todo.id, e.target.value)}
              className="inputText"
              value={todo.inputValue}
              disabled={todo.checked}
              />
              <input type="checkbox" onChange={(e) => handleChecked(todo.id, todo.checked)} />
              <button onClick={() => handleDelete(todo.id)}>消す</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
