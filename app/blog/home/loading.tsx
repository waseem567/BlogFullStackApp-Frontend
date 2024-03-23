import BlogSkelton from "@/components/BlogSkelton";

const Loading: React.FunctionComponent = () => {
  return (
    <div className="grid-inner">
      <BlogSkelton />
      <div className="h-[50px]"><BlogSkelton /></div>
      
    </div>
  );
};

export default Loading;
