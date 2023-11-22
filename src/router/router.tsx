import { Routes, Route } from "react-router-dom";
import Detail from "../components/Detail";
import AuthLoadingPage from "../pages/Auth/AuthLoadingPage";
import HomePage from "../pages/HomePage";
import IntroducePage from "../pages/IntroducePage";
import MyPage from "../pages/MyPage";
import StartPage from "../pages/StartPage";
import NotFound from "../components/Common/NotFound";
import TagPage from "../pages/TagPage";
import SerachPage from "../pages/SerachPage";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/start" element={<StartPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<AuthLoadingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/intro" element={<IntroducePage />} />
        <Route path="/detail/:postId" element={<Detail />} />
        <Route path="/tag/:tag" element={<TagPage />} />
        <Route path="/search/:keyword" element={<SerachPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
