import { useCallback, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Category } from "./interfaces/category.model";
import NotFound from "./pages/NotFound/NotFound";

import "./App.css";
import categoriesService from "./services/category.service";
import authService from "./services/auth.service";
import { UserInfoState } from "./interfaces/user.model";
import LoginModal from "./components/LoginModal/LoginModal";
import Profile from "./pages/Profile/Profile";
import CreatePost from "./pages/CreatePost/CreatePost";
import Home from "./pages/Home/Home";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import CreateCategory from "./pages/CreateCategory/CreateCategory";

const App = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number>();
  const [userInfoState, setUserInfoState] = useState<UserInfoState>({ loaded: false });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    categoriesService.fetchAllCategories().then((res) => {
      console.log("getCategories", res);
      setCategories(res);
    })
      .catch((err) => { });

    authService.getMyInfo()
      .then(res => setUserInfoState({ loaded: true, userInfo: res }))

    // @ES-lint ignore next line
  }, []);

  const onLoginClicked = useCallback(
    () => {
      setShowLoginModal(true);
    },
    [],
  );

  const onCancelLoginClicked = useCallback(
    () => {
      setShowLoginModal(false);
    },
    [],
  );

  const onLogoutClicked = useCallback(
    () => {
      authService.logout()
        .then(() => {
          history.push("/");
          setUserInfoState({ loaded: true, userInfo: null });
        })
        .catch(err => {
          alert("failed to logout");
        })
    },
    [history],
  );

  return (
    <>
      <Navbar userInfoState={userInfoState} loginClicked={onLoginClicked} logoutClicked={onLogoutClicked} />
      <Sidebar activeCategoryId={activeCategoryId} categories={categories} />
      <LoginModal
        showLoginModal={showLoginModal}
        onCloseModalClicked={onCancelLoginClicked}
        setUserInfoState={setUserInfoState}
      />
      <main className="container-main">
        <div className="px-5 py-4 h-100">
          <Switch>
            <Route
              path="/create-post"
              render={() => (
                <AuthGuard userInfoState={userInfoState}>
                  <CreatePost
                    categories={categories}
                    setCategories={setCategories}
                  />
                </AuthGuard>
              )}
              exact
            />
            <Route
              path="/create-category"
              render={() => (
                <AuthGuard userInfoState={userInfoState}>
                  <CreateCategory
                    categories={categories}
                    setCategories={setCategories}
                  />
                </AuthGuard>
              )}
              exact
            />
            <Route
              path={["/", "/categories/:categoryId/:posts?/:postId?"]}
              render={(props) => (
                <Home
                  history={props.history}
                  location={props.location}
                  match={props.match as any}
                  categories={categories}
                  setCategories={setCategories}
                  activeCategoryId={activeCategoryId}
                  setActiveCategoryId={setActiveCategoryId}
                />
              )}
              exact
            />
            <Route path={"/profile"} render={(props) =>
            (
              <AuthGuard userInfoState={userInfoState}>
                <Profile userInfoState={userInfoState} />
              </AuthGuard>
            )
            } />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </>
  );
};

export default App;
