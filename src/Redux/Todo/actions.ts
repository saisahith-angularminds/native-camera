export const deleteTodo = (data: any, id: string) =>
  data.filter((each: any) => each.id !== id);
export const checkOrNot = (data: any, id: string) =>
  data.map((each: any) => {
    if (each.id === id) {
      return { ...each, completed: !each.completed };
    } else {
      return each;
    }
  });
export const updateTodo = (data: any, id: string, updateValues: any) =>
  data.map((each: any) => {
    if (each.id === id) {
      return { ...each, ...updateValues };
    } else {
      return each;
    }
  });
