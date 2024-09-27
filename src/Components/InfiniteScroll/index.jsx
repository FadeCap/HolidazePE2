import { useEffect, useRef } from "react";

const InfiniteScroll = ({ loadMore, hasMore, children, loading }) => {
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();  // Trigger load more when the bottom is reached
        }
      },
      { threshold: 1 }
    );
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, loadMore]);

  return (
    <div>
      {children}
      {/* This is the element to observe for intersection */}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default InfiniteScroll;
