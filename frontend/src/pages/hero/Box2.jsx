import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Card from "./Card/Card";

const Box2 = ({ box2 }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {box2.map((item, index) => (
        <div key={index} className=" bg-white shadow-lg p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-xl">{item.boxName}</h1>
            <NavigateNextIcon fontSize={"large"} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {item?.item.map((item, index) => (
              <div key={index} className="p-4 border">
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Box2;
