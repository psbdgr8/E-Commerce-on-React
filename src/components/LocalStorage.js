export const SaveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

export const LoadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return {
        cart: [],
        total: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return {
      cart: [],
      total: 0,
    };
  }
};
