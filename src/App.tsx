import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useSelector, useDispatch, ReactReduxContextValue } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Auth from "./components/Auth";
import TodoTask from "./components/TodoTask";
const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);
  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <TodoTask />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
