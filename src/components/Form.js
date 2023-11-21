import React, { useState, useEffect } from "react";
import axios from 'axios';

const Form = ({
  showModal,
  setShowModal,
  width,
  height,
  fontSize,
  editedJob,
  setJobList
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    industry: "",
    location: "",
    remoteType: "",
    minExperience: "",
    maxExperience: "",
    minSalary: "",
    maxSalary: "",
    totalEmployees: "",
    apply_type: "",
  });
  const [step1Errors, setStep1Errors] = useState({});
  const [step2Errors, setStep2Errors] = useState({});

  useEffect(() => {
    if (editedJob !== null) {
      setFormData({
        jobTitle: editedJob.jobTitle || "",
        companyName: editedJob.companyName || "",
        industry: editedJob.industry || "",
        location: editedJob.location || "",
        remoteType: editedJob.remoteType || "",
        minExperience: String(editedJob.minExperience) || "",
        maxExperience: String(editedJob.maxExperience) || "",
        minSalary: String(editedJob.minSalary) || "",
        maxSalary: String(editedJob.maxSalary) || "",
        totalEmployees: String(editedJob.totalEmployees) || "",
        apply_type: editedJob.apply_type || "",
      });
    } else {
      setFormData({
        jobTitle: "",
        companyName: "",
        industry: "",
        location: "",
        remoteType: "",
        minExperience: "",
        maxExperience: "",
        minSalary: "",
        maxSalary: "",
        totalEmployees: "",
        apply_type: "",
      })
    }
  }, [editedJob]);

  const validateStep1 = () => {
    const errors = {};

    if (!formData.jobTitle.trim()) {
      errors.jobTitle = "Job Title is required";
    }

    if (!formData.companyName.trim()) {
      errors.companyName = "Company Name is required";
    }

    if (!formData.industry.trim()) {
      errors.industry = "Industry is required";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.remoteType.trim()) {
      errors.remoteType = "Type  is required";
    }

    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};

    if (!formData.minExperience.trim()) {
      errors.minExperience = "Minimum Experience is required";
    }

    if (!formData.maxExperience.trim()) {
      errors.maxExperience = "Maximum Experience is required";
    }

    if (!formData.minSalary.trim()) {
      errors.minSalary = "Minimum Salary is required";
    }

    if (!formData.maxSalary.trim()) {
      errors.maxSalary = "Maximum Salary is required";
    }

    if (!formData.totalEmployees.trim()) {
      errors.totalEmployees = "Total Employees is required";
    }

    if (!formData.apply_type.trim()) {
      errors.apply_type = "Apply Type is required";
    }

    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async() => {
    if(step === 1 && validateStep1()){
        setStep(2);
    } else if(step === 2 && validateStep2()){
        const res = await axios.post('https://6555b88984b36e3a431e30d7.mockapi.io/api/job',
            formData
        )
        if(res.status === 201){
            console.log('Form sumbitted')
            setFormData({
                companyName:"",
                industry:"",
                jobTitle:"",
                location:"",
                remoteType:"",
                minExperience:"",
                maxExperience:"",
                minSalary:"",
                maxSalary:"",
                totalEmployees:"",
                apply_type:""
            })
            setStep(1);
            setShowModal(false);
            const updatedJobList = await getUpdatedJobList()
            setJobList(updatedJobList);
        }
    }
  }

  const handleUpdate = async() => {
    if(step === 1 && validateStep1()){
      setStep(2);
  } else if(step === 2 && validateStep2()){
      const res = await axios.put(`https://6555b88984b36e3a431e30d7.mockapi.io/api/job/${editedJob.id}`,
          formData
      )
      setJobList((prevJobList) => prevJobList.map((job) => job.id === editedJob.id ? {...job, ...formData} : job))
      if(res.status === 200){
          console.log('Form Updated')
          setFormData({
              companyName:"",
              industry:"",
              jobTitle:"",
              location:"",
              remoteType:"",
              minExperience:"",
              maxExperience:"",
              minSalary:"",
              maxSalary:"",
              totalEmployees:"",
              apply_type:""
          })
          setStep(1);
          setShowModal(false);
          const updatedJobList = await getUpdatedJobList();
          setJobList(updatedJobList);
      }
    }
  }

  const getUpdatedJobList = async () => {
    const res = await axios.get(
      "https://6555b88984b36e3a431e30d7.mockapi.io/api/job"
    );
    return res.data;
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (step === 1) {
      setStep1Errors({
        ...step1Errors,
        [field]: "",
      });
    } else if (step === 2) {
      setStep2Errors({
        ...step2Errors,
        [field]: "",
      });
    }
  };

  const Questions = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-row w-full justify-between">
              <div
                className={`flex font-semibold text-[#212121]`}
                style={{ fontSize: `${fontSize.heading}px` }}
              >
                Create a Job
              </div>
              <div
                className="flex font-semibold  text-[#212121]"
                style={{ fontSize: `${fontSize.heading}px` }}
              >
                Step 1
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                style={{ fontSize: `${fontSize.side_heading}px` }}
                className="font-semibold  text-[#212121]"
              >
                Job Title*
                {step1Errors.jobTitle && (
                    <span className="text-[#D86161]">&nbsp;({step1Errors.jobTitle})</span>
                )}
              </div>
              <input
                type="text"
                placeholder="ex. UX UI Designer"
                className="flex border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                value={formData.jobTitle}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div
                style={{ fontSize: `${fontSize.side_heading}px` }}
                className="font-semibold  text-[#212121]"
              >
                Company Name
                {step1Errors.companyName && (
                    <span className="text-[#D86161]">&nbsp;({step1Errors.companyName})</span>
                )}
              </div>
              <input
                type="text"
                placeholder="ex. Google"
                className="flex border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                value={formData.companyName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div
                style={{ fontSize: `${fontSize.side_heading}px` }}
                className="font-semibold  text-[#212121]"
              >
                Industry
                {step1Errors.industry && (
                    <span className="text-[#D86161]">&nbsp;({step1Errors.industry})</span>
                )}
              </div>
              <input
                type="text"
                placeholder="ex. Information Technology"
                className="flex border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                onChange={(e) => handleInputChange("industry", e.target.value)}
                value={formData.industry}
              />
            </div>
            <div className="flex flex-row gap-6 w-full">
              <div className="flex flex-col gap-1 w-full">
                <div
                  style={{ fontSize: `${fontSize.side_heading}px` }}
                  className="font-semibold  text-[#212121]"
                >
                  Location
                  {step1Errors.location && (
                    <span className="text-[#D86161]">&nbsp;({step1Errors.location})</span>
                )}
                </div>
                <input
                  type="text"
                  placeholder="ex. Chennai"
                  className="flex border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  value={formData.location}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div
                  style={{ fontSize: `${fontSize.side_heading}px` }}
                  className="font-semibold  text-[#212121]"
                >
                  Remote type
                  {step1Errors.remoteType && (
                    <span className="text-[#D86161]">&nbsp;({step1Errors.remoteType})</span>
                )}
                </div>
                <input
                  type="text"
                  placeholder="ex. In-office"
                  className="flex border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                  onChange={(e) => handleInputChange("remoteType", e.target.value)}
                  value={formData.remoteType}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-row w-full justify-between">
              <div
                className={`flex font-semibold  text-[#212121]`}
                style={{ fontSize: `${fontSize.heading}px` }}
              >
                Create a Job
              </div>
              <div
                className="flex font-semibold  text-[#212121]"
                style={{ fontSize: `${fontSize.heading}px` }}
              >
                Step 2
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                style={{ fontSize: `${fontSize.side_heading}px` }}
                className="font-semibold  text-[#212121]"
              >
                Experience
                {step2Errors.minExperience && (
                    <span className="text-[#D86161]">&nbsp;({step2Errors.minExperience})</span>
                )}
                {step2Errors.maxExperience && (
                    <span className="text-[#D86161]">&nbsp;({step2Errors.maxExperience})</span>
                )}
              </div>
              <div className="flex flex-row gap-6">
                <input
                  type="text"
                  placeholder="Minimum"
                  className="flex w-full border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                  onChange={(e) => handleInputChange("minExperience", e.target.value)}
                  value={formData.minExperience}
                />
                <input
                  type="text"
                  placeholder="Maximum"
                  className="flex w-full border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                  onChange={(e) => handleInputChange("maxExperience", e.target.value)}
                  value={formData.maxExperience}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                style={{ fontSize: `${fontSize.side_heading}px` }}
                className="font-semibold  text-[#212121]"
              >
                Salary
                {step2Errors.minSalary && (
                    <span className="text-[#D86161]">&nbsp;({step2Errors.minSalary})</span>
                )}
                {step2Errors.maxSalary && (
                    <span className="text-[#D86161]">&nbsp;({step2Errors.maxSalary})</span>
                )}
              </div>
              <div className="flex flex-row gap-6">
                <input
                  type="text"
                  placeholder="Minimum"
                  className="flex w-full border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                  onChange={(e) => handleInputChange("minSalary", e.target.value)}
                  value={formData.minSalary}
                />
                <input
                  type="text"
                  placeholder="Maximum"
                  className="flex w-full border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                  onChange={(e) => handleInputChange("maxSalary", e.target.value)}
                  value={formData.maxSalary}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                style={{ fontSize: `${fontSize.side_heading}px` }}
                className="font-semibold  text-[#212121]"
              >
                Total employee
                {step2Errors.totalEmployees && (
                    <span className="text-[#D86161]">&nbsp;({step2Errors.totalEmployees})</span>
                )}
              </div>
              <input
                type="number"
                placeholder="ex. 100"
                className="flex border py-1 px-2 border-[#e6e6e6] rounded-md focus:outline-none"
                onChange={(e) => handleInputChange("totalEmployees", e.target.value)}
                value={formData.totalEmployees}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div
                style={{ fontSize: `${fontSize.side_heading}px` }}
                className="font-semibold  text-[#212121]"
              >
                Apply type
                {step2Errors.apply_type && (
                    <span className="text-[#D86161]">&nbsp;({step2Errors.apply_type})</span>
                )}
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex gap-1 py-1">
                  <input
                    type="radio"
                    id="quick"
                    value={formData.apply_type || "Quick Apply"}
                    className="border-[#e6e6e6] "
                    checked={formData.apply_type === "Quick Apply"}
                    onChange={() => handleInputChange("apply_type", "Quick Apply")}
                  />
                  <label htmlFor="quick" className="text-[#7a7a7a]">
                    Quick Apply
                  </label>
                </div>
                <div className="flex gap-1 py-1">
                  <input
                    type="radio"
                    id="external"
                    value={formData.apply_type || "External Apply"}
                    className="border-[#e6e6e6] "
                    checked={formData.apply_type === "External Apply"}
                    onChange={() => handleInputChange("apply_type", "External Apply")}
                  />
                  <label htmlFor="external" className="text-[#7a7a7a]">
                    External Apply
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${
            showModal ? "bg-black bg-opacity-40" : ""
          }`}
        >
          <div style={{width:`${width}px`, height:`${height}px`}}
            className={`bg-white rounded-md p-8`}
          >
            <div className="flex flex-col w-full h-full gap-24">
              {Questions()}
              {step === 1 ? (
                <div className="flex w-full justify-end">
                  <button
                    className="px-4 py-2 rounded-md bg-[#1597E4] text-white"
                    onClick={() => handleNext()}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <div className="flex w-full justify-end">
                  {editedJob ? (
                    <button
                    className="px-4 py-2 rounded-md bg-[#1597E4] text-white"
                    onClick={() => handleUpdate()}
                  >
                    Update
                  </button>
                  ) : (
                  <button
                    className="px-4 py-2 rounded-md bg-[#1597E4] text-white"
                    onClick={() => handleNext()}
                  >
                    Save
                  </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
