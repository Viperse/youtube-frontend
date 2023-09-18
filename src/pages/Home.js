import styled from "styled-components";

const Test = styled.div`
    background-color : black;
    color: white;
`;

const StyledMain = styled.main`
    padding-top: 56px;
    display: flex;
`;

const Home = () => {
    return (
    <StyledMain>
        <h1>Home</h1>
        <Test>TEST~~~</Test>
    </StyledMain>
    );
};

export default Home;