import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Error, Landing } from "./pages";
import {
  AllMoods,
  AddMood,
  Profile,
  SharedLayout,
  Stats,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route path="all-moods" element={<AllMoods />} />
          <Route path="add-mood" element={<AddMood />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/landing"
          element={
            <div>
              <Landing />
            </div>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
