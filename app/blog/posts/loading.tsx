import BlogSkelton from "@/components/BlogSkelton";

const Loading:React.FunctionComponent = () => {
    return <div className="grid-inner">
    <BlogSkelton />
    <div className="h-[50px] overflow-hidden"><BlogSkelton /></div>
  </div>
    
};

export default Loading;