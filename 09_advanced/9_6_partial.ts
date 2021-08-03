{
  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'mid' | 'low';
  };

  function updateTodo(todo: ToDo, updatedData: Partial<ToDo>): ToDo {
    return {
      ...todo,
      ...updatedData,
    };
  }

  const todo: ToDo = {
    title: 'leaen typescript',
    description: 'make todoapp using typescript',
    label: 'typescript',
    priority: 'high',
  };
  console.log('before >>', todo);

  const updatedToDo = updateTodo(todo, { label: 'typescript, javascript', priority: 'mid' });
  console.log('after >>', updatedToDo);
}
