import { Account } from "Account/Account";
import { Provider } from "react-redux";
import storeAccount from "../redux/store";
import { Theme } from "Account/Theme";

function Home() {
  return (
    <>
      <h1>HOME</h1>
      <Provider store={storeAccount}>
        <Theme />
        <Account />
      </Provider>
    </>
  );
}
export default Home;
