import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import { Route } from "react-router-dom";
import styled from "styled-components";

const MainPage = styled.div`
  display: flex;
`;

function App() {
  return (
    <MainPage>
      <UsersList />
      <Route path="/user/:id">
        <UserDetail />
      </Route>
    </MainPage>
  );
}

export default App;
