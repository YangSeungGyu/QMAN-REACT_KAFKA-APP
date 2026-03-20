import rawData from './sampleBoardMock.json';


export const apiGetBoardList = async (paramData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (paramData.page - 1) * paramData.size;
      const end = start + paramData.size;
      
      resolve({
        status: 200,
        data: {
          list: rawData.slice(start, end),
          totalCount: rawData.length,
        }
      });
    }, 200);
  });
};
export const apiGetBoardDetail = async (paramData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = rawData.find((b) => b.idx === paramData.idx);
      
      if (item) {
        resolve({ status: 200, data: item });
      } else {
        resolve({ status: 404, data: null, message: "게시글을 찾을 수 없습니다." });
      }
    }, 100);
  });
};