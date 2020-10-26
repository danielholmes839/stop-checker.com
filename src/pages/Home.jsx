import mapImg from "img/staticmap.png";
import React from "react";

import { Page, Section, ButtonLink, ButtonAnchor, IndentedParagraph } from "components";
import { useQuery } from "@apollo/react-hooks";
import { stopPreviewDemoQuery } from "api";
import { StopPreview } from "components/StopPreview";
import LoadingSpinner from "components/LoadingSpinner";

const HighLight = ({ children }) => {
    return <span className="text-primary font-weight-bold">{children}</span>
}

const StopPreviewDemo = () => {
    let { data, loading } = useQuery(stopPreviewDemoQuery());
    if (data) {
        return (
            <div className="mx-3 my-2">
                <StopPreview stop={data.stops[0]} />
            </div>
        )
    } else if (loading) {
        return <LoadingSpinner />
    }
}

const Home = () => {
    return (
        <Page title="About">
            <Section>
                <IndentedParagraph>
                    <HighLight>Stop Checker</HighLight> is the easiest way to get live bus data and schedules in Ottawa for OC Transpo.
                </IndentedParagraph>
                <ButtonLink to={"/search"}>Search!</ButtonLink>
            </Section>


            <Section title={"Live Maps"}>
                <IndentedParagraph>
                    This is an example of the maps that are generated showing the location of up to 3 live buses heading towards a stop. New maps can be generated every 30 seconds.
                </IndentedParagraph>
                <img className="img-fluid italic" src={mapImg} alt="Static Map" />
                <p className="text-muted">2 buses on route 12 Blair heading towards Mackenzie King 1A</p>
            </Section>

            <Section title={"Stop Previews"}>
                <IndentedParagraph>
                    When searching stop previews are generated which show all routes available at that stop. Clicking "View" will load a page
                    containing the next 3 stop times for each route and the number of live buses that are available. Clicking on a specific route will load a page containing the live map and
                    full schedule of that route.
                </IndentedParagraph>
                <StopPreviewDemo />
            </Section>

            <Section title={"Technical Details"}>
                <IndentedParagraph>
                    This website was built using React.js there is no server side rendering. The data is obtained from a GraphQL API written in Typescript, and the data is stored using MongoDB.
                    The GraphQL API wraps OC Transpo's API for live bus data. Maps are generated using Google Maps static API.</IndentedParagraph>
                <ButtonAnchor href={"https://github.com/danielholmes839/OC-Transpo-GraphQL"}>GitHub / GraphQL API</ButtonAnchor>
                <ButtonAnchor href={"https://octranspo-graphql.herokuapp.com/"}>GraphQL Endpoint</ButtonAnchor>
            </Section>

            <p className="text-muted">Created by <a href="https://www.linkedin.com/in/holmes-daniel/">Daniel Holmes</a></p>
        </Page>
    );
};

export default Home;