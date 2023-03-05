import { Box, Button, Container } from "@mui/material";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import PageTopBar from "../../component/home/PageTopBar";
import dayjs from "dayjs";
import { fetch } from "../../utils/httpUtil";
import { fetchUserDetails, toaster } from "../../utils/helper";
import OpenNewsCards from "../../component/cards/OpenNewsCards";
import PersonalizeModal from "../../component/home/PersonalizeModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewsDataSource,
  addUserDetails,
  userData,
} from "../../app/slice/userSlice";
import GuardianSearchBar from "../../component/home/guardian/GuardianSearchBar";
import { useCurrentApi } from "../../utils/httpBaseUtil";
import GuardianCards from "../../component/cards/GuardianCards";
import { useAuth } from "../../hooks/useAuth";
import {
  GUARDIAN_NEWS_API,
  GUARDIAN_NEWS_API_KEY,
  NEWS_API_KEY,
  NEWS_API_URL,
  NEW_YORK_API,
  NEW_YORK_API_KEY,
} from "../../utils/constants";
import NewYorkCards from "../../component/cards/NewYorkCards";
import NewYorkSearchBar from "../../component/home/newyork/NewYorkSearchBar";

export default function HomePage(props) {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const userInfo = useSelector(userData);
  const { newsDataSource, personalizeFeed } = userInfo;
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [author, setAuthor] = useState(newsDataSource?.author);
  const [category, setCategory] = useState(newsDataSource?.category);
  const [newsId, setNewsId] = useState(
    newsDataSource?.id !== undefined && newsDataSource?.id !== ""
      ? newsDataSource?.id
      : "guardianAPI"
  );
  const param = {
    q: "News",
    from: dayjs(date).format("YYYY-MM-DD"),
  };
  const resetState = () => {
    setPage(1);
    setDate(dayjs(new Date()));
  };
  /**
   * Fetch News Open Data
   */
  const fetchData = async () => {
    setSearchParam();
    const { data } = await fetch(NEWS_API_URL, "top-headlines", {
      ...param,
      page: page,
      pageSize: 10,
      apiKey: NEWS_API_KEY,
    });
    if (data.status === "ok") {
      setArticles(data);
    } else if (data.status === "error") {
      toaster("error", data.message);
    }
  };
  /**
   * Fetch The Gurdain Data
   */
  const fetchGurdianData = async () => {
    const param = {
      q: search,
      section: category,
      page: page,
      "from-date": dayjs(date).format("YYYY-MM-DD"),
      "api-key": GUARDIAN_NEWS_API_KEY,
      "show-fields": "all",
    };
    if (!category) delete param["section"];
    if (!search) delete param["q"];
    const { data } = await fetch(GUARDIAN_NEWS_API, "search", param);
    const { response } = data;
    if (response.status === "ok") {
      setArticles(response);
    } else if (response.status === "error") {
      toaster("error", data.message);
    }
  };

  /**
   * Fetch The New York Data
   */
  const fetchNewYorkData = async () => {
    const param = {
      q: search,
      fq: `news_desk:(${category})`,
      page: page,
      facet: true,
      begin_date: dayjs(date).format("YYYYMMDD"),
      "api-key": NEW_YORK_API_KEY,
    };
    if (!search) delete param["q"];
    if (!category) delete param["fq"];
    const { data } = await fetch(NEW_YORK_API, "", param);
    const { response } = data;
    if (data.status === "OK") {
      setArticles(response);
    } else if (data.status === "ERROR") {
      toaster("error", data.message);
    }
  };
  /**
   * Search Param
   */
  const setSearchParam = () => {
    if ((category && author === "") || author === undefined) {
      param["category"] = category;
    } else if ((author && category === "") || category === undefined) {
      param["sources"] = author;
    } else if (category && author) {
      delete param["catagory"];
      param["sources"] = author;
    }
    if (search) {
      param["q"] = search;
    }
  };
  /**
   * Call Above Api method on user Prefernce
   */
  const callApi = (sourceId = null) => {
    console.log("callApi", newsId);
    switch (sourceId ?? newsId) {
      case "guardianAPI":
        fetchGurdianData();
        break;
      case "openNewsAPI":
        fetchData();
        break;
      case "newyorkAPI":
        fetchNewYorkData();
        break;
      default:
        break;
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    callApi();
  };
  /**
   * Select which page bar should be render an personalize data
   * @returns
   */
  const pageSearchBarRender = () => {
    switch (newsId) {
      case "guardianAPI":
        return (
          <>
            <GuardianSearchBar
              setSearch={setSearch}
              date={date}
              category={category}
              author={author}
              search={search}
              setCategory={setCategory}
              setAuthor={setAuthor}
              setDate={setDate}
              fetchData={fetchGurdianData}
              searchSubmitHandler={searchSubmitHandler}
            />
          </>
        );
      case "openNewsAPI":
        return (
          <>
            <PageTopBar
              setSearch={setSearch}
              date={date}
              category={category}
              author={author}
              search={search}
              setCategory={setCategory}
              setAuthor={setAuthor}
              fetchData={fetchData}
              searchSubmitHandler={searchSubmitHandler}
            />
          </>
        );
      case "newyorkAPI":
        return (
          <>
            <NewYorkSearchBar
              setSearch={setSearch}
              date={date}
              category={category}
              author={author}
              search={search}
              setCategory={setCategory}
              setAuthor={setAuthor}
              fetchData={fetchNewYorkData}
              searchSubmitHandler={searchSubmitHandler}
            />
          </>
        );
      default:
        break;
    }
  };
  /**
   * Select which page bar should be render an personalize data
   * @returns
   */
  const pageCardRender = () => {
    switch (newsId) {
      case "guardianAPI":
        return (
          <GuardianCards articles={articles} setPage={setPage} page={page} />
        );
      case "openNewsAPI":
        return <OpenNewsCards data={articles} setPage={setPage} page={page} />;
      case "newyorkAPI":
        return (
          <NewYorkCards articles={articles} setPage={setPage} page={page} />
        );
      default:
        break;
    }
  };
  useEffect(() => {
    if (!articles) {
      callApi();
    }
  }, []);
  useEffect(() => {
    if (page) callApi();
  }, [page]);
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(fetchUserDetails(user));
    }
  }, [isAuthenticated()]);
  useEffect(() => {
    // console.log(newsDataSource);
    setCategory(newsDataSource?.category);
    setAuthor(newsDataSource?.author);
    setNewsId(
      newsDataSource?.id !== undefined && newsDataSource?.id !== ""
        ? newsDataSource?.id
        : "guardianAPI"
    );
  }, [newsDataSource.id, newsDataSource]);
  // useEffect(() => {
  //   console.log(articles);
  // }, [articles]);
  useEffect(() => {
    if (!load && (category || author || newsId)) {
      // setLoad(true);
      callApi();
    }
  }, [category, author, newsId]);
  return (
    <Box
      component="div"
      sx={{
        pt: 15,
        height: "90vh",
      }}
    >
      <Container maxWidth="xl">
        {isAuthenticated() && (
          <PersonalizeModal
            author={author}
            category={category}
            setAuthor={setAuthor}
            setCategory={setCategory}
            resetState={resetState}
            setNewsId={setNewsId}
            newsId={newsId}
            callApi={callApi}
            setLoad={setLoad}
          />
        )}
        {/* Page Search Bar */}
        {pageSearchBarRender()}
        {pageCardRender()}
        {/* Modal */}
      </Container>
    </Box>
  );
}
