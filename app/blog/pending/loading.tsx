import BlogSkelton from "@/components/BlogSkelton";

const Loading:React.FunctionComponent = () => {
    return <div className="flex">
        <div className="w-full"><BlogSkelton /></div>
        
        <div className="h-[400px] w-[400px]">
            <BlogSkelton />
        </div>
    </div>
};

export default Loading;