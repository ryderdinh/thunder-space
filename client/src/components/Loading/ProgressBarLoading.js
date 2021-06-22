import { finishLoading } from "actions";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

export default function ProgressBarLoading() {
  // const [progress, setProgress] = useState(0);
  const progress = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  return (
    <div>
      <LoadingBar
        color="#6FCF97"
        progress={progress}
        onLoaderFinished={() => dispatch(finishLoading())}
      />
      <br />
    </div>
  );
}
