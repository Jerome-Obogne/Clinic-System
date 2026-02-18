import { memo } from "react";

type DashboardProps = {
    imagePath:string
    value: number,
    title: string
}

export const DashboardCard = memo(({ imagePath, value,title }: DashboardProps) => {
  console.log(imagePath)
  return (
    <>
      <div className="shadow-2xl/60 p-3 rounded-md">
        <div
          className="h-80 bg-cover bg-top-right p-4 font-bold"
          style={{ backgroundImage: `url('${imagePath}')` }}
        >
          <div className="flex justify-between">
            <div>
              <h3 className="text-md sm:text-xl md:text-xl lg:text-2xl mb-4">
                {title}
              </h3>
            </div>

            <div className="items-end text-[12px]">
              <span className="text-green-500">5.9%</span>
              <span className="text-gray-300"> within the day</span>
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl px-2">
            {value}
          </p>
        </div>
      </div>
    </>
  );
});



