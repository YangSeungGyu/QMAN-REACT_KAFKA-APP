import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest } from '@/features/post/postSlice';
import { useEffect } from 'react';

function TestSaga() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.post);

  const param = {param:'aaa'};

  useEffect(() => {
    dispatch(fetchPostsRequest(param)); // 사가 실행
  }, []);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러: {error}</p>;

  return (
    <>
        <div>
          {data}
        </div>
    </>
  );
}

export default TestSaga;