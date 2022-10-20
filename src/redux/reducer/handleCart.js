const initialState = {
  cart: [],
  total: 0,
};

const handleCart = (state = initialState, action) => {
  const product = action.payload;
  const total = state.total;
  console.log(state.cart);
  let map = state.cart.map((x) => x);

  switch (action.type) {
    case "ADDITEM":
      if (state.cart.find((x) => x.id === product.id)) {
        console.log("same");
        return {
          cart: state.cart.map((x) =>
            x.id == product.id
              ? {
                  ...x,
                  qty: x.qty + 1,
                }
              : x
          ),
          total: total + product.price,
        };
      } else {
        return {
          cart: [...map, { ...product, qty: 1 }],
          total: total + product.price,
        };
      }

      break;

    case "ADDCOUNT":
      if (state.cart.find((x) => x.id === product.id)) {
        console.log("same from count");
        return {
          cart: state.cart.map((x) =>
            x.id == product.id
              ? {
                  ...x,
                  qty: product.qty,
                }
              : x
          ),
          total:
            (total -
            state.cart.map((x) => (x.id == product.id ? x.qty * x.price : 0))) +
            (product.price * product.qty),
        };
      } else {
        return {
          cart: [...map, { ...product, qty: product.qty }],
          total: total + product.price * product.qty,
        };
      }

      break;

    case "DELITEM":
      const exist1 = state.cart.find((x) => x.id === product.id);
      console.log(exist1);

      if (exist1.qty === 1) {
        return {
          cart: state.cart.filter((x) => x.id !== exist1.id),
          total: total - product.price,
        };
      } else {
        return {
          cart: state.cart.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty - 1 } : x
          ),
          total: total - product.price,
        };
      }

      break;

    case "REMITEM":
      return {
        cart: state.cart.filter((x) => x.id !== product.id),
        total: total - product.price * product.qty,
      };

    default:
      return state;
      break;
  }
};

export default handleCart;
