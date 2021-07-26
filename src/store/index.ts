/**
 * @author Sushant Kumar
 * @email sushant.kum96@gmail.com
 * @create date Jul 26 2021 10:39:58 GMT+05:30
 * @modify date Jul 26 2021 10:39:58 GMT+05:30
 * @desc Store index
 */

import configureStore from "./configureStore";
import rootReducer from "./reducer";

const store = configureStore();

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof rootReducer>;

export default store;
