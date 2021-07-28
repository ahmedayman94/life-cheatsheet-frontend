import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Category } from "./interfaces/category.model";
import CreatePost from "./pages/CreatePost/CreatePost";
import Home from "./pages/Home";
import { getCategories } from "./utils/http-clients";
import NotFound from "./pages/NotFound";

const AppContainer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number>();

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log("getCategories", res);
        setCategories(res);
      })
      .catch((err) => {});
    // @ES-lint ignore next line
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar activeCategoryId={activeCategoryId} categories={categories} />
      <main className="h-100" style={{ marginTop: "56px" }}>
        <div className="container h-100">
          <Switch>
            <Route
              path="/create-post"
              render={() => (
                <CreatePost
                  categories={categories}
                  setCategories={setCategories}
                  setActiveCategoryId={setActiveCategoryId}
                />
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
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </main>
    </>
  );
};

export default AppContainer;
