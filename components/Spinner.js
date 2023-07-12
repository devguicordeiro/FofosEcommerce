import {SyncLoader} from "react-spinners";

export default function Spinner({fullWidthP}) {
    if (fullWidthP) {
        return (
        <div className="w-full flex justify-center">
            <SyncLoader speedMultiplier={1} color={'purple'} />
        </div>
        );
    }
  return (
      <SyncLoader speedMultiplier={1} color={'#555'} />
  );
}