import "./styles.scss";

type SkeletonProps = {
  height?: string;
  width?: string;
}

const Skeleton = ({ height, width }: SkeletonProps) => {
  return (
    <div className="skeleton" style={{ height, width }}></div>
  );
};

export default Skeleton;
