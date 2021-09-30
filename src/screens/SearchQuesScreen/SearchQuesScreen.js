import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchedQuesData,
  searchQuestions,
} from "../../api/searchQuesSlice";
import { FancyButton, Wrapper } from "../../Components/StyledComponents";
import SearchedQuestions from "./SearchedQuestions";
import { ToastContainer, toast } from "react-toastify";
export default function SearchQuesScreen() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchedQuestions } = useSelector((state) => state.searchQues);
  const dispatch = useDispatch();
  const handleChange = useMemo(
    () => (e) => {
      setKeyword(e.target.value);
    },
    [keyword]
  );

  // improvement required
  useEffect(() => {
    return dispatch(resetSearchedQuesData());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetSearchedQuesData());
    if (keyword === "") {
      toast.error("please enter a keyword to search");
      return;
    }
    setLoading(true);
    dispatch(searchQuestions({ keyword }))
      .unwrap()
      .then((res) => {
        const { status } = res;
        setLoading(false);
        if (status === 404) {
          toast.error(
            `No result found, please search with a different keyword`
          );
        }
      })
      .catch((err) => setLoading(false));
    console.log(keyword);
  };

  return (
    <>
      <Wrapper className="mb-3">
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <Form.Group
            as={Row}
            className=" justify-content-center align-items-center"
            controlId={"searchQues"}
          >
            <Col className="d-flex justify-content-end">
              <Form.Label className="mb-0  fw-bold">Question Search</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="search"
                value={keyword}
                placeholder="Question based search"
                disabled={loading}
              />
            </Col>
            <Col>
              <FancyButton type="submit">
                {loading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={["fas", "search"]}
                      className="me-2"
                    />
                    <span>Search</span>
                  </>
                )}
              </FancyButton>
            </Col>
          </Form.Group>
        </Form>
      </Wrapper>
      {searchedQuestions.search.length &&
      searchedQuestions !== "NO data found" ? (
        <SearchedQuestions keyword={keyword} />
      ) : null}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
