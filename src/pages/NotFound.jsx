import { images } from "../constants";

const NotFound = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col px-[10%] justify-center items-center">
          <img src={images.notFound} alt="Not found" />
          <h2 className="text-heading2 mb-2 mt-8">Không tìm thấy trang</h2>
          <p className="text-center">Có vẻ như trang của bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          {/* <button className="mt-5 w-full bg-primary h-[55px] rounded-[10px] text-button1 text-white">Về trang chủ</button> */}
        </div>
      </div>
    </>
  );
};

export default NotFound;
