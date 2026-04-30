import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest } from '@/features/post/postSlice';
import { useEffect } from 'react';
import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './TestSaga.jsx?raw'; //DeleteShowCodeLine
import postSliceSourceCode from '@/features/post/postSlice?raw'; //DeleteShowCodeLine

function TestSaga() {
  const subSourceCodeObj =  {'@/features/post/postSlice':postSliceSourceCode} //DeleteShowCodeLine
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
        <ShowCode sourceCode={sourceCode|| "is not found"} subSourceCodeObj={subSourceCodeObj} />{/*DeleteShowCodeLine*/}
        <div>
          {data}
        </div>
    </>
  );
}

export default TestSaga;