import React from "react";
import Logo from "../Netflix.png";
import Delete from '../delete.png';
import Edit from '../edit.png';

const Jobs = ({
  cardWidth,
  cardHeight,
  fontSize,
  cardWeight,
  buttonWidth,
  job,
  onEdit,
  onDelete
}) => {
  return (
    <div
      style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
      className={`flex px-6 py-4 bg-[#ffffff] rounded-lg`}
    >
      <div className="flex flex-row gap-2 w-full">
        <img className="flex w-12 h-12" src={Logo} alt="" />
        <div className="flex flex-col gap-6 w-[301px]">
          <div className="flex flex-col">
            <div
              className="flex tracking-wider"
              style={{ fontWeight: cardWeight, fontSize: `${fontSize.card}px` }}
            >
              {job.jobTitle}
            </div>
            <div className="flex tracking-wide">
              {job.companyName} - {job.industry}
            </div>
            <div className="flex text-[#4d4d4d] tracking-wide">
              {job.location}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="flex tracking-wide"
              style={{ fontWeight: cardWeight }}
            >
              {job.remoteType}
            </div>
            <div style={{ fontWeight: cardWeight }} className="tracking-wide">
              Experience ({job.minExperience}-{job.maxExperience}years)
            </div>
            <div style={{ fontWeight: cardWeight }} className="tracking-wide">
              INR(&#8377;) {job.minSalary}-{job.maxSalary}/Month
            </div>
            <div style={{ fontWeight: cardWeight }}>
              {job.totalEmployees}&nbsp;employees
            </div>
          </div>
          <div className="flex flex-row">
            {job.apply_type === "Quick Apply" && (
              <button
                style={{ width: `${buttonWidth}px` }}
                className={`flex px-4 py-2 justify-center text-white bg-[#1597e4] rounded-md`}
              >
                Apply Now
              </button>
            )}
            {job.apply_type === "External Apply" && (
              <button className="flex px-4 py-2 bg-[#ffffff] text-[#1597e4] font-semibold rounded-md border border-[#1597e4]">
                External Apply
              </button>
            )}
          </div>
        </div>
      </div>
        <div className="flex flex-row gap-4 justify-end">
            <img className="w-6 h-6 cursor-pointer" src={Edit} onClick={() => onEdit(job.id)} alt=""/>
            <img className="w-6 h-6 cursor-pointer" src={Delete} onClick={() => onDelete(job.id)} alt=""/>
        </div>
    </div>
  );
};

export default Jobs;
