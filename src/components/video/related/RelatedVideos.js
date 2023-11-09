import { useGetRelatedVideoQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
    const { data: related, isLoading, isError } = useGetRelatedVideoQuery({ id, title });
    let contant = null;
    if (isLoading) {
        contant = (
          <>
            <RelatedVideoLoader />
            <RelatedVideoLoader />
            <RelatedVideoLoader />
          </>
        );
    }
    if (!isLoading && isError) {
        contant = <Error massage = "There was an !error" />;
    }
    if (!isLoading && !isError && related.length == 0) {
        contant = <Error massage=" Related Video not Found!" />;
    }
     if (!isLoading && !isError && related.length > 0) {
       contant = related.map((video) => <RelatedVideo key = {video.id} video={video} />);
     }
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {contant}
        </div>
    );
}
